const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  country: String,
  range: {
    type: String,
    enum: ["Neighborhood","Curious","Adventurous","Jet Lag","Willy Fog"],
    default: 'Neighborhood'
  },
  countries: [],
  places: [{ type: Schema.Types.ObjectId, ref: "Place" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  imgName: String,
  token: String,
  status: {
    type: String,
    enum: ['Pending Confirmation','Active'],
    default: 'Pending Confirmation'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
