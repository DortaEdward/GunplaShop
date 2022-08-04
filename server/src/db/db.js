const mongoose = require('mongoose');
mongoose.connect(process.env.DBURI);
const { connection: db } = mongoose;

db.on('connected', () => {
  console.log('DB Connected');
});

db.on('disconnected', () => {
  console.log('Db disconnected');
});

db.on('error', (err) => {
  console.log(`Error Occurred with DB | ${err}`);
});

module.exports = db;