const mongoose = require('mongoose');

const luggageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    departurePoint: {
      type: String,
      required: [true, 'Please add a departure point'],
    },
    destination: {
      type: String,
      required: [true, 'Please add a destination'],
    },
    ticketNumber: {
      type: String,
      required: [true, 'Please add a ticket number'],
      unique: true, // Ensures each ticket number is unique
    },
    email: {
      type: String,
      required: [true, 'Please add an email address'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    bags: [
      {
        items: [
          {
            characteristic1: { type: String, required: true },
            characteristic2: { type: String, required: true },
            characteristic3: { type: String, required: true },
          },
        ],
        itemCount: {
          type: Number,
          default: 0, // Keeps count of the number of items in the bag
        },
      },
    ],
    bagCount: {
      type: Number,
      default: 0, // Keeps count of the number of bags
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Luggage', luggageSchema);
