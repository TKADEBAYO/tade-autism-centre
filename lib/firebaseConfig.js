import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAmqok6QUENCQcEXCkdqbQvuBowMLiUn3g",
  authDomain: "tade-autism-centre.firebaseapp.com",
  projectId: "tade-autism-centre",
  storageBucket: "tade-autism-centre.appspot.com",
  messagingSenderId: "622085659096",
  appId: "1:622085659096:web:6230c5a6b509229aa13aad",
  measurementId: "G-14N0YQ41GZ",
};

// ✅ Only initialize once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Only enable analytics in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };
