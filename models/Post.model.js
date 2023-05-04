const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: [true, 'Title required.'],
    maxlength: 50,
  },
  content: { type: String, maxlength: 2000, required: true },
  code: { type: String, maxlength: 3000, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = model('Post', postSchema);
