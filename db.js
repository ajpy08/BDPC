const mongoose = require('mongoose');
const enviroment = require('./config/config').config();

mongoose.connect(enviroment.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log('Base de datos Mongoose: \x1b[32m%s\x1b[0m', 'ONLINE');
  });
  mongoose.connection.on('reconnected', () => {
    console.log('Connection Reestablished');
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Connection Disconnected');
  });
  
  mongoose.connection.on('close', () => {
    console.log('Connection Closed');
  });
  
  mongoose.connection.on('error', (error) => {
    console.log('ERROR: ' + error);
  });