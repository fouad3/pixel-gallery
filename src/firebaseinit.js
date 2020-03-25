import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDBaNxPw2W20uJ6m0hM_WTM8x6NjXRjSAE',
  authDomain: 'pixel-gallery.firebaseapp.com',
  databaseURL: 'https://pixel-gallery.firebaseio.com',
  projectId: 'pixel-gallery',
  storageBucket: 'pixel-gallery.appspot.com',
  messagingSenderId: '1002445759096',
  appId: '1:1002445759096:web:ce7fa4c4060d51f26e038d',
  measurementId: 'G-9VHBV5BCQE',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
