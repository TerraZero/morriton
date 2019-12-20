import VideoController from './VideoController';

export default class SoundController extends VideoController {

  get data() {
    return this.scenedata;
  }

  get video() {
    return this.current.sound;
  }

  update(data) {
    if (data.scene && data.scene[0] && data.show[0] === 'scene') {
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

  next() {
    if (this.video === undefined) return;
    this._index++;
    this._player.loadVideoById(this.video[this._index]);
    this._player.setVolume(this.video[this._index].volume);
  }

}
