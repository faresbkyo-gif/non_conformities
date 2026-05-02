const bcrypt = require('bcryptjs');
const userRepository = require('../../infrastructure/repositories/userRepository');
const { signToken } = require('../../infrastructure/auth/jwt');

async function register(req, res) {
  try {
    const { email, password } = req.body;
    const existing = await userRepository.findByEmail(email);
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ email, passwordHash });
    const token = signToken({ sub: user.id, email: user.email });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ sub: user.id, email: user.email });
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { register, login };
