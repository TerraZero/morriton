import Vue from 'vue';
import io from "socket.io-client";
import VideoController from "./VideoController";
import SoundController from "./SoundController";
import Vara from "vara";

class Sync {

  get scenedata() {
    return Vue.prototype.$nuxt.$store.state.meta.scenedata;
  }

  init(target) {
    this._promises = {};
    this._target = target;
    this._writing = null;
    this._videos = [];
    this._socket = io();
    this._socket.on('action', this.onAction.bind(this));
    this._socket.on('response', this.onResponse.bind(this));
    this._socket.on('connect', this.onConnection.bind(this));
    this._socket.on('updatescene', this.onUpdateScene.bind(this));
    this._socket.on('reconnect_attempt', this.onReconnection.bind(this));

    this.send('mapdata').then((data) => {
      this.onAction({ action: 'meta/mapdata', args: { data } })
    });
    this.send('scenedata').then((data) => {
      this.onAction({ action: 'meta/scenedata', args: { data } })
    });
    this.send('sounddata').then((data) => {
      this.onAction({ action: 'meta/sounddata', args: { data } })
    });

    return this;
  }

  onConnection() {
    this.onAction({ action: 'meta/changeState', args: { connectionState: 'connected' } });
    setTimeout(() => {
      this.onAction({ action: 'meta/changeState', args: { connectionState: 'none' } });
    }, 3000);
  }

  onReconnection(attemptNumber) {
    this.onAction({ action: 'meta/changeState', args: { connectionState: 'reconnecting' } });
  }

  onAction({ action, args }) {
    Vue.prototype.$nuxt.$store.dispatch(action, args);
  }

  send(request, args = {}, target = null) {
    return new Promise((resolve) => {
      this._promises[request] = resolve;
      this._socket.emit('request', {
        request,
        target: target || this._target,
        args,
      });
    });
  }

  onResponse({ request, target, data }) {
    if (this._target !== target) return;
    if (typeof this._promises[request] === 'function') {
      this._promises[request](data);
    }
    delete this._promises[request];
  }

  update(data) {
    this._socket.emit('update', data);
  }

  onUpdateScene(data) {
    if (this._target === 'scene') {
      Vue.prototype.$nuxt.$store.dispatch('meta/scene', data);
      for (const video of this._videos) {
        video.update(data);
      }
      this.updateWriting(data);
    }
  }

  addVideo(video) {
    this._videos.push(new VideoController(video));
  }

  addSound(video) {
    this._videos.push(new SoundController(video));
  }

  writing(element, comp) {
    this._writing = { element, comp };
  }

  updateWriting(data) {
    if (data.scene && data.scene[0]) {
      if (this._writing && this._writing.comp) {
        this._writing.comp.shadow = false;
      }
      setTimeout(() => {
        const item = this.scenedata[data.scene[0]];
        if (item.type !== 'text') return;
        const copytext = [];
        const copyoptions = {};

        for (const text of item.text) {
          const copyitem = {};

          for (const name in text) {
            copyitem[name] = text[name];
          }
          copytext.push(copyitem);
        }

        for (const name in item.options) {
          copyoptions[name] = item.options[name];
        }

        this._writing.comp.shadow = true;
        new Vara(this._writing.element, '/font/SatisfySL.json', copytext, copyoptions);
      }, 1500);
    }
  }

}

export default new Sync();
