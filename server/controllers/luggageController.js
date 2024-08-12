const asyncHandler = require('express-async-handler');
const Luggage = require('../models/luggageModel');

// @desc   Get all luggages
// @route  GET /api/luggages
// @access Private
const getLuggages = asyncHandler(async (req, res) => {
  const luggages = await Luggage.find();
  res.status(200).json(luggages);
});


// @desc   Create new luggage entry
// @route  POST /api/luggages
// @access Private
const setLuggage = asyncHandler(async (req, res) => {
  const { departurePoint, destination, ticketNumber, email, phone, bags } = req.body;

  if (!departurePoint || !destination || !ticketNumber || !email || !phone || !bags) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  try {
    // Check if a luggage with the same ticketNumber already exists
    const existingLuggage = await Luggage.findOne({ ticketNumber });
    if (existingLuggage) {
      res.status(400);
      throw new Error('Luggage with this ticket number already exists');
    }

    // Calculate bagCount
    const bagCount = bags.length;

    // Create the new luggage entry
    const luggage = await Luggage.create({
      departurePoint,
      destination,
      ticketNumber,
      email,
      phone,
      bags,
      bagCount,
    });

    res.status(201).json(luggage);
  } catch (error) {
    // Handle duplicate key error or any other errors
    if (error.code === 11000) {
      res.status(400);
      throw new Error('Duplicate ticket number. Please use a unique ticket number.');
    } else {
      res.status(500);
      throw new Error('Server error');
    }
  }
});

// @desc   Update luggage entry
// @route  PUT /api/luggages/:id
// @access Private
const updateLuggage = asyncHandler(async (req, res) => {
  const luggage = await Luggage.findById(req.params.id);

  if (!luggage) {
    res.status(400);
    throw new Error('Luggage not found');
  }

  const updatedLuggage = await Luggage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedLuggage);
});

// @desc   Delete luggage entry
// @route  DELETE /api/luggages/:id
// @access Private
const deleteLuggage = asyncHandler(async (req, res) => {
  const luggage = await Luggage.findById(req.params.id);

  if (!luggage) {
    res.status(400);
    throw new Error('Luggage not found');
  }

  await Luggage.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});


module.exports = {
  getLuggages,
  setLuggage,
  updateLuggage,
  deleteLuggage,
};
