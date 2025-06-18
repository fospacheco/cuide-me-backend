import { initializeApp, cert } from "firebase-admin/app";

const firebaseAdmin = initializeApp({
  credential: cert({
    projectId: "cuide-me-f57f8",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

export default firebaseAdmin;