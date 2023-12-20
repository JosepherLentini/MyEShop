
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";



import { setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsvr32tEzxtIw8vPaVUTNErTF4JPNGQEg",
  authDomain: "myeshop-b66b4.firebaseapp.com",
  databaseURL:
    "https://myeshop-b66b4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myeshop-b66b4",
  storageBucket: "myeshop-b66b4.appspot.com",
  messagingSenderId: "352858738975",
  appId: "1:352858738975:web:179752d7dc350a307b602a",
  measurementId: "G-ZSR8S662ST",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export let auth = getAuth(app);
export let db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// setDoc(doc(db, "cart", "floppybobbu456turiddusiii"), {
//   id: "sansoneeeee",
//   pupu: "bubu"
// });
