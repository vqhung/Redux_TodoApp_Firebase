import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDb9bufxqaaqIv3rz1JTmE6TDyywHm4EZg",
    authDomain: "hung-todoapp.firebaseapp.com",
    databaseURL: "https://hung-todoapp.firebaseio.com",
    storageBucket: "hung-todoapp.appspot.com",
    messagingSenderId: "27408349586"
  };
  firebase.initializeApp(config);

  firebase.database().ref().set({
    appName: 'Todo App',
    isRunning: true,
    user: {
      name: 'Hung',
      age: 34
    }
  })
