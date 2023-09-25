const mongoose = require('mongoose');

var schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    order: [
      {
        products: [
          {
            product: {
              type: Object,
            },
            quantity: {
              type: Number,
            },
          },
        ],
        total_price: {
          type: Number,
        },
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', schema);
