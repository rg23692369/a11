const dbConnect = require('./_db');
const { setCORS, handlePreflight } = require('./_cors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sign } = require('./_jwt');

module.exports = async (req, res) => {
  if (handlePreflight(req, res)) return;
  setCORS(res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await dbConnect();
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');

    const { username, email, password } = body;
    if (!username || !email || !password) return res.status(400).json({ error: 'username, email, password required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });

    const token = sign({ uid: user._id, email: user.email });
    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
