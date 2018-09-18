import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDmYGH7S0EpNksulABddRBh09wx4MZwkuY",
    authDomain: "ledniceapp.firebaseapp.com",
    databaseURL: "https://ledniceapp.firebaseio.com",
    projectId: "ledniceapp",
    storageBucket: "",
    messagingSenderId: "1086105354208"
  };
  firebase.initializeApp(config);

  const database = firebase.firestore();
  database.settings({
    timestampsInSnapshots: true
  });

  export {firebase, database as default};