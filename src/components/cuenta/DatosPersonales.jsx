import { Box, TextField, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

export default function DatosPersonales() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(data);
  }, []);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Datos actualizados');
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

  if (!usuario) return null;

  return (
    <Box
      sx={{
        border: '1px solid rgba(255,255,255,0.2)',
        backgroundColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: 4,
        borderRadius: 4,
        padding: 4,
        color: 'white',
        width: '100%',
        maxWidth: 700,
        margin: '0 auto'
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
        Editar datos personales
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: '250px' }}>
          <TextField label="Nombre" name="nombre" value={usuario.nombre || ''} onChange={handleChange} margin="normal" fullWidth sx={inputStyle} />
          <TextField label="Email" name="email" value={usuario.email || ''} onChange={handleChange} margin="normal" fullWidth sx={inputStyle} />
          <TextField label="Teléfono" name="telefono" value={usuario.telefono || ''} onChange={handleChange} margin="normal" fullWidth sx={inputStyle} />
          <TextField label="Ciudad" name="ciudad" value={usuario.ciudad || ''} onChange={handleChange} margin="normal" fullWidth sx={inputStyle} />
        </Box>

        <Box sx={{ flex: 1, minWidth: '250px' }}>
          <TextField label="Apellido" name="apellido" value={usuario.apellido || ''} onChange={handleChange} margin="normal" fullWidth sx={inputStyle} />
          <TextField label="Contraseña" name="password" type="password" value={usuario.password || ''} onChange={handleChange} margin="normal" fullWidth sx={inputStyle} />
          <TextField label="Dirección" name="direccion" value={usuario.direccion || ''} onChange={handleChange} margin="normal" fullWidth sx={inputStyle} />
          <TextField label="DNI (opcional)" name="dni" value={usuario.dni || ''} onChange={handleChange} margin="normal" fullWidth sx={inputStyle} />
        </Box>
      </Box>

      <Button variant="contained" onClick={handleGuardar} sx={{ mt: 3, width: '60%', margin: '0 auto', display: 'block' }}>
        Guardar cambios
      </Button>
    </Box>
  );
}
