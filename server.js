require("dotenv").config(); // Load .env at the very top
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // Serve frontend files

// Create transporter once
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST route for contact form
// app.post("/send", (req, res) => {
//   const { name, email, message } = req.body;

//   const mailOptions = {
//     from: process.env.EMAIL_USER, // Gmail account
//     to: process.env.EMAIL_USER,   // Your inbox
//     subject: `Portfolio Contact Form: ${name}`,
//     text: `From: ${email}\n\n${message}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Send email error:", error);
//       return res.status(500).send("❌ Error sending email.");
//     }
//     res.send("✅ Message sent successfully!");
//   });
// });

// POST route for contact form
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact Form: ${name}`,
    text: `From: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Send email error:", error);
      return res.status(500).send(`
        <div style="text-align: center; margin-top: 40px;">
          <img src="https://img.icons8.com/color/96/000000/error.png" alt="Error">
          <p style="color: red; font-size: 20px; font-weight: bold;">
            ❌ Error sending email.
          </p>
        </div>
      `);
    }

    res.send(`
      <div style="text-align: center; margin-top: 40px;">
        <img src="/Successful.png" alt="Success">
        <p style="color: green; font-size: 20px; font-weight: bold;">
          ✅ Message sent successfully!
        </p>
      </div>
    `);
  });
});


// Test route
app.get("/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email from Portfolio",
      text: "✅ If you see this, your backend email is working!",
    });
    res.send("✅ Test email sent! Check your inbox.");
  } catch (error) {
    console.error("Email test error:", error);
    res.status(500).send("❌ Failed to send test email.");
  }
});

// Start server once
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
  console.log("Email:", process.env.EMAIL_USER);
  console.log("Password:", process.env.EMAIL_PASS ? "Loaded ✅" : "Not Loaded ❌");
});
