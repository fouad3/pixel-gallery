import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import photos from '../data/photos';

import usersModule from './modules/users';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    users: usersModule,
  },
  state: {
    photos: [],
    loading: false,
    error: null,
  },
  mutations: {
    setPhotos(state, payload) {
      state.photos = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
  },
  actions: {
    getPhotos({ commit }, card) {
      if (Object.keys(card).length === 0 && card.constructor === Object) {
        commit('setPhotos', photos);
      } else {
        /*
          this filtered photos should be retrieved from backend but but i'm not doing that
          due to the main focus on the front end not the back end.
        */
        commit('setPhotos', photos.filter((photo) => {
          if (card[photo.id]) {
            return false;
          }
          return true;
        }));
      }
    },
    clearError({ commit }) {
      commit('clearError');
    },
  },
});

export default store;
