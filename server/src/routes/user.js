const express = require('express');
const router = express.Router();
const Users = require('../db/models/user');
const bcrypt = require('bcrypt');

// get user
router.get('/', async (req,res,next) => {
  console.log('Hit Route')
  try {
    const { userId } = req.query;
    const foundUser = await Users.findById(userId);
    if(foundUser && foundCart){
      delete foundUser._doc.password;
      res.status(200).json({
        status: res.statusCode,
        user: foundUser,
      });
    } else {
      const error = new Error('User Not Found');
      next(error);
    }
  } catch (error) {
    next(error);
  }
})

// update user
router.put('/', async (req,res,next) => {
  try {
    const { userId } = req.query;
    if(userId == req.body.userId){
      if(req.body.password){
        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds);
        req.body.password = await bcrypt.hashSync(req.body.password, salt);
      };
      await Users.findByIdAndUpdate(userId,{$set: req.body});
      res
        .status(200)
        .json({
          status: res.statusCode,
          message:'Updated User',
        });
    } else {
      const error = new Error('Unauthorized');
      next(error);
    }
  } catch (error) {
    next(error);
  }
})

// delete user
router.delete('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (userId === req.body.userId) {
      const deletedUser = await Users.findByIdAndDelete(userId);
      if(deletedUser){
        res
        .status(200)
        .json({
          status: res.statusCode,
          message:'User Deleted'
        });
      } else {
        const error = new Error('User Does not Exists');
        next(error);
      }
    } else {
      const error = new Error('Unauthorized');
      next(error);
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;