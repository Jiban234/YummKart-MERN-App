import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendOtpEmail = async ({ email, otp }) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        padding: 20px;
      ">
        <div style="
          max-width: 500px;
          margin: auto;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        ">
        <h1 style="
            text-align: center;
            color: #ff4d2d;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          ">
            YummKart
          </h1>
          <h2 style="
            text-align: center;
            color: #ff4d2d;
            margin-bottom: 20px;
          ">
            Password Reset Request
          </h2>
          <p style="font-size: 16px; color: #333;">
            Hello,
          </p>
          <p style="font-size: 16px; color: #333; line-height: 1.5;">
            We received a request to reset your password. Use the OTP below to proceed with resetting your password.
          </p>
          
          <div style="
            text-align: center;
            margin: 25px 0;
          ">
            <span style="
              display: inline-block;
              background-color: #ff4d2d;
              color: #fff;
              font-size: 22px;
              letter-spacing: 6px;
              padding: 10px 20px;
              border-radius: 6px;
              font-weight: bold;
            ">
              ${otp}
            </span>
          </div>

          <p style="font-size: 15px; color: #555; line-height: 1.5;">
            This OTP is valid for the next <strong>10 minutes</strong>. 
            If you didn’t request this, please ignore this email — your account remains secure.
          </p>

          <p style="
            margin-top: 25px;
            font-size: 14px;
            color: #888;
            text-align: center;
          ">
            © ${new Date().getFullYear()} YummKart | All Rights Reserved
          </p>
        </div>
      </div>
    `,
  });
};


export const sendDeliveryOtpEmail = async (user, otp) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Delivery Verification OTP - YummKart",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        padding: 20px;
      ">
        <div style="
          max-width: 500px;
          margin: auto;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        ">
          <h1 style="
            text-align: center;
            color: #ff4d2d;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          ">
            YummKart
          </h1>
          <h2 style="
            text-align: center;
            color: #ff4d2d;
            margin-bottom: 20px;
          ">
            Delivery Verification
          </h2>
          <p style="font-size: 16px; color: #333;">
            Hello ${user.fullName},
          </p>
          <p style="font-size: 16px; color: #333; line-height: 1.5;">
            Your order is ready for delivery! Please share this OTP with the delivery person to confirm the delivery.
          </p>
          
          <div style="
            text-align: center;
            margin: 25px 0;
          ">
            <span style="
              display: inline-block;
              background-color: #ff4d2d;
              color: #fff;
              font-size: 32px;
              letter-spacing: 8px;
              padding: 15px 30px;
              border-radius: 8px;
              font-weight: bold;
            ">
              ${otp}
            </span>
          </div>

          <p style="font-size: 15px; color: #555; line-height: 1.5;">
            This OTP is valid for the next <strong>5 minutes</strong>. 
            <br/><br/>
            ⚠️ <strong>Important:</strong> Only share this OTP with the delivery person when they arrive at your location.
          </p>

          <div style="
            margin-top: 20px;
            padding: 15px;
            background-color: #fff9f6;
            border-left: 4px solid #ff4d2d;
            border-radius: 4px;
          ">
            <p style="margin: 0; font-size: 14px; color: #666;">
              💡 <strong>Tip:</strong> Verify the delivery person's identity and check your order before sharing the OTP.
            </p>
          </div>

          <p style="
            margin-top: 25px;
            font-size: 14px;
            color: #888;
            text-align: center;
          ">
            © ${new Date().getFullYear()} YummKart | All Rights Reserved
          </p>
        </div>
      </div>
    `,
  });
};


