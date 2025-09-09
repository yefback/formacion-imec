import React, { useState } from 'react'; // Importa useState
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Signup.css'; // Asegúrate de tener este archivo CSS

const Signup = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [message, setMessage] = useState(''); // Estado para mensajes al usuario
  const [loading, setLoading] = useState(false); // Estado para indicar si está cargando

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Campo requerido'),
    email: Yup.string().email('Correo inválido').required('Campo requerido'),
    password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo requerido'),
  });

  const handleSubmit = async (values) => { // Marca la función como async
    setMessage(''); // Limpia mensajes anteriores
    setLoading(true); // Activa el estado de carga

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviamos los valores del formulario, incluyendo un rol por defecto 'user'
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          role: 'user', // Rol por defecto, puedes ajustarlo si necesitas otros roles en el registro
        }),
      });

      const data = await response.json(); // Parsea la respuesta JSON

      if (response.ok) { // Si el código de estado es 2xx (éxito)
        setMessage('¡Registro exitoso! Redirigiendo a la página de inicio de sesión...');
        console.log('Usuario registrado:', data);
        // Redirige al usuario a la página de login después de 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Si el servidor responde con un error (ej. 400 Bad Request)
        setMessage(`Error en el registro: ${data.msg || 'Hubo un problema desconocido.'}`);
        console.error('Error al registrar:', data);
      }
    } catch (error) {
      // Si hay un error de red (ej. el servidor no está corriendo)
      setMessage('Error de conexión con el servidor. Asegúrate de que el backend esté funcionando.');
      console.error('Error de red:', error);
    } finally {
      setLoading(false); // Desactiva el estado de carga al finalizar
    }
  };

  return (
    <div className="signup-container">
      <h2>Registrarse</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <label htmlFor="name">Nombre completo</label>
          <Field type="text" name="name" id="name" />
          <ErrorMessage name="name" component="div" className="error" />

          <label htmlFor="email">Correo electrónico</label>
          <Field type="email" name="email" id="email" />
          <ErrorMessage name="email" component="div" className="error" />

          <label htmlFor="password">Contraseña</label>
          <Field type="password" name="password" id="password" />
          <ErrorMessage name="password" component="div" className="error" />

          {/* Deshabilita el botón mientras la petición está cargando */}
          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </button>
        </Form>
      </Formik>

      {/* Muestra los mensajes de éxito o error */}
      {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>}

      <p className="login-text">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
};

export default Signup;