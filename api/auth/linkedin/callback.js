
const express = require('express');
const fetch = require('node-fetch');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// Substitua pelas suas credenciais do LinkedIn
const LINKEDIN_CLIENT_ID = 'SUA_CLIENT_ID';
const LINKEDIN_CLIENT_SECRET = 'SEU_CLIENT_SECRET';
const REDIRECT_URI = 'https://cuide-me.vercel.app/api/auth/linkedin/callback';

// 1. Endpoint para iniciar login (opcional se for direto via frontend)
app.get('/api/auth/linkedin/login', (req, res) => {
  const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=r_liteprofile%20r_emailaddress`;
  res.redirect(url);
});

// 2. Callback com "code" do LinkedIn
app.get('/api/auth/linkedin/callback', async (req, res) => {
  const code = req.query.code;
  try {
    // Trocar code por access token
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET
      })
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Buscar e-mail e nome
    const emailRes = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const emailJson = await emailRes.json();
    const email = emailJson.elements[0]['handle~'].emailAddress;

    const profileRes = await fetch('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const profile = await profileRes.json();

    const uid = `linkedin:${profile.id}`;
    const name = `${profile.localizedFirstName} ${profile.localizedLastName}`;

    // Gerar custom token do Firebase
    const customToken = await admin.auth().createCustomToken(uid, { name, email });

    // Redirecionar para frontend com token
    res.redirect(`https://cuide-me.vercel.app/index.html?token=${customToken}`);
  } catch (error) {
    console.error('Erro no LinkedIn OAuth:', error);
    res.status(500).send('Erro na autenticação com LinkedIn.');
  }
});

module.exports = app;
