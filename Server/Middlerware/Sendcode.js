import nodemailer from "nodemailer";

export const Sendcode = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: `"Gym Management System" <${process.env.EMAIL}>`,
      to: email,
      subject: "Verify Your Email Address",
      text: `Your verification code is ${code}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">
            <h2 style="color:#333;">Email Verification</h2>
            <p style="color:#555; font-size:15px;">
              Thank you for registering with <strong>Gym Management System</strong>.
            </p>
            <p style="color:#555;">
              Please use the verification code below to complete your registration:
            </p>

            <div style="
              font-size:28px;
              font-weight:bold;
              letter-spacing:4px;
              text-align:center;
              margin:20px 0;
              color:#2e7d32;">
              ${code}
            </div>

            <p style="color:#555; font-size:14px;">
              This code will expire in <strong>10 minutes</strong>.
              If you did not request this, please ignore this email.
            </p>

            <hr style="margin:30px 0;" />

            <p style="font-size:13px; color:#999;"> © ${new Date().getFullYear()} Gym Management System. All rights reserved. </p>
             <hr style="margin:30px 0;" />
            <p style="font-size:13px; color:#999;">  © ||Developer : Muhammad Yahya || </p>
          </div>
        </div>
      `,
    });

    console.log(`Verification email sent to ${email}`);
    return { success: true  };
  } catch (error) {
    console.error("Email send error:", error.message);
    return { success: false, error: error.message };
  }
};       