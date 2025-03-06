import Booking from '../models/booking.js';

/**
 * Creates a new booking and saves it to the database.
 * **Note**: Only authenticated users can access this route.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.bus - The ID of the bus.
 * @param {string} req.body.tripDate - The date of the trip.
 * @param {number} req.body.seatNumber - The seat number to book.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the booking is created and saved.
 */
export const createBooking = async (req, res) => {
  try {
    const { bus, tripDate, seatNumber } = req.body;
    const userId = req.user._id; // From authMiddleware

    const booking = new Booking({
      user: userId,
      bus,
      tripDate,
      seatNumber,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Gets all bookings from the database
 * **Note**: Only authenticated users can access this route.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Cancels a booking by updating its status to 'cancelled'.
 * **Note**: Only authenticated users can access this route.
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The ID of the booking to cancel.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!booking) return res.status(404).json({ error: 'Booking not found.' }); // Check if booking exists

    if (booking.status === 'cancelled')
      return res.status(400).json({ error: 'Booking already cancelled.' }); // Check if booking is already cancelled

    booking.status = 'cancelled';
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
