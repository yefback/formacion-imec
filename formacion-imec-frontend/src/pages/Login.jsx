import React, { useState } from 'react'; // Importa useState
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Login.css'; // Asegúrate de tener este archivo CSS

const Login = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [message, setMessage] = useState(''); // Estado para mensajes al usuario
  const [loading, setLoading] = useState(false); // Estado para indicar si está cargando

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Correo inválido')
      .required('Campo requerido'),
    password: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Campo requerido'),
  });

  const handleSubmit = async (values) => { // Marca la función como async
    setMessage(''); // Limpia mensajes anteriores
    setLoading(true); // Activa el estado de carga

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviamos los valores del formulario
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json(); // Parsea la respuesta JSON

      if (response.ok) { // Si el código de estado es 2xx (éxito)
        setMessage('¡Inicio de sesión exitoso! Redirigiendo...');
        console.log('Usuario logueado:', data);

        // *** MUY IMPORTANTE: Guardar el token y la info del usuario ***
        // Esto permite mantener la sesión del usuario.
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Guarda info básica del usuario

        // Redirige al usuario al dashboard después de un breve delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000); // 1 segundo para que el usuario vea el mensaje de éxito
      } else {
        // Si el servidor responde con un error (ej. 400 Bad Request)
        setMessage(`Error al iniciar sesión: ${data.msg || 'Credenciales inválidas.'}`);
        console.error('Error al iniciar sesión:', data);
      }
    } catch (error) {
      // Si hay un error de red (ej. el backend no está corriendo)
      setMessage('Error de conexión con el servidor. Asegúrate de que el backend esté funcionando.');
      console.error('Error de red:', error);
    } finally {
      setLoading(false); // Desactiva el estado de carga al finalizar
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <label htmlFor="email">Correo electrónico</label>
          <Field type="email" name="email" id="email" />
          <ErrorMessage name="email" component="div" className="error" />

          <label htmlFor="password">Contraseña</label>
          <Field type="password" name="password" id="password" />
          <ErrorMessage name="password" component="div" className="error" />

          {/* Deshabilita el botón mientras la petición está cargando */}
          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <p className="register-text">
            ¿No tienes cuenta? <a href="/signup">Regístrate aquí</a>
          </p>
        </Form>
      </Formik>

      {/* Muestra los mensajes de éxito o error */}
      {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>}
    </div>
  );
};

export default Login;