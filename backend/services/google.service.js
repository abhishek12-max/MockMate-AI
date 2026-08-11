const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const getGoogleAuthUrl = () => {
  return googleClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "openid",
      "email",
      "profile",
    ],
  });
};

const getGoogleUser = async (code) => {
  const { tokens } = await googleClient.getToken(code);

  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return {
    googleId: payload.sub,
    fullname: payload.name,
    email: payload.email,
    profileImage: payload.picture || "",
    emailVerified: payload.email_verified,
  };
};

module.exports = {
  getGoogleAuthUrl,
  getGoogleUser,
};