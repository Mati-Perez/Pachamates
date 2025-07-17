import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import { useState } from 'react';
import DatosPersonales from '../components/cuenta/DatosPersonales';
import HistorialPedidos from '../components/cuenta/HistorialPedidos';
import DireccionesGuardadas from '../components/cuenta/DireccionesGuardadas';
import SeguimientoEnvios from '../components/cuenta/SeguimientoEnvios';

export default function Cuenta() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ backgroundColor: '#724817', minHeight: '100vh', padding: 4 }}>
      <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 4 }}>
        Mi cuenta
      </Typography>

      <Paper sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
        <Tabs
          value={tab}
          onChange={(e, val) => setTab(val)}
          textColor="inherit"
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: '#101d20ff'
            }
          }}
        >
          <Tab label="Datos personales" />
          <Tab label="Pedidos" />
          <Tab label="Seguimiento" />
          <Tab label="Direcciones" />
        </Tabs>

        <Box sx={{ padding: 4 }}>
          {tab === 0 && <DatosPersonales />}
          {tab === 1 && <HistorialPedidos />}
          {tab === 2 && <SeguimientoEnvios />}
          {tab === 3 && <DireccionesGuardadas />}
        </Box>
      </Paper>
    </Box>
  );
}
