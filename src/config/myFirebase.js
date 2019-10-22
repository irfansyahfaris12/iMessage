import firebase from "firebase";

const config = {
    apiKey: "AIzaSyD3EFjmxjrsg4wOY8IkISz5pCjsQLKPWt4",
    authDomain: "chat-app-45351.firebaseapp.com",
    databaseURL: "https://chat-app-45351.firebaseio.com",
    projectId: "chat-app-45351",
    storageBucket: "chat-app-45351.appspot.com",
    messagingSenderId: "1003682791626",
    appId: "1:1003682791626:web:3ea60ce1db6b651ff73433",
    measurementId: "G-6F0JV0KMHN"
  }
    firebase.initializeApp(config)
    firebase.firestore().settings({
    timestampsInSnapshots: true
})
export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()