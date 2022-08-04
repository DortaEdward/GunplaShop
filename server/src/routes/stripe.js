const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.post('/payment', async (req, res, next) => {
  try {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          next(stripeErr)
        } else {
          res.status(200).json({
            status: 200,
            message: 'Payment Went Thru',
            stripeRes: stripeRes
          });
        }
      }
    );
  } catch (error) {
    next(error);
  }
})


module.exports = router;