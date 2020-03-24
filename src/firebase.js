import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBRIhNWk3vwmNK9SSFEFa3STxdTCSSpXe8",
  authDomain: "album-1cb57.firebaseapp.com",
  databaseURL: "https://album-1cb57.firebaseio.com",
  projectId: "album-1cb57",
  storageBucket: "album-1cb57.appspot.com",
  messagingSenderId: "146560779496",
  appId: "1:146560779496:web:f82fddaa53bcc008b3355d"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();

export function snapshotToArray(snapshot) {
  const updated_array = [];
  snapshot.forEach(s => {
    const data = s.data();
    data.id = s.id;
    updated_array.push(data);
  });
  return updated_array;
}
