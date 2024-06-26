import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAdmhahWVNnv8bpypNsrQh5EIaUS9zaqpA",
  authDomain: "twitter-clone-e2212.firebaseapp.com",
  projectId: "twitter-clone-e2212",
  storageBucket: "twitter-clone-e2212.appspot.com",
  messagingSenderId: "383051864014",
  appId: "1:383051864014:web:af758634e0b5747d4bbd9f",
  measurementId: "G-3E1GV2W18H"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;