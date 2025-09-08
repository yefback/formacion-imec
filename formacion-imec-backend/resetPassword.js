// resetPassword.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config(); // si usas .env

// 1. Importar tu modelo de usuario
const User = require('./models/User'); // ajusta la ruta si está en otro lugar

// 2. Conectar a la base de datos
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://jefferbaquero2:wVg377bNHLtIq6gb@cluster0.hscuev8.mongodb.net/formacion_imec_bd?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🟢 Conectado a MongoDB'))
.catch(err => {
  console.error('🔴 Error al conectar a MongoDB', err);
  process.exit(1);
});

// 3. Cambiar la contraseña
async function resetPassword(email, nuevaClave) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`❌ Usuario con email ${email} no encontrado.`);
      return;
    }

    const hash = await bcrypt.hash(nuevaClave, 10);
    user.password = hash;

    await user.save();

    console.log(`✅ Contraseña actualizada para ${email}`);
  } catch (err) {
    console.error('⚠️ Error al actualizar la contraseña:', err);
  } finally {
    mongoose.connection.close();
  }
}

// 👇 Llama a la función con el correo del usuario y la nueva contraseña
resetPassword('baquero_paola96@hotmail.com', 'Imec2025*');
