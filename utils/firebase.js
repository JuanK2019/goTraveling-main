import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBEmaKHfRFnn2jtVcTmjWaoMWsWwORUmKU",
    authDomain: "gotraveling-d5fa2.firebaseapp.com",
    projectId: "gotraveling-d5fa2",
    storageBucket: "gotraveling-d5fa2.appspot.com",
    messagingSenderId: "248848609534",
    appId: "1:248848609534:web:a7772774f4afd6cc84f5af"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
