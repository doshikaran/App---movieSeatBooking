require("dotenv").config;
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/payment", async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      payment_method_types:['card']
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({
      clientSecret,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("port 3000");
});
