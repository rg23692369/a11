const dbConnect = require('./_db');
const { setCORS, handlePreflight } = require('./_cors');
const User = require('../models/User');
const { verify } = require('./_jwt');

module.exports = async (req, res) => {
  if (handlePreflight(req, res)) return;
  setCORS(res);
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await dbConnect();
    const auth = req.headers['authorization'] || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Missing Bearer token' });

    let payload;
    try { payload = verify(token); } catch (e) { return res.status(401).json({ error: 'Invalid token' }); }

    const user = await User.findById(payload.uid).select('_id username email createdAt updatedAt');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
