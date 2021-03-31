const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

//----- Database Connection ------//
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Mongoose connect to the Atlasdb
mongoose
  .connect(DB, {
    // Deprecation warnings
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection succesful');
  })
  .catch((err) => {
    console.log('DB connection failed');
  });


//----- Server is started on port -------//
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Running on port:${port}`);
});


