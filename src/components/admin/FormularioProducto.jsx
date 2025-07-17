import { Box, TextField, Button, Typography } from '@mui/material';
import UploaderCloudinary from './UploaderCloudinary';

export default function FormularioProducto({ form, setForm, onSubmit, modoEdicion }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const camposObligatorios = ['nombre', 'descripcion', 'precio', 'stock', 'sku'];
  const camposIncompletos = camposObligatorios.some((campo) => !form[campo]);

  return (
    <Box sx={{ backgroundColor: '#101d20', color: 'white', p: 4, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {modoEdicion ? 'Editar producto' : 'Nuevo producto'}
      </Typography>

      <TextField fullWidth label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} sx={{ mb: 2,backgroundColor: 'rgba(255,255,255,0.1)',
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              } }} />
      <TextField fullWidth label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} sx={{ mb: 2,backgroundColor: 'rgba(255,255,255,0.1)',
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              } }} />
      <TextField fullWidth label="Categoría" name="categoria" value={form.categoria} onChange={handleChange} sx={{ mb: 2,backgroundColor: 'rgba(255,255,255,0.1)',
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              } }} />
      <TextField fullWidth label="Subcategoría" name="subcategoria" value={form.subcategoria} onChange={handleChange} sx={{ mb: 2,backgroundColor: 'rgba(255,255,255,0.1)',
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              } }} />
      <TextField fullWidth label="Precio" name="precio" type="number" value={form.precio} onChange={handleChange} sx={{ mb: 2,backgroundColor: 'rgba(255,255,255,0.1)',
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              } }} />
      <TextField fullWidth label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} sx={{ mb: 2,backgroundColor: 'rgba(255,255,255,0.1)',
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              } }} />
      <TextField fullWidth label="SKU" name="sku" value={form.sku} onChange={handleChange} sx={{ mb: 2,backgroundColor: 'rgba(255,255,255,0.1)',
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              } }} />
      <TextField fullWidth label="Etiquetas (separadas por coma)" name="etiquetas" value={form.etiquetas} onChange={handleChange} sx={{ mb: 2,backgroundColor: 'rgba(255,255,255,0.1)',
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              } }} />

      <UploaderCloudinary onUpload={(url) => setForm({ ...form, imagen: url })} />
      {camposIncompletos && (
        <Typography sx={{ mt: 1, color: '#FFD700' }}>
          Completá todos los campos obligatorios
        </Typography>
      )}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={onSubmit}
        disabled={camposIncompletos}
      >
        {modoEdicion ? 'Actualizar producto' : 'Guardar producto'}
      </Button>
      
    </Box>
  );
}
