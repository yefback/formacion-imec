// formacion-imeca-backend/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para generar JWT (la usaremos internamente)
const generateToken = (id, role) => {
    return jwt.sign({ user: { id, role } }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe con este correo electrónico' });
        }

        user = new User({
            name,
            email,
            password,
            role: role || 'user',
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = generateToken(user.id, user.role);

        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Autenticar usuario y obtener token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const token = generateToken(user.id, user.role);

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};