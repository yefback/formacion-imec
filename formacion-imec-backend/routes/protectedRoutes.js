const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js.JS');

router.get('/protegido', authMiddleware, (req, res) => {
  res.json({ message: 'Accediste a una ruta protegida' });
});

module.exports = router;
