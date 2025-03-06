import Bus from '../models/bus.js';

/**
 * Gets all buses from the database.
 * **Note**: Only authenticated users can access this route.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('operator');
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Creates a new bus and saves it to the database.
 * **Note**: Only operators can create buses.
 * @param {string} req.user._id - The ID of the authenticated user (operator).
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the bus is created and saved.
 */
export const createBus = async (req, res) => {
  try {
    const { busNumber, route, totalSeats, departureTime, arrivalTime } =
      req.body;
    const operatorId = req.user._id; // From authMiddleware

    console.log('hello');

    const bus = new Bus({
      busNumber,
      route,
      totalSeats,
      operator: operatorId,
      schedule: { departureTime, arrivalTime },
      availableSeats: totalSeats, // Initialize available seats
    });
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    res.send({ error: error.message });
    console.log(error);
  }
};
