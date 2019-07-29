const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  title: String,
  timestamps:Date,
  username:{ type: Schema.Types.ObjectId, ref: "User" },
  coordinates:{
      lng:Number,
      lat:Number
  },
  type: {
    type: String,
    enum: ["Food Place","Visit Place"],
    default: 'Visit Place'
  },
  imgName: String,
  comments:[{ type: Schema.Types.ObjectId, ref: "Comments" }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Place = mongoose.model('Place', userSchema);
module.exports = Place;
