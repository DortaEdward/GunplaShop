const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../db/models/user');
const Carts = require('../db/models/cart');
const { createToken, validateRegister, validateLogin } = require('../utils/');

// sign up
router.post('/signup', async (req, res, next) => {
  try {
    const body = req.body;
    if(body){
      // validate data
      const validate = await validateRegister(body);
      if(validate){
        // encrypt password
        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds);
        body.password = await bcrypt.hashSync(body.password, salt);
        // create user
        const user = await Users.create(body);
        await user.save();
        // create cart
        console.log(`User Id: ${user.id}`);
        console.log(`User Id: ${user._id}`);
        const cart = await Carts.create({ownerId: user.id});
        await cart.save();
        res.status(200).json({
          status: 200,
          message: 'User Created',
          cart: cart
        })
      } else {
        const error = new Error('Invalid Values');
        res.status(500);
        next(error);
      }
    } else {
      const error = new Error('Missing Values');
      res.status(500);
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

// log in
router.post('/login', async (req,res,next) => {
  const body = req.body;
  try {
    // Validate req body
    const validBody = await validateLogin(body);
    // if valid
    if(validBody){
      const validUser = await Users.findOne({email:body.email});
      if(validUser){
        const validPassword = await bcrypt.compareSync(body.password,validUser.password);
        if(validPassword){
          createToken(validUser,res);
        } else {
          const error = new Error('Incorrect Password');
          res.status(401);
          next(error);
        }
      } else {
        const error = new Error('Email Not Found');
        res.status(401);
        next(error);
      }
    } else {
      const error = new Error('Missing Values');
      res.status(500);
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

// log out
router.post('/logout', (req, res) => {
  req.user = null;
  res.json({
    status:200,
    message:'User logged out',
  })
})

module.exports = router;