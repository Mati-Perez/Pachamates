import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = () => {
  if (!form.email || !form.password) {
    setError('Por favor completá todos los campos.');
    return;
  }

  localStorage.setItem('usuario', JSON.stringify({ email: form.email }));

  const redirigirCheckout = localStorage.getItem('redirigirCheckout');

  if (redirigirCheckout === 'true') {
    localStorage.removeItem('redirigirCheckout');
    navigate('/checkout');
  } else {
    navigate('/');
    window.location.reload();
  }
};

  return (
    <Box
      sx={{
        margin: '0 auto',
        padding: 4,
        backgroundColor: '#724817',
        height: '70vh',
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
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Ingresar
        </Typography>

        <Box component="form" sx={{ mt: 3, width: '80%' }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            fullWidth
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              }
            }}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            fullWidth
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              }
            }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ mt: 3, width: '60%' }}
          disabled={!form.email || !form.password}
        >
          Iniciar sesión
        </Button>

        {error && (
          <Typography sx={{ mt: 2, color: '#FFD700', textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          ¿No tenés cuenta?{' '}
          <Link href="/registro" sx={{ color: '#FFD700', textDecoration: 'underline' }}>
            Registrate acá
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
