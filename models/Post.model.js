const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: [true, 'Title required.'],
  },
  content: { type: String, maxlength: 500, required: true },
  tags: [{ type: String }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = model('Post', postSchema);
