const mongoose = require('mongoose');
const validator = require('validator'); // library for validating
const bcrypt = require('bcryptjs'); // famous hashing/encrypting package

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'A password must have more or equal then 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // this only works on create and save event !!!
      validator: function (val) {
        return val === this.password;
      },
      message: 'Oops!! there is no matching password',
    },
  },
});

//------- Mongoose Middleware -------//

// Securing Password
userSchema.pre('save', async function (next) {
  // If the password is not modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12 or salt rounds
  this.password = await bcrypt.hash(this.password, 12);

  // Deleting passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

// This is for all find methods
userSchema.pre(/^find/, function (next) {
  // this points to the current query obj.
  this.find({ role: { $ne: 'admin' } });
  next();
});

// Checking password with user password
// Here we use instance methods which can be accessible to all docs of userSchema i.e. methods
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Model
const User = mongoose.model('User', userSchema);

module.exports = User;
