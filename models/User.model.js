const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username required.'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },

    // interests: [{type: String}],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
