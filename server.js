const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// require mogoose to manage mongoDB in code
const mongoose = require('mongoose');

// require app(express) from app.js
const app = require('./app');

// assign env variable to variable
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// connect to the mongoDB database using mongoose
mongoose.connect(DB).then(() => console.log('Database connected...'));

// starting a server to test and view our code in console (this job will eventually be exported to an external server)
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
