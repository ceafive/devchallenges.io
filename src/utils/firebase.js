// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import dotenv from "dotenv"
import * as firebase from "firebase/app"

// Add the Firebase services that you want to use
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"
import "firebase/storage"

dotenv.config()

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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
