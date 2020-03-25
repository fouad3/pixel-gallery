import Vue from 'vue';
import VueRouter from 'vue-router';
import GalleryPage from '../gallery/GalleryPage.vue';
import SignupPage from '../auth/SignupPage.vue';
import SigninPage from '../auth/SigninPage.vue';
import firebase from '../firebaseinit';
import CardPage from '../card/CardPage.vue';
import store from '../store';

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'Gallery',
    component: GalleryPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninPage,
  },
  {
    path: '/card',
    name: 'Card',
    component: CardPage,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch('users/autoSignIn', user.uid);
      store.dispatch('users/fetchUserData', user.uid);
      if (to.name === 'Signup' || to.name === 'Signin') {
        return next('/');
      }
    } else if (requiresAuth) {
      return next('/signin');
    }
    return next();
  });
});

export default router;
