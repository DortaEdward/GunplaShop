const jwt = require('jsonwebtoken');
module.exports = {
  notFound(req, res, next){
    const error = new Error('Not Found - ', req.originalUrl);
    res.status(404);
    next(error);
  },
  errorHandler(){
    const statusCode = res.status === 200 ? 500 : res.statusCode;
    res
      .status(statusCode)
      .json({
        status: res.statusCode,
        error:error.message,
        stack: process.env.NODE_ENV === 'production' ? error.stack : '?',
      });
  },
  isLoggedIn(req, res, next){
    if(req.user){
      next();
    } else {
      const error = new Error('Unauthorized');
      res.status(401);
      next(error);
    }
  },
  checkTokenSetUser(req, next){
    const authHeader = req.get('authorization');
    if(authHeader){
      const token = authHeader.split(' ')[1];
      if(token){
        jwt.verify(token, process.env.JWTSECRET, (error, user) => {
          if(error){
            next(error);
          }
          req.user = user;
          next();
        })
      } else {
        next();
      }
    } else {
      next();
    }
  },
};