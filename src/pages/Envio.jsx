import { Box, Typography, Button, TextField, Divider, Paper } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';
import TimelineIcon from '@mui/icons-material/Timeline';

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

export default function Envio() {
  return (
    <Box sx={{ backgroundColor: '#724817', minHeight: '100vh', padding: 4 }}>
      <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 4 }}>
        Opciones de envío
      </Typography>

      <Paper sx={{ padding: 4, backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          <LocalShippingIcon sx={{ mr: 1 }} />
          Envío por Correo Argentino
        </Typography>

        <TextField
          label="Código postal"
          placeholder="Ej: 1408"
          fullWidth
          sx={inputStyle}
        />

        <Button variant="contained" sx={{ mt: 2 }}>
          Calcular costo y tiempo estimado
        </Button>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />

        <Typography>
          📦 Costo estimado: <strong>$XXX</strong>  
        </Typography>
        <Typography>
          ⏱️ Tiempo estimado: <strong>3 a 5 días hábiles</strong>
        </Typography>

        <Typography sx={{ mt: 2 }}>
          🏷️ Etiqueta generada: <code>CA-000123456</code>
        </Typography>
        <Typography>
          🔍 Número de seguimiento: <code>123456789AR</code>
        </Typography>
      </Paper>

      <Paper sx={{ padding: 4, backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          <StoreIcon sx={{ mr: 1 }} />
          Retiro en punto físico
        </Typography>

        <Typography>
          Podés retirar tu pedido en nuestro local de <strong>Villa Crespo, CABA</strong>.
        </Typography>

        <Button variant="outlined" sx={{ mt: 2, color: '#FFD700', borderColor: '#FFD700' }}>
          Elegir retiro en local
        </Button>
      </Paper>
    </Box>
  );
}
