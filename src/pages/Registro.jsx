import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Registro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    dni: ''
  });

  const [errores, setErrores] = useState({});
  const [formTocado, setFormTocado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!form.nombre) nuevosErrores.nombre = 'Campo obligatorio';
    if (!form.apellido) nuevosErrores.apellido = 'Campo obligatorio';

    if (!form.email) {
      nuevosErrores.email = 'Campo obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nuevosErrores.email = 'Email inválido';
    }

    if (!form.password) nuevosErrores.password = 'Campo obligatorio';

    if (!form.telefono) {
      nuevosErrores.telefono = 'Campo obligatorio';
    } else if (!/^\d{8,15}$/.test(form.telefono)) {
      nuevosErrores.telefono = 'Teléfono inválido';
    }

    if (!form.direccion) nuevosErrores.direccion = 'Campo obligatorio';
    if (!form.ciudad) nuevosErrores.ciudad = 'Campo obligatorio';

    return nuevosErrores;
  };

  const handleRegistro = () => {
    setFormTocado(true);
    const nuevosErrores = validarCampos();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const nuevoUsuario = {
      id: Date.now(),
      ...form,
      direcciones: [form.direccion],
      pedidos: []
    };

    localStorage.setItem('usuarios', JSON.stringify([...usuarios, nuevoUsuario]));

    alert('¡Cuenta creada con éxito!');
    navigate('/login');
  };

  const inputStyle = {
    backgroundColor: 'rgba(255,255,255,0.1)',
    input: { color: 'white' },
    label: { color: 'white' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': { borderColor: 'white' }
    }
  };

  return (
    <Box
      sx={{
        margin: '0 auto',
        padding: 4,
        backgroundColor: '#724817',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          border: '1px solid rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          boxShadow: 4,
          borderRadius: 4,
          padding: 4,
          color: 'white',
          width: '100%',
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Registrarse
        </Typography>

        <Box sx={{ mt: 3, width: '100%', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: '250px' }}>
            <TextField
              label="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              margin="normal"
              fullWidth
              sx={inputStyle}
              error={formTocado && !!errores.nombre}
              helperText={formTocado && errores.nombre}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              fullWidth
              sx={inputStyle}
              error={formTocado && !!errores.email}
              helperText={formTocado && errores.email}
            />
            <TextField
              label="Teléfono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              margin="normal"
              fullWidth
              sx={inputStyle}
              error={formTocado && !!errores.telefono}
              helperText={formTocado && errores.telefono}
            />
            <TextField
              label="Ciudad"
              name="ciudad"
              value={form.ciudad}
              onChange={handleChange}
              margin="normal"
              fullWidth
              sx={inputStyle}
              error={formTocado && !!errores.ciudad}
              helperText={formTocado && errores.ciudad}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: '250px' }}>
            <TextField
              label="Apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              margin="normal"
              fullWidth
              sx={inputStyle}
              error={formTocado && !!errores.apellido}
              helperText={formTocado && errores.apellido}
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              fullWidth
              sx={inputStyle}
              error={formTocado && !!errores.password}
              helperText={formTocado && errores.password}
            />
            <TextField
              label="Dirección"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              margin="normal"
              fullWidth
              sx={inputStyle}
              error={formTocado && !!errores.direccion}
              helperText={formTocado && errores.direccion}
            />
            <TextField
              label="DNI (opcional)"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              margin="normal"
              fullWidth
              sx={inputStyle}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={handleRegistro}
          sx={{ mt: 3, width: '60%' }}
        >
          Crear cuenta
        </Button>
      </Box>
    </Box>
  );
}
