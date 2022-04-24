const express = require("express");
const cors = require("cors");
const path = require("path");
const compression = require("compression")

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

const port = process.env.PORT || 5000;

app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/build", 'index.html'))
  })
}

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd"
  }

  stripe.charges.create(body, (error, response) => {
    if (error) {
      res.status(500).json({error})
    } else {
      res.status(200).json({success: response})
    }
  })
})

app.listen(port, error => {
    if(error) throw error;
    console.log(`Server is running on port ${port}...`)
})
