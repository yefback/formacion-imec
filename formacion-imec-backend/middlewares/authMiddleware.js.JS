function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (token === 'mi_token_secreto') {
    next();
  } else {
    res.status(401).json({ message: 'No autorizado' });
  }
}

module.exports = authMiddleware;

