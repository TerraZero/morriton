import Vue from 'vue';
const Player = require("youtube-player");

export default class VideoController {

  constructor(id) {
    this._id = id;
    this._type = (id === 'video-player' ? 'scene' : 'sound');
    this._player = new Player(id);
    this._current = null;
    this._index = 0;
    this._volume = {
      scene: 0,
      sound: 100,
    };

    this._player.on('stateChange', this.onPlayerStateChange.bind(this));
  }

  get sounddata() {
    return Vue.prototype.$nuxt.$store.state.meta.sounddata;
  }

  get scenedata() {
    return Vue.prototype.$nuxt.$store.state.meta.scenedata;
  }

  get data() {
    if (this.type === 'scene') {
      return this.scenedata;
    } else {
      return this.sounddata;
    }
  }

  get current() {
    return this.data[this._current];
  }

  get video() {
    return this.current.video;
  }

  get type() {
    return this._type;
  }

  update(data) {
    if (this.type === 'scene') {
      this.updateScene(data);
    } else {
      this.updateSound(data);
    }
    this._volume = data.volume;
    this.updateVolume();
  }

  updateScene(data) {
    if (data.scene && data.scene[0]) {
      if (data.scene[0] !== this._current) {
        this.stop();
        this._current = data.scene[0];
        this._index = -1;
        this.next();
      }
    } else {
      this.stop();
    }
  }

  updateSound(data) {
    if (data.sound && data.sound[0]) {
      if (data.sound[0] !== this._current) {
        this._current = data.sound[0];
        this._index = -1;
        this.next();
      }
    } else {
      this.stop();
    }
  }

  updateVolume() {
    if (this.current && this.video !== undefined) {
      this._player.setVolume(Math.min(this.video[this._index].volume, this._volume[this.type]));
    }
  }

  next() {
    if (this.video === undefined) return;
    this._index = (this._index + 1 === this.video.length ? 0 : this._index + 1);
    this._player.loadVideoById(this.video[this._index]);
  }

  stop() {
    this._player.stopVideo();
    this._current = null;
    this._index = 0;
  }

  onPlayerStateChange(e) {
    if (e.data === 0) {
      this.next();
    }
  }

}
