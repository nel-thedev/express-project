const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: { type: String, maxlength: 500 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports('Post', postSchema);
