import { Box, Typography, Link, Stack, IconButton } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MateIcon from './MateIcon';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#101d20ff',
        padding: 3,
        marginTop: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
        color: 'white'
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Pachamates. Todos los derechos reservados.
      </Typography>

      <Stack direction="row" spacing={3} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        <Link href="#contacto" underline="none" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1,transition: 'color 0.3s ease',
            '&:hover': {
              color: '#FFD700'
            }
        }}>
          <ContactMailIcon sx={{ fontSize: 20 }} />
          Contacto
        </Link>

        <Link href="/tienda" underline="none" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1, transition: 'color 0.3s ease',
            '&:hover': {
              color: '#FFD700'
            }
        }}>
          <MateIcon sx={{ color: 'inherit', fontSize: 20 }} />
          Tienda
        </Link>

        <Link href="https://instagram.com" target="_blank" underline="none" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1, transition: 'color 0.3s ease',
              '&:hover': {
                color: '#FFD700'
              }
          }}>
          <InstagramIcon sx={{ fontSize: 20, transition: 'color 0.3s ease'}} />
          Instagram
        </Link>
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
       
        <Link href="https://facebook.com" target="_blank" underline="none" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1,transition: 'color 0.3s ease',
              '&:hover': {
                color: '#FFD700'
              }
          }}>
          <FacebookIcon sx={{ fontSize: 20,  }} />
          Facebook
        </Link>
        
      </Stack>
    </Box>
  );
}
