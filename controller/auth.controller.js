const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validators/auth.validation');
const generatePassword = require('../utils/passwordGenerator');

require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, phone } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const rawPassword = generatePassword(name, email, phone);
    console.log(`Generated password for ${email}: ${rawPassword}`); //password will be printed on console , we can also use the nodemailer to send the password to the usermail id 
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'Member',
      isApproved: false
    });
    console.log(newUser); // log the new user object t
    return res.status(201).json({ message: 'User registered. Await admin approval.' });
  } catch (err) {
    return res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.isApproved) return res.status(403).json({ error: 'User not approved by admin' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'Login failed', details: err.message });
  }
};
