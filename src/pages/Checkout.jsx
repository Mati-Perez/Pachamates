// src/pages/Checkout.jsx

import { useCart } from '../context/useCart';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ nombre: '', email: '', direccion: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!form.nombre || !form.email || !form.direccion) {
      alert('Por favor completá todos los campos.');
      return;
    }

    alert(`¡Gracias por tu compra, ${form.nombre}! 🧉`);
    clearCart();
    navigate('/');
  };

  return (
    <Box sx={{  margin: '0 auto', padding: 4, backgroundColor: '#724817' }}>
      <Box sx={{ border:'1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', boxShadow: 4, borderRadius:10 ,maxWidth: 600, margin: '0 auto', padding: 4, color: 'white' }}>

      <Typography variant="h4" gutterBottom>
        Finalizar compra
      </Typography>

      {/* 🛒 Resumen del carrito */}
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
             sx={{
                color: 'white',
                '& .MuiTypography-root': { color: 'white' }
              }}

              primary={`${item.nombre} x${item.cantidad}`}
              secondary={`$${(item.precio * item.cantidad).toLocaleString('es-AR')}`}
            />
          </ListItem>
        ))}
        <Divider  sx={{
          backgroundColor: 'white',
        }}
      />
        <ListItem>
          <Typography variant="h6">
            Total: ${totalPrice.toLocaleString('es-AR')}
          </Typography>
        </ListItem>
      </List>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <TextField
          fullWidth
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          margin="normal"
          sx={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' }
          }}}

        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
          sx={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' }
          }}}
        />
        <TextField
          fullWidth
          label="Dirección de envío"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          margin="normal"
          sx={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' }
          }}}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Confirmar compra
        </Button>
      </Box>
    </Box>
    </Box>
  );
}
