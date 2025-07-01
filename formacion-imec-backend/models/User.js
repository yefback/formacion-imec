// formacion-imeca-backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor, añade un nombre'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Por favor, añade un correo electrónico'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor, añade un email válido'
        ]
    },
    password: {
        type: String,
        required: [true, 'Por favor, añade una contraseña'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        select: false, // Evita que la contraseña sea devuelta en las consultas por defecto
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Roles posibles
        default: 'user', // Rol por defecto
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);