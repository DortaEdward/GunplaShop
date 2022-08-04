const { Schema, model} = require('mongoose');

const stringConfig = { type:String, required: true }

const userSchema = new Schema({
  email:{
    ...stringConfig,
    min: 10,
    max: 30,
    unique: true
  },
  fname:{
    ...stringConfig,
    min: 5,
    max: 15,
  },
  lname:{
    ...stringConfig,
    min: 5,
    max: 15,
  },
  password:{
    ...stringConfig,
  },
}, {timestamps: true});

const userModel = model('Users', userSchema);

module.exports = userModel;