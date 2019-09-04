import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDHZA3bfKU5GIBXT-g4dXGwEHmFsq2687M",
  authDomain: "test-977cb.firebaseapp.com",
  databaseURL: "https://test-977cb.firebaseio.com",
  projectId: "test-977cb",
  storageBucket: "",
  messagingSenderId: "545874015188",
  appId: "1:545874015188:web:c1e64fa2039e8b5bcedc41"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
