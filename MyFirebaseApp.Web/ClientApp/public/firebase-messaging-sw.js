importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyB1XnrDVWllfQkPcVZKcJ4FWVLEo7jw04I",
    authDomain: "gpay-notifications-30cc7.firebaseapp.com",
    databaseURL: "https://gpay-notifications-30cc7.firebaseio.com",
    projectId: "gpay-notifications-30cc7",
    storageBucket: "gpay-notifications-30cc7.appspot.com",
    messagingSenderId: "516394439660",
    appId: "1:516394439660:web:08cf25c4aa5c1d49e3a6c9"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients.matchAll({
        type: "window",
        includeUncontrolled: true
    })
        .then(windowsClients => {
            for (let i = 0; i < windowsClients.length; i++) {
                const windowClient = windowsClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("my notification title");
        });
    return promiseChain;
});


self.addEventListener('notificationClick', function (event) {
    console.log("Tıklandı.");
});