import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';

export default function HistorialPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    setPedidos(usuario?.pedidos || []);
  }, []);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Historial de pedidos</Typography>
      {pedidos.length === 0 ? (
        <Typography>No tenés pedidos registrados.</Typography>
      ) : (
        pedidos.map((pedido, index) => (
          <Paper key={index} sx={{ padding: 2, mb: 2 }}>
            <Typography>Fecha: {pedido.fecha}</Typography>
            <Typography>Total: ${pedido.total}</Typography>
            <Typography>Estado: {pedido.estado}</Typography>
          </Paper>
        ))
      )}
    </Box>
  );
}
