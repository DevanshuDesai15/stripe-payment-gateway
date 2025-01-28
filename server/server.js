require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuid } = require("uuid");
const mailgun = require("mailgun-js");
const bodyParser = require("body-parser");
const twilio = require("twilio");

app.use(express.json());
app.use(express.static("./client"));
app.use(bodyParser.json());

app.use(cors("http://localhost:5173"));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// STRIPE
app.post("/checkout-session", async (req, res) => {
  try {
    const { amount } = req.body;
    // const idempotencyKey = uuid();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Custom Amount Payment",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: `http://localhost:5173/cancel`,
    });
    res.json({ id: session.id });
  } catch (err) {
    console.log(err);
  }
});

// SMS
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
app.post("/api/send-sms", async (req, res) => {
  const { to, body } = req.body;
  try {
    await client.messages.create({
      body,
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// MAIL
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILGUN_DOMAIN,
// });

app.listen(8282, () => console.log("Server is running on port 8282"));
