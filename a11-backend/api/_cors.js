function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function handlePreflight(req, res) {
  if (req.method === 'OPTIONS') {
    setCORS(res);
    res.statusCode = 204;
    res.end();
    return true;
  }
  return false;
}

module.exports = { setCORS, handlePreflight };
