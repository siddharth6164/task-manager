const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    // Check for existing email
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'Email is already registered' });

    // Generate base username from last + first name
    let baseUsername = (lastname.slice(0, 3) + firstname.slice(0, 2)).toLowerCase().replace(/\s+/g, '');

    // Ensure username is unique (add numbers if necessary)
    let username = baseUsername;
    let counter = 1;
    while (await User.findOne({ username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Validate role (allow only defined roles)
    const allowedRoles = ["employee", "manager", "admin"];
    const normalizedRole = (role || "").toLowerCase();
    const roleToSave = allowedRoles.includes(normalizedRole) ? normalizedRole : undefined; // undefined -> model default

    // Create and save user
    const user = new User({ firstname, lastname, username, email, password: hash, ...(roleToSave ? { role: roleToSave } : {}) });
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
