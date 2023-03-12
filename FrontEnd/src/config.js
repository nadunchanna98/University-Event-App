import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA5ghwxf5P-4JImJ5mVvnPB-QPnVnHu4EQ",
    authDomain: "eventapp-b3c1a.firebaseapp.com",
    projectId: "eventapp-b3c1a",
    storageBucket: "eventapp-b3c1a.appspot.com",
    messagingSenderId: "440354892213",
    appId: "1:440354892213:web:78fa167868b0c354f591fc",
    measurementId: "G-B5QBHP6QEF"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }


    export { firebase };