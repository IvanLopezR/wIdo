const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  });

const thing = mongoose.model('thing', userSchema);
module.exports = thing;