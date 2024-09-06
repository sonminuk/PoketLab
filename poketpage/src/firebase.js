// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBpkNcOOgCGxJEe9Yft41nYnr1tY1JGLEQ",
  authDomain: "poketlab-590f5.firebaseapp.com",
  databaseURL: "https://poketlab-590f5-default-rtdb.firebaseio.com",
  projectId: "poketlab-590f5",
  storageBucket: "poketlab-590f5.appspot.com",
  messagingSenderId: "1074824942472",
  appId: "1:1074824942472:web:4bc917cc5180ab93d8203d",
  measurementId: "G-4Q6XF2ZHV3"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default database;
