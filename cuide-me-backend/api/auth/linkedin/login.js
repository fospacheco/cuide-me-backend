
export default async function handler(req, res) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;

  const state = Math.random().toString(36).substring(7); // opcional para segurança
  const scope = 'r_liteprofile r_emailaddress';

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;

  res.redirect(authUrl);
}
