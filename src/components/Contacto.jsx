// src/pages/Contacto.jsx
import { Box, TextField, Button, Typography } from '@mui/material';

export default function ContactoSection() {
  return (
    <Box sx={{ padding: 4, height: '65vh', margin: '0 auto', backgroundColor: '#724817', color: 'white', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Contactanos
      </Typography>
      <Box sx={{ width: { xs: '90%', sm: '70%', md: '50%' }, margin: '0 auto' }}>
        <TextField fullWidth label="Nombre" margin="normal" sx={{ backgroundColor: 'white', borderRadius: 1}}/>
        <TextField fullWidth label="Email" type="email" margin="normal" sx={{ backgroundColor: 'white', borderRadius: 1}}/>
        <TextField fullWidth label="Mensaje" multiline rows={4} margin="normal"sx={{ backgroundColor: 'white', borderRadius: 1}} />
        <Button variant="contained" sx={{ mt: 2, backgroundColor: '#101d20ff','&:hover':{backgroundColor: '#5E7892'}, maxWidth: '400px', width: {xs: '50%', sm: '50%', md: '50%'}}} fullWidth>
          Enviar
        </Button>
      </Box>
    </Box>
  );
}
