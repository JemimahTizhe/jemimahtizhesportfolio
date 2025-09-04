require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // Serve HTML/CSS/JS from 'public' folder

// POST route for form submission
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact Form: ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email.");
    }
    res.send("Message sent successfully!");
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});


console.log("Email:", process.env.EMAIL_USER);
console.log("Password:", process.env.EMAIL_PASS ? "Loaded ✅" : "Not Loaded ❌");

//for testing the email
app.get("/test-email", async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // send it to yourself
      subject: "Test Email from Portfolio",
      text: "✅ If you see this, your backend email is working!"
    });

    res.send("✅ Test email sent! Check your inbox.");
  } catch (error) {
    console.error("Email test error:", error);
    res.status(500).send("❌ Failed to send test email.");
  }
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});




app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
