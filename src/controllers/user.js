import user from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {string} req.body.role - The role of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: 'Email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ name, email, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
    );
    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
