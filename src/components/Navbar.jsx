import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Button, 
  Box,
  Menu, 
  MenuItem, 
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/useCart';
import logoNav from '../../public/images/logo/white_on_black.png';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import ContactMailIcon from '@mui/icons-material/MailOutline';
import MateIcon from './MateIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';


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

export default function Navbar({ cartCount = 0, onCartClick, onContactoClick }) {
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [passwords, setPasswords] = useState({ actual: '', nueva: '' });
  const [errorPass, setErrorPass] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  let esAdmin=false;
  if(usuario){
    esAdmin  = usuario.email === 'admin';
  }

  const isMobile = useMediaQuery('(max-width:600px)');

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
          <img src={logoNav} alt="Logo Pachamates" style={{ height: 100, marginRight: -40, borderRadius: 100 }} />
        </Box>
        
        {/* Navegación */}
        {isMobile ? (
        <>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
            <Box sx={{ width: 250, backgroundColor: '#101d20', height: '100%', color: 'white' }}>
              <List>
                <ListItem button component={Link} to="/" onClick={handleDrawerToggle} sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}}>
                  <ListItemIcon><HomeIcon sx={{ color: 'white' }} /></ListItemIcon>
                  <ListItemText primary="Home" sx={{ color: 'white' }} />
                </ListItem>

                <ListItem button component={Link} to="/tienda" onClick={handleDrawerToggle} sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}}>
                  <ListItemIcon><MateIcon sx={{ color: 'white' }} /></ListItemIcon>
                  <ListItemText primary="Productos" sx={{ color: 'white' }}
                   />
                </ListItem>

                <ListItem
                  button
                  onClick={() => {
                    handleContactoClick();
                    handleDrawerToggle();
                  }}
                  sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  cursor: 'pointer'
                }}

                >
                  <ListItemIcon><ContactMailIcon sx={{ color: 'white' }} /></ListItemIcon>
                  <ListItemText primary="Contacto" sx={{ color: 'white' }} />
                </ListItem>

        {usuario ? (
          <>
            <ListItem button onClick={() => { navigate('/panel'); handleDrawerToggle(); }} sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}}>
              <ListItemIcon><AccountCircleIcon sx={{ color: 'white' }} /></ListItemIcon>
              <ListItemText primary={esAdmin ? 'Panel de administración' : 'Panel de usuario'} sx={{ color: 'white', cursor: 'pointer' }} />
            </ListItem>
            <ListItem button onClick={() => { handleOpenModal(); handleDrawerToggle(); }} sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}}>
                  <ListItemIcon>
                    <LockIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
              <ListItemText primary="Cambiar contraseña" sx={{ color: 'white', cursor: 'pointer' }} />
            </ListItem>
            <ListItem button onClick={() => { handleLogout(); handleDrawerToggle(); }} sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}}>
                  <ListItemIcon>
              <LogoutIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" sx={{ color: 'white', cursor: 'pointer' }} />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/login" onClick={handleDrawerToggle} sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}}>
            <ListItemIcon><LoginIcon sx={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Ingresar" sx={{ color: 'white' }} />
          </ListItem>
        )}
      </List>
            </Box>
          </Drawer>
        </>
      ) : (
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
                        border: '1px solid rgba(255,255,255,0.2)',
                      }
                    }}
                  >
                    <MenuItem disabled>
                      {usuario.email}
                    </MenuItem>
                    {esAdmin && (
                      <MenuItem onClick={() => navigate('/panel')} sx={{cursor: 'pointer'}}>
                        Panel de administración
                      </MenuItem>
                    )}
                    {esAdmin || (
                      <MenuItem onClick={() => navigate('/panel')} sx={{cursor: 'pointer'}}>
                        Panel de usuario
                      </MenuItem>
                    )

                    }
                    <MenuItem onClick={handleOpenModal}>Cambiar contraseña</MenuItem>                   <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                  </Menu>
                  <Dialog open={openModal} onClose={handleCloseModal}>
                  <DialogTitle sx={{ backgroundColor: '#101d20', color: 'white', cursor: 'pointer' }}>
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
      </Box>
      )}
      {/* Ícono del carrito */}
        <IconButton color="inherit" onClick={onCartClick}>
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
