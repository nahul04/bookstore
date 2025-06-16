const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/notify", (req, res) => {
  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  } = req.body;

  const merchant_secret = "YOUR_MERCHANT_SECRET"; // Get from PayHere dashboard

  const localSig = crypto
    .createHash("md5")
    .update(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        crypto.createHash("md5").update(merchant_secret).digest("hex")
    )
    .digest("hex")
    .toUpperCase();

  if (md5sig === localSig) {
    // Signature verified
    if (status_code === "2") {
      console.log("✅ Payment Success:", order_id);
      // Update DB, mark order as paid
    } else {
      console.log("❌ Payment Failed or Cancelled");
    }
  } else {
    console.log("🚫 Signature Mismatch");
  }

  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
