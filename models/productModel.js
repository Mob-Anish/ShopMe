const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
    },
    keyword: [String],
    slug: String,
    brand: {
      type: String,
      required: [true, 'A product must have a brand'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    description: {
      type: String,
      required: [true, 'A product must have description'],
      trim: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

// MONGOOSE MIDDLEWARE
// 1) Document Middleware: pre
// Below for save event, It runs only before .save() and .create()
productSchema.pre('save', function (next) {
  // this is the current document
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
