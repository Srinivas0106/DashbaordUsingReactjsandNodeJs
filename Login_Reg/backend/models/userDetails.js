const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: "UserInfo"
});

mongoose.model('Userinfo', userDetailsSchema);

module.exports = mongoose.model('Userinfo');
