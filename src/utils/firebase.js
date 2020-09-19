// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app"

// Add the Firebase services that you want to use
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"
import "firebase/storage"

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDmfle2wOe0b270FJ9P9C2ZoIut_OcCPrM",
  authDomain: "react-image-uploader-001.firebaseapp.com",
  databaseURL: "https://react-image-uploader-001.firebaseio.com",
  projectId: "react-image-uploader-001",
  storageBucket: "react-image-uploader-001.appspot.com",
  messagingSenderId: "73049389301",
  appId: "1:73049389301:web:0c8301eb85243445142dbc",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// if (window.location.hostname === "localhost") {
//   firebase.functions().useFunctionsEmulator("http://localhost:5001")
//   firebase.firestore().settings({
//     host: "localhost:8080",
//     ssl: false,
//   })
// }

export default firebase
