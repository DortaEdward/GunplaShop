const jwt = require('jsonwebtoken');
const Joi = require('joi');
// Schema Validation
const registerJoiSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  fname:Joi.string().required(),
  lname:Joi.string().required(),
});
const loginJoiSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

module.exports = {
  async createToken(user,res){
    delete user._doc.password;
    delete user._doc.createdAt;
    delete user._doc.updatedAt;
    delete user._doc.__v;
    const payload = {...user._doc};
    jwt.sign( payload,
      process.env.JWTSECRET,
      { expiresIn: '1d' },
      (error, token) => {
        if(error){
          res.status(500);
          next(error);
        } else {
          res
            .status(200)
            .json({
              status: res.statusCode,
              token:token,
              userId: user._id
            })
        }
      }
    )
  },
  async validateRegister(payload){
    return await registerJoiSchema.validateAsync(payload);
  },
  async validateLogin(payload){
    return await loginJoiSchema.validateAsync(payload);
  },
};