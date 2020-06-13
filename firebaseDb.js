import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

//API key for configuration
var firebaseConfig = {
    apiKey: "AIzaSyCjbiA-yf0xWjpk2EjnIMlDxOdq2RsKSug",
    authDomain: "collab-8af51.firebaseapp.com",
    databaseURL: "https://collab-8af51.firebaseio.com",
    projectId: "collab-8af51",
    storageBucket: "collab-8af51.appspot.com",
    messagingSenderId: "688778678705",
    appId: "1:688778678705:web:97a9bcc682a22bd4512d90"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();