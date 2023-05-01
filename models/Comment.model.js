const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, maxlength: 500 },
});

module.exports = model('Comment', commentSchema);
