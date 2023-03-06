import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbRpsoNaBlQSXGPOptxVfTmIhKW6XprHA",
  authDomain: "rooms-surfer-52a26.firebaseapp.com",
  projectId: "rooms-surfer-52a26",
  storageBucket: "rooms-surfer-52a26.appspot.com",
  messagingSenderId: "75903973256",
  appId: "1:75903973256:web:50b8901c20404e276e6c3d",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
