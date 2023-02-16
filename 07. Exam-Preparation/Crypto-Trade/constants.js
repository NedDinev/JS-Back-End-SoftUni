const PORT = 3000;
const SECRET = "somesecretsecret";
const paymentMethodsMap = {
  "crypto-wallet": "Crypto Wallet",
  "credit-card": "Credit Card",
  "debit-card": "Debit Card",
  paypal: "PayPal",
};

module.exports = { PORT, SECRET, paymentMethodsMap };
