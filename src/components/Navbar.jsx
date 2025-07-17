import { AppBar, Toolbar, Typography, IconButton, Badge, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import logoNav from '../../public/images/logo/white_on_black.png';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import ContactMailIcon from '@mui/icons-material/MailOutline';
import MateIcon from './MateIcon';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

const navButtonStyle = {
  color: 'white',
  textTransform: 'none',
  fontWeight: 'bold',
  position: 'relative',
  '&:hover': {
    color: '#FFD700', // dorado
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -2,
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#FFD700',
      transition: 'width 0.3s ease'
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: 0,
    height: '2px',
    backgroundColor: '#FFD700',
    transition: 'width 0.3s ease'
  }
};

const activeStyle = {
  color: '#FFD700',
  '&::after': {
    width: '100%'
  }
};

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

export default function Navbar({  onCartClick, onContactoClick }) {
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [passwords, setPasswords] = useState({ actual: '', nueva: '' });
  const [errorPass, setErrorPass] = useState('');

  let esAdmin=false;
  if(usuario){
    esAdmin  = usuario.email === 'admin';
  }

  const handleOpenModal = () => {
    setOpenModal(true);
    handleMenuClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPasswords({ actual: '', nueva: '' });
    setErrorPass('');
  };

  const handleChangePass = () => {
    if (!passwords.actual || !passwords.nueva) {
      setErrorPass('Completá ambos campos');
      return;
    }

    // Simulación de cambio
    alert('Contraseña actualizada correctamente');
    handleCloseModal();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleContactoClick = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'contacto' } });
    } else {
      onContactoClick(); // ya estás en /
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    handleMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary" sx={{ backgroundColor: '#101d20ff' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logoNav} alt="Logo Pachamates" style={{ height: 100, marginRight: 8, borderRadius: 100 }} />
        </Box>
        
        {/* Navegación */}
        <Box sx={{ display: 'flex', gap: 2 }}>
         <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{ ...navButtonStyle, ...(location.pathname === '/' && activeStyle) }}
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/tienda"
            startIcon={<MateIcon sx={{ color: 'inherit' }} />}
            sx={{ ...navButtonStyle, ...(location.pathname === '/tienda' && activeStyle) }}
          >
            Productos
          </Button>


          <Button
            color="inherit"
            onClick={handleContactoClick}
            startIcon={<ContactMailIcon />}
            sx={{ ...navButtonStyle, ...(location.pathname === '/contacto' && activeStyle) }}
          >
            Contacto
          </Button>

          {usuario ? (
            <>
              <Tooltip title="Cuenta">
                <IconButton onClick={handleMenuOpen} sx={{ color: 'white' }}>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    backgroundColor: '#101d20',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }
                }}
              >
                <MenuItem disabled>
                  {usuario.email}
                </MenuItem>
                {esAdmin && (
                  <MenuItem onClick={() => navigate('/panel')}>
                    Panel de administración
                  </MenuItem>
                )}
                {esAdmin || (
                  <MenuItem onClick={() => navigate('/panel')}>
                    Panel de usuario
                  </MenuItem>
                )

                }
                <MenuItem onClick={handleOpenModal}>Cambiar contraseña</MenuItem>                   <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
              <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogTitle sx={{ backgroundColor: '#101d20', color: 'white' }}>
                Cambiar contraseña
              </DialogTitle>
              <DialogContent sx={{ backgroundColor: '#101d20' }}>
                <TextField
                  label="Contraseña actual"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={passwords.actual}
                  onChange={(e) => setPasswords({ ...passwords, actual: e.target.value })}
                  sx={inputStyle}
                />
                <TextField
                  label="Nueva contraseña"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={passwords.nueva}
                  onChange={(e) => setPasswords({ ...passwords, nueva: e.target.value })}
                  sx={inputStyle}
                />
                {errorPass && (
                  <Typography sx={{ color: '#FFD700', mt: 1 }}>{errorPass}</Typography>
                )}
              </DialogContent>
              <DialogActions sx={{ backgroundColor: '#101d20' }}>
                <Button onClick={handleCloseModal} color="inherit">Cancelar</Button>
                <Button onClick={handleChangePass} variant="contained" color="primary">
                  Confirmar
                </Button>
              </DialogActions>
            </Dialog>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              startIcon={<LoginIcon />}
              sx={{ ...navButtonStyle, ...(location.pathname === '/login' && activeStyle) }}
            >
              Ingresar
            </Button>
          )}

          {/* Ícono del carrito */}
          <IconButton color="inherit" onClick={onCartClick}>
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>
  );
}
