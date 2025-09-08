const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');

router.get('/perfil', authMiddleware, (req, res) => {
  res.json({
    msg: 'Acceso autorizado',
    user: req.user // Puedes usar req.user.id o req.user.role
  });
});

module.exports = router;