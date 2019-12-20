import client from '~/plugins/client/socket';

export const state = () => ({
  connectionState: 'none',
  mapdata: null,
  scenedata: null,
  sounddata: null,
  scene: null,
})

export const mutations = {
  changeState(state, { connectionState }) {
    state.connectionState = connectionState;
  },
  mapdata(state, { data }) {
    state.mapdata = data;
  },
  scenedata(state, { data }) {
    state.scenedata = data;
  },
  sounddata(state, { data }) {
    state.sounddata = data;
  },
  scene(state, { data }) {
    state.scene = data;
  }
}

export const actions = {
  changeState(store, { connectionState }) {
    store.commit('changeState', { connectionState });
  },
  mapdata(store, { data }) {
    store.commit('mapdata', { data });
  },
  scenedata(store, { data }) {
    store.commit('scenedata', { data });
  },
  sounddata(store, { data }) {
    store.commit('sounddata', { data });
  },
  scene(store, data) {
    store.commit('scene', { data });
  }
}
