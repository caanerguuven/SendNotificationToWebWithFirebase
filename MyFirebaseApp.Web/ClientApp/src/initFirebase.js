import * as firebase from "firebase/app";
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB1XnrDVWllfQkPcVZKcJ4FWVLEo7jw04I",
    authDomain: "gpay-notifications-30cc7.firebaseapp.com",
    databaseURL: "https://gpay-notifications-30cc7.firebaseio.com",
    projectId: "gpay-notifications-30cc7",
    storageBucket: "gpay-notifications-30cc7.appspot.com",
    messagingSenderId: "516394439660",
    appId: "1:516394439660:web:08cf25c4aa5c1d49e3a6c9"
});

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey("BMxWIry8TgJbbL0tSpdmO6H13edvftvqNkFOaJ_R85BmAR5GX1BgVAN4dVQ_Q4w3b-gdygaaahVIoS2-iqp8_0I");

export { messaging };

