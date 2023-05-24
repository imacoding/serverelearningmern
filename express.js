const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const helmet = require('helmet');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const cors = require('cors');

const app = express();

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual URL of your client
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
};

// Enable CORS with options
app.use(cors(corsOptions));


// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())

require('dotenv').config();
//console.log(process.env.JWT_SECRET);


const clientFolderPath = path.resolve('../client');

app.use('/dist', express.static(path.join(clientFolderPath, 'dist')));

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', courseRoutes)
app.use('/', enrollmentRoutes)



// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

module.exports = app;

