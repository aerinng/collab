import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

//API key for configuration
var firebaseConfig = {
    apiKey: "AIzaSyAOkCekXGgLyBJE3XXvPDdCqSeFOcD5F7c",
    authDomain: "collab-testfb.firebaseapp.com",
    databaseURL: "https://collab-testfb.firebaseio.com",
    projectId: "collab-testfb",
    storageBucket: "collab-testfb.appspot.com",
    messagingSenderId: "714062311887",
    appId: "1:714062311887:web:88bdfac792c73cdb24a2ba"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();