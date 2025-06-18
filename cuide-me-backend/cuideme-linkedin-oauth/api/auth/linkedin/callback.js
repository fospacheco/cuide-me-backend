
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
  const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Código de autorização não fornecido.' });
  }

  const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: LINKEDIN_CLIENT_ID,
      client_secret: LINKEDIN_CLIENT_SECRET
    }).toString()
  });

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return res.status(400).json({ error: 'Erro ao obter access token.', details: tokenData });
  }

  return res.redirect(`/index.html?token=${tokenData.access_token}`);
}
