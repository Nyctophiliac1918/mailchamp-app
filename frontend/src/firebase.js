import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCLqxcSSrXeGWYldvXrclBVx0KR1xSFBGk",
    authDomain: "mailchamp-e9f9e.firebaseapp.com",
    projectId: "mailchamp-e9f9e",
    storageBucket: "mailchamp-e9f9e.appspot.com",
    messagingSenderId: "298759593552",
    appId: "1:298759593552:web:5867dfd95d7ab601113b55",
    measurementId: "G-PH5BSHJP0Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };