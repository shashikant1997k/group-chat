import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD08YhXM-v9fdyyEMMrMJ-Vwq46qpo20z0",
    authDomain: "group-chat-f82fe.firebaseapp.com",
    databaseURL: "https://group-chat-f82fe.firebaseio.com",
    projectId: "group-chat-f82fe",
    storageBucket: "group-chat-f82fe.appspot.com",
    messagingSenderId: "1094653166054",
    appId: "1:1094653166054:web:d849daa778dc6d1eefd627",
    measurementId: "G-KCH0MEFCPJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;

