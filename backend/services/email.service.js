const resend = require("../config/resend");

const sendOtpEmail = async (email, otp) => {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: [email],
    subject: "Verify your MockMate AI account",
    html: `
      <div>
        <h2>Welcome to MockMate AI</h2>

        <p>Your verification OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP will expire in 5 minutes.</p>

        <p>If you did not create this account, you can ignore this email.</p>

        <p>— MockMate AI Team</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message || "Failed to send OTP email");
  }

  return data;
};

module.exports = {
  sendOtpEmail,
};