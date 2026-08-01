import nodemailer from "nodemailer";

/* =====================================
   Create Email Transporter
===================================== */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =====================================
   Send Email
===================================== */

const sendEmail = async ({
  to,
  subject,
  text,
  html,
}) => {
  try {
    const mailOptions = {
      from: `"LifeLine AI" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully.",
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email Error:", error);

    throw new Error("Failed to send email.");
  }
};

export default sendEmail;