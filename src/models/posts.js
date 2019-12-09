const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostsSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, unique: true, required: true },
    content: { type: String, required: true, trim: true },
    _id_users: { type: String, require: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Posts', PostsSchema);
