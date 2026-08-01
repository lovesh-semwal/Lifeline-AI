import nodemailer from "nodemailer";

// =====================================
// Email Transporter
// =====================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =====================================
// Send Generic Email
// =====================================

export const sendEmail = async (
  to,
  subject,
  text,
  html = ""
) => {
  try {
    const mailOptions = {
      from: `"LifeLine AI" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
};

// =====================================
// Emergency Notification
// =====================================

export const sendEmergencyAlert = async (
  email,
  patientName,
  emergencyType
) => {
  const subject = "🚨 Emergency Alert - LifeLine AI";

  const text = `
Emergency Reported

Patient: ${patientName}

Emergency Type: ${emergencyType}

Please respond immediately.
`;

  return await sendEmail(email, subject, text);
};

// =====================================
// Blood Donor Request
// =====================================

export const sendBloodDonorAlert = async (
  email,
  bloodGroup,
  city
) => {
  const subject = "🩸 Blood Donation Request";

  const text = `
Urgent Blood Donation Required

Blood Group: ${bloodGroup}

Location: ${city}

If you are available, please contact the requester immediately.

Thank you for saving a life ❤️
`;

  return await sendEmail(email, subject, text);
};

// =====================================
// Hospital Notification
// =====================================

export const sendHospitalNotification = async (
  email,
  hospitalName,
  patientName
) => {
  const subject = "🏥 New Emergency Assigned";

  const text = `
A new emergency has been assigned.

Hospital:
${hospitalName}

Patient:
${patientName}

Please prepare your emergency team.
`;

  return await sendEmail(email, subject, text);
};

// =====================================
// Welcome Email
// =====================================

export const sendWelcomeEmail = async (
  email,
  name
) => {
  const subject = "Welcome to LifeLine AI ❤️";

  const text = `
Hello ${name},

Welcome to LifeLine AI.

Your account has been created successfully.

Stay Safe!

Team LifeLine AI
`;

  return await sendEmail(email, subject, text);
};