// Dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const volleyball = require('volleyball');
require('dotenv').config();

const app = express();

// Cors Settings
const corsOrigin = process.env.ORIGIN || `http://localhost:8080`
var corsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200
}

// DB
require('./db/db');

// Middlewares
const { notFound, errorHandler } = require('./middlewares');

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(volleyball);

// Controllers
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');

// Models
const Users = require('./db/models/user');

// Routes
app.get('/', async (req,res) => {
  const users = await Users.find();
  res.json({
    status: 200,
    message: 'Welcome to GunplaStore Api',
    users: users
  });
});

app.use(`/api/v${process.env.VERSION}/auth`, authRoute);
app.use(`/api/v${process.env.VERSION}/user`, userRoute);
app.use(`/api/v${process.env.VERSION}/product`, productRoute);
app.use(`/api/v${process.env.VERSION}/cart`, cartRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log('Listening on Port: ' + PORT);
})