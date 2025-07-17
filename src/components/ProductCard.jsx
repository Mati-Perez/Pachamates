// src/components/ProductCard.jsx

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@mui/material';
import { useCart } from '../context/useCart';

export default function ProductCard({ producto, origen }) {
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 350, 
      margin: 2,  
      boxShadow: 6,
      borderRadius: 4,
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      color: 'white',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: 550
     }}>
      <CardMedia
        component="img"
        height="350" // más alto
        image={producto.imagen}
        alt={producto.nombre}
        sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />

      <CardContent>
        <Typography variant="h6" component="div" gutterBottom sx={{ color: 'white' }}>
          {producto.nombre}
        </Typography>

        <Typography variant="body2" sx={{ color: 'white' }}>
          {producto.descripcion}
        </Typography>

        <Typography variant="subtitle1" sx={{ marginTop: 1, color: 'white' }}>
          ${producto.precio.toLocaleString('es-AR')}
        </Typography>

      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={() => addToCart(producto)}
          sx={{
          backgroundColor: origen === 'inicio' ? '#724817' : '#101d20ff',
          '&:hover': {
            backgroundColor: origen === 'inicio' ? '#b9ad8bff' : '#607388ff'
          }
        }}

        >
          Agregar al carrito
        </Button>
      </CardActions>
    </Card>
  );
}
