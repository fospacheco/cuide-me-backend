import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { google } from "googleapis";
import firebaseAdmin from "../../../firebase/firebase-config.js";

const oauth2Client = new google.auth.OAuth2(
  process.env.LINKEDIN_CLIENT_ID,
  process.env.LINKEDIN_SECRET,
  process.env.REDIRECT_URI
);

// Exemplo de uso:
export default async function handler(req, res) {
  // lógica de autenticação usando oauth2Client
  res.status(200).json({ message: "Login handler pronto." });
}