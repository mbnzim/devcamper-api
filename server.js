const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Router files
const bootcamps = require('./routers/bootcampes');
const courses = require('./routers/courses');
const auth = require('./routers/auth');

const app = express();

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//File uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}.red`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
