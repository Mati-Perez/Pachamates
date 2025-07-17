// src/components/OfertasDestacadas.jsx
import { Box, Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import productos from '../data/productos.json';

export default function OfertasDestacadas() {
  // Filtrar productos en oferta (por ejemplo, precio menor a cierto valor o con una propiedad extra)
  const ofertas = productos.filter(p => p.precio < 6000); // ejemplo simple

  return (
    <Box sx={{ padding: 4, backgroundColor: '#101d20ff' }}>
      <Typography variant="h5" textAlign="center" gutterBottom sx={{color: '#E2C7A1'}}>
        🛍️ Ofertas destacadas
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {ofertas.map(producto => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={producto.id}>
            <ProductCard
              producto={producto}
              origen="inicio"
            />

          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
