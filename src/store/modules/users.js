import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    getCardItems(state) {
      if (state.user) {
        return Object.entries(state.user.card);
      }
      return null;
    },
    getCardPrice(state) {
      if (state.user) {
        let total = 0;
        Object.values(state.user.card).forEach((entry) => {
          total += Number(entry.price);
        });
        return total.toFixed(2);
      }
      return null;
    },
  },
  actions: {
    signUserUp({ commit, dispatch }, payload) {
      commit('setLoading', true, { root: true });
      commit('clearError', null, { root: true });
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (response) => {
            commit('setLoading', false, { root: true });
            const newUser = { id: response.user.uid, card: {} };
            dispatch('getPhotos', newUser.card, { root: true });
            commit('setUser', newUser);
          },
        ).catch(
          (error) => {
            commit('setLoading', false, { root: true });
            commit('setError', error, { root: true });
            console.log(error);
          },
        );
    },
    signUserIn({ commit, dispatch }, payload) {
      commit('setLoading', true, { root: true });
      commit('clearError', null, { root: true });
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (response) => {
            commit('setLoading', false, { root: true });
            const newUser = {
              id: response.user.uid,
              card: {},
            };
            dispatch('getPhotos', newUser.card, { root: true });
            commit('setUser', newUser);
          },
        ).catch(
          (error) => {
            commit('setLoading', false, { root: true });
            commit('setError', error, { root: true });
            console.log(error);
          },

        );
    },
    autoSignIn({ commit }, userId) {
      commit('setUser', { id: userId, card: {} });
    },
    fetchUserData({ commit, dispatch }, userId) {
      const user = {
        id: userId,
        card: {},
      };
      commit('clearError', null, { root: true });
      commit('setLoading', true, { root: true });
      firebase.database().ref(`users/${userId}/card`).once('value')
        .then((data) => {
          if (data.val() !== null) {
            user.card = data.val();
            commit('setUser', user);
            dispatch('getPhotos', user.card, { root: true });
          } else {
            dispatch('getPhotos', user.card, { root: true });
          }
          commit('setLoading', false, { root: true });
        })
        .catch((error) => {
          commit('setError', error, { root: true });
        });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    addToCard({ commit, state, dispatch }, cardItems) {
      const { user } = state;
      const updatedCard = { ...user.card, ...cardItems };
      const updatedUser = {
        id: user.id,
        card: updatedCard,
      };
      commit('clearError', null, { root: true });
      dispatch('getPhotos', updatedCard, { root: true });
      commit('setUser', updatedUser);
      firebase.database().ref(`users/${user.id}/card`).set(updatedCard)
        .catch((error) => {
          dispatch('getPhotos', user.card, { root: true });
          commit('setUser', user);
          commit('setError', error, { root: true });
        });
    },
  },
};
