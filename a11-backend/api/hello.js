const { setCORS, handlePreflight } = require('./_cors');

module.exports = async (req, res) => {
  if (handlePreflight(req, res)) return;
  setCORS(res);
  res.status(200).json({ ok: true, message: 'a11-backend is alive' });
};
