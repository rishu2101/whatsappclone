import  firebase from 'firebase';
import 'firebase/storage';
import 'firebase/messaging';


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

//  var firebase = require('firebase');


  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  
  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  const messaging = firebase.messaging();

  const getToken = (setTokenFound) => {
    return messaging.getToken({vapidKey: 'BAyhrDCkdpB84B6KUIgWjQeFKfPG3aGDTt8Ycz8VGfYe3TFPBLhyTLg8TU92iGAFa9uR_rNdDXeaQZO5yLcMIdg'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }
  

  const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
})
  
export default db;
export {auth,provider,firebase,messaging,getToken,onMessageListener};
  