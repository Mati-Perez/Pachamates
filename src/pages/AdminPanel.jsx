import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Add, Delete, Edit } from '@mui/icons-material';
import FormularioProducto from '../components/admin/FormularioProducto';
import { Snackbar, Alert } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';


export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    subcategoria: '',
    precio: '',
    stock: '',
    sku: '',
    imagen: '',
    etiquetas: '',
    variantes: ''
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditandoId, setProductoEditandoId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMensaje, setSnackbarMensaje] = useState('');
  const [filtros, setFiltros] = useState({
    nombre: '',
    categoria: '',
    subcategoria: '',
    precioMin: '',
    precioMax: ''
  });
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    const dataBanner = JSON.parse(localStorage.getItem('bannerImages')) || [];
    const data = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(data);
    setBannerImages(dataBanner);
  }, []);
  
  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleUploadBanner = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tu_upload_preset');

    const res = await fetch('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    const nuevas = [...bannerImages, data.secure_url];
    setBannerImages(nuevas);
    localStorage.setItem('bannerImages', JSON.stringify(nuevas));
  };


  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setForm({
      nombre: '',
      descripcion: '',
      categoria: '',
      subcategoria: '',
      precio: '',
      stock: '',
      sku: '',
      imagen: '',
      etiquetas: '',
      variantes: ''
    });
    setModoEdicion(false);
    setProductoEditandoId(null);
  };

  const handleEliminar = (id) => {
    const confirm = window.confirm('¿Eliminar este producto?');
    if (!confirm) return;

    const actualizados = productos.filter((p) => p.id !== id);
    setProductos(actualizados);
    localStorage.setItem('productos', JSON.stringify(actualizados));

    setSnackbarMensaje('Producto eliminado con éxito');
    setSnackbarOpen(true);
  };

  const handleEditar = (producto) => {
    setForm({
      ...producto,
      etiquetas: producto.etiquetas.join(', '),
      variantes: '' // si querés editar variantes más adelante
    });
    setProductoEditandoId(producto.id);
    setModoEdicion(true);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleGuardarProducto = () => {
    const productoFinal = {
      ...form,
      id: productoEditandoId || Date.now(),
      etiquetas: form.etiquetas.split(',').map((t) => t.trim()),
      variantes: [] // se puede extender luego
    };

    let actualizados;
    if (modoEdicion) {
      actualizados = productos.map((p) =>
        p.id === productoEditandoId ? productoFinal : p
      );
    } else {
      actualizados = [...productos, productoFinal];
    }

    setProductos(actualizados);
    localStorage.setItem('productos', JSON.stringify(actualizados));
    setSnackbarMensaje(modoEdicion ? 'Producto actualizado con éxito' : 'Producto guardado con éxito');
    setSnackbarOpen(true);
    handleCloseModal();
  };

  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
    const coincideCategoria = filtros.categoria ? p.categoria.toLowerCase().includes(filtros.categoria.toLowerCase()) : true;
    const coincideSubcategoria = filtros.subcategoria ? p.subcategoria.toLowerCase().includes(filtros.subcategoria.toLowerCase()) : true;
    const coincidePrecioMin = filtros.precioMin ? p.precio >= parseFloat(filtros.precioMin) : true;
    const coincidePrecioMax = filtros.precioMax ? p.precio <= parseFloat(filtros.precioMax) : true;

    return coincideNombre && coincideCategoria && coincideSubcategoria && coincidePrecioMin && coincidePrecioMax;
  });

  const onDropBanner = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tu_upload_preset');

    const res = await fetch('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    const nuevas = [...bannerImages, data.secure_url];
    setBannerImages(nuevas);
    localStorage.setItem('bannerImages', JSON.stringify(nuevas));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropBanner,
    accept: { 'image/*': [] }
  });


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Panel de administración
      </Typography>

      <Button variant="contained" startIcon={<Add />} onClick={handleOpenModal} sx={{
            color: '#FFFFFF',
            backgroundColor: '#1c2a68ff',
            borderColor: '#395ba3ff',
            '&:hover': {
              borderColor: '#d6c14aff',
            }
          }}>
        Agregar producto
      </Button>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
        <TextField
          label="Buscar por nombre"
          name="nombre"
          value={filtros.nombre}
          onChange={handleFiltroChange}
          sx={{ backgroundColor: 'rgba(255,255,255,0.1)', input: { color: 'black' }, label: { color: 'gray' } }}
        />
        <TextField
          label="Categoría"
          name="categoria"
          value={filtros.categoria}
          onChange={handleFiltroChange}
          sx={{ backgroundColor: 'rgba(255,255,255,0.1)', input: { color: 'black' }, label: { color: 'gray' } }}
        />
        <TextField
          label="Subcategoría"
          name="subcategoria"
          value={filtros.subcategoria}
          onChange={handleFiltroChange}
          sx={{ backgroundColor: 'rgba(255,255,255,0.1)', input: { color: 'black' }, label: { color: 'gray' } }}
        />
        <TextField
          label="Precio mínimo"
          name="precioMin"
          type="number"
          value={filtros.precioMin}
          onChange={handleFiltroChange}
          sx={{ backgroundColor: 'rgba(255,255,255,0.1)', input: { color: 'black' }, label: { color: 'gray' } }}
        />
        <TextField
          label="Precio máximo"
          name="precioMax"
          type="number"
          value={filtros.precioMax}
          onChange={handleFiltroChange}
          sx={{ backgroundColor: 'rgba(255,255,255,0.1)', input: { color: 'black' }, label: { color: 'gray' } }}
        />
        <Button
          variant="outlined"
          onClick={() => setFiltros({
            nombre: '',
            categoria: '',
            subcategoria: '',
            precioMin: '',
            precioMax: ''
          })}
          sx={{
            color: '#FFFFFF',
            backgroundColor: '#1c2a68ff',
            borderColor: '#395ba3ff',
            '&:hover': {
              borderColor: '#d6c14aff',
            }
          }}
        >
          Limpiar filtros
        </Button>
      </Box>
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productosFiltrados.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.nombre}</TableCell>
              <TableCell>${p.precio}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>{p.categoria}</TableCell>
              <TableCell>
                <Tooltip title="Editar">
                  <IconButton color="primary" onClick={() => handleEditar(p)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton color="error" onClick={() => handleEliminar(p.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de carga */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            maxWidth: 500,
            maxHeight: '90vh',
            overflowY: 'auto',
            margin: 'auto',
            mt: '5vh',
            bgcolor: '#101d20',
            borderRadius: 2,
            p: 4,
            color: 'white',
            boxShadow: 24
          }}
        >
          <FormularioProducto
            form={form}
            setForm={setForm}
            onSubmit={handleGuardarProducto}
            modoEdicion={modoEdicion}
          />
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMensaje}
        </Alert>
      </Snackbar>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Imágenes del banner</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Subir imagen
            <input type="file" hidden onChange={handleUploadBanner} />
          </Button>
        </Box>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #1c2a68ff',
            borderRadius: 4,
            padding: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'white',
            cursor: 'pointer',
            mb: 3,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          <input {...getInputProps()} />
          <UploadFileIcon sx={{ fontSize: 40, color: '#1c2a68ff', mb: 1 }} />
          <Typography>
            {isDragActive
              ? 'Soltá la imagen para subirla'
              : 'Arrastrá una imagen o hacé clic para subir'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {bannerImages.map((url, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              <img src={url} alt={`banner-${index}`} style={{ width: 200, borderRadius: 8 }} />
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => {
                  const actualizadas = bannerImages.filter((_, i) => i !== index);
                  setBannerImages(actualizadas);
                  localStorage.setItem('bannerImages', JSON.stringify(actualizadas));
                }}
              >
                Quitar
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
