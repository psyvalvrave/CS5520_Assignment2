import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "@env";

/*Since I am not gonna upload my .env file into github, I will comment this part out for someone else can test my work
I will just using all details config directly
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyB2C8i9H9ddisZ1SU-Sdx4qOW0kxRS5zJs",
  authDomain: "cs5520-48b90.firebaseapp.com",
  projectId: "cs5520-48b90",
  storageBucket: "cs5520-48b90.appspot.com",
  messagingSenderId: "741481607569",
  appId: "1:741481607569:web:b85454eb03195c4985ea30"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
