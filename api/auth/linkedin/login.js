import { google } from "googleapis";
import firebaseAdmin from "../../../firebase/firebase-config.js";

export default async function handler(req, res) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=r_liteprofile%20r_emailaddress`;

  console.log("🔍 URL gerada:", authorizationUrl); // ← debug
  console.log("📌 clientId:", clientId); // ← debug
  console.log("📌 redirectUri:", redirectUri); // ← debug
  console.log("URL final de autorização:", authorizationUrl);

  return res.redirect(authorizationUrl);
}
