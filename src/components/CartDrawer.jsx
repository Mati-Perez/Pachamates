import React from 'react';
import { useCart } from '../context/useCart';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';

export default function CartDrawer({ open, onClose }) {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    const usuario = localStorage.getItem('usuario');

    onClose(); // cerramos el drawer

    if (!usuario) {
      localStorage.setItem('redirigirCheckout', 'true');
      navigate('/login');
    } else {
      navigate('/envio');
    }
  };

  const usuario = localStorage.getItem('usuario');

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">🛒 Carrito</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {cartItems.length === 0 ? (
          <Typography sx={{ mt: 2 }}>Tu carrito está vacío.</Typography>
        ) : (
          <>
            <List sx={{ mt: 2 }}>
              {cartItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem disablePadding>
                    <ListItemText
                      primary={item.nombre}
                      secondary={`$${item.precio.toLocaleString('es-AR')} x ${item.cantidad}`}
                      sx={{ paddingLeft: 1 }}
                    />
                    <Stack direction="row" spacing={1}>
                      <Button size="small" onClick={() => decreaseQuantity(item.id)}>-</Button>
                      <Typography>{item.cantidad}</Typography>
                      <Button size="small" onClick={() => increaseQuantity(item.id)}>+</Button>
                      <Button color="error" size="small" onClick={() => removeFromCart(item.id)}>
                        Eliminar
                      </Button>
                    </Stack>
                  </ListItem>

                  {/* Divider entre ítems */}
                  {index < cartItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            
            <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
              Total: ${totalPrice.toLocaleString('es-AR')}
            </Typography>

            {usuario ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Finalizar compra
              </Button>
            ) : (
              <Tooltip title="Iniciá sesión para finalizar tu compra 🧉" placement="top">
                <span>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Finalizar compra
                  </Button>
                </span>
              </Tooltip>
            )}
          </>
        )}
      </Box>
    </Drawer>
  );
}
