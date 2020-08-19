import firebase from 'firebase'



const firebaseConfig = {
    apiKey: "AIzaSyCbH148Yc06VMyfNNIAKBPQr1xJqTEnLjM",
    authDomain: "whatsapp-e68f9.firebaseapp.com",
    databaseURL: "https://whatsapp-e68f9.firebaseio.com",
    projectId: "whatsapp-e68f9",
    storageBucket: "whatsapp-e68f9.appspot.com",
    messagingSenderId: "1041732200122",
    appId: "1:1041732200122:web:9ea4af07c04a171a180483"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;

  