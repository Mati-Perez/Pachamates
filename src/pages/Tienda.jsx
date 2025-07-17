// src/pages/Tienda.jsx

import productos from '../data/productos.json';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

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

export default function Tienda() {
  const [filtros, setFiltros] = useState({
    nombre: '',
    categoria: '',
    subcategoria: '',
    precioMin: '',
    precioMax: ''
  });

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limpiarFiltros = () => {
    setFiltros({
      nombre: '',
      categoria: '',
      subcategoria: '',
      precioMin: '',
      precioMax: ''
    });
  };

  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
    const coincideCategoria = filtros.categoria ? p.categoria.toLowerCase().includes(filtros.categoria.toLowerCase()) : true;
    const coincideSubcategoria = filtros.subcategoria ? p.subcategoria.toLowerCase().includes(filtros.subcategoria.toLowerCase()) : true;
    const coincidePrecioMin = filtros.precioMin ? p.precio >= parseFloat(filtros.precioMin) : true;
    const coincidePrecioMax = filtros.precioMax ? p.precio <= parseFloat(filtros.precioMax) : true;

    return coincideNombre && coincideCategoria && coincideSubcategoria && coincidePrecioMin && coincidePrecioMax;
  });

  return (
    <div style={{ backgroundColor: '#724817', padding: '2rem' }}>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Productos</h1>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mb: 4 }}>
        <TextField
          label="Nombre"
          name="nombre"
          placeholder="Ej: mate imperial"
          value={filtros.nombre}
          onChange={handleFiltroChange}
          sx={inputStyle}
        />
        <TextField
          label="Categoría"
          name="categoria"
          placeholder="Ej: mates"
          value={filtros.categoria}
          onChange={handleFiltroChange}
          sx={inputStyle}
        />
        <TextField
          label="Subcategoría"
          name="subcategoria"
          placeholder="Ej: calabaza"
          value={filtros.subcategoria}
          onChange={handleFiltroChange}
          sx={inputStyle}
        />
        <TextField
          label="Precio mínimo"
          name="precioMin"
          type="number"
          placeholder="Ej: 1000"
          value={filtros.precioMin}
          onChange={handleFiltroChange}
          sx={inputStyle}
        />
        <TextField
          label="Precio máximo"
          name="precioMax"
          type="number"
          placeholder="Ej: 5000"
          value={filtros.precioMax}
          onChange={handleFiltroChange}
          sx={inputStyle}
        />
        <Button
          variant="outlined"
          onClick={limpiarFiltros}
          sx={{
            color: '#FFD700',
            borderColor: '#FFD700',
            height: '56px',
            alignSelf: 'center',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: '#FFD700'
            }
          }}
        >
          Limpiar filtros
        </Button>
      </Box>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
        {productosFiltrados.map((producto) => (
          <ProductCard
            producto={producto}
            origen="tienda"
          />
        ))}
      </div>
    </div>
  );
}
