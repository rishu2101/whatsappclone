importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
   apiKey: "AIzaSyBbqXwgCfs2VPJQzU7MqmTHFwacXI8flL8",
   authDomain: "whatsapp-clone-d88d3.firebaseapp.com",
   databaseURL: "https://whatsapp-clone-d88d3.firebaseio.com",
   projectId: "whatsapp-clone-d88d3",
   storageBucket: "whatsapp-clone-d88d3.appspot.com",
   messagingSenderId: "382808771340",
   appId: "1:382808771340:web:89aa5c9e0578bdebca1729",
   measurementId: "G-VGYC2SH2D3"
 };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
