import { Box, TextField, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

export default function DireccionesGuardadas() {
  const [usuario, setUsuario] = useState(null);
  const [nuevaDireccion, setNuevaDireccion] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(data);
  }, []);

  const agregarDireccion = () => {
    const actualizadas = [...(usuario.direcciones || []), nuevaDireccion];
    const actualizado = { ...usuario, direcciones: actualizadas };
    setUsuario(actualizado);
    localStorage.setItem('usuario', JSON.stringify(actualizado));
    setNuevaDireccion('');
  };

  const eliminarDireccion = (index) => {
    const actualizadas = usuario.direcciones.filter((_, i) => i !== index);
    const actualizado = { ...usuario, direcciones: actualizadas };
    setUsuario(actualizado);
    localStorage.setItem('usuario', JSON.stringify(actualizado));
  };

  if (!usuario) return null;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Direcciones guardadas</Typography>

      {usuario.direcciones?.map((dir, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>{dir}</Typography>
          <Button color="error" onClick={() => eliminarDireccion(index)}>Eliminar</Button>
        </Box>
      ))}

      <TextField
        label="Nueva dirección"
        value={nuevaDireccion}
        onChange={(e) => setNuevaDireccion(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Button variant="outlined" onClick={agregarDireccion} sx={{ mt: 1 }}>
        Agregar dirección
      </Button>
    </Box>
  );
}
