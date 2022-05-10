import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAR4lQzbXVJb1B3FjtRFbTukFhGecNRtaM",
  authDomain: "sharp-unfolding-349209.firebaseapp.com",
  projectId: "sharp-unfolding-349209",
  storageBucket: "sharp-unfolding-349209.appspot.com",
  messagingSenderId: "820158716034",
  appId: "1:820158716034:web:f4a608d9aac3b517dafc9b",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
