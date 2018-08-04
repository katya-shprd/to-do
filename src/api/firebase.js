import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCKB84sV8kqe6YkxnSkCuvcjQx9VgbHvd0",
    authDomain: "to-do-ca5b1.firebaseapp.com",
    databaseURL: "https://to-do-ca5b1.firebaseio.com",
    projectId: "to-do-ca5b1",
    storageBucket: "to-do-ca5b1.appspot.com",
    messagingSenderId: "9891187513"
}

export const fb = firebase.initializeApp(config);