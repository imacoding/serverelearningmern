const config = require('./config');
const app = require('./express');
const mongoose = require('mongoose');


// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database successfully!');
  })
  .catch((error) => {
    console.error(`Unable to connect to the database: ${process.env.MONGODB_URI}`);
    console.error(error);
    process.exit(1); // Exit the application if unable to connect to the database
  });

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', process.env.PORT)
})
