import firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA3sJq9LSTIL16dzEzQ9gxl5b6o-bE0IHM",
    authDomain: "yt-clone-2a269.firebaseapp.com",
    projectId: "yt-clone-2a269",
    storageBucket: "yt-clone-2a269.appspot.com",
    messagingSenderId: "588877906220",
    appId: "1:588877906220:web:c29402bb1467d3d7246c89"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.auth()