const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Product = require('../../models/productModel');

dotenv.config({ path: './config.env' });

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

// READ JSON FILE
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products-simple.json`, 'utf-8')
);

// Import data into DB
const importData = async () => {
  try {
    await Product.create(products);
    console.log('Data succesfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit(); // Exit the application
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
