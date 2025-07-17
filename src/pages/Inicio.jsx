// src/pages/Inicio.jsx
import { Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OfertasDestacadas from '../components/OfertasDestacadas'
import BannerCarrusel from '../components/BannerCarrusel';
import ContactoSection from '../components/Contacto';

export default function Inicio({ contactoRef }) {
  const location = useLocation();

  /*const bannerImages = JSON.parse(localStorage.getItem('bannerImages')) || [];

<Box sx={{ display: 'flex', overflowX: 'auto', gap: 2 }}>
  {bannerImages.map((url, index) => (
    <img key={index} src={url} alt={`banner-${index}`} style={{ height: 300, borderRadius: 8 }} />
  ))}
</Box> */

  useEffect(() => {
    if (location.state?.scrollTo === 'contacto') {
      contactoRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);


  return (
      <div>
        <BannerCarrusel />

        <Box sx={{ padding: 4, textAlign: 'center', backgroundColor: '#724817' }}>
          <Typography variant="h3" gutterBottom sx={{color: '#E2C7A1'}}>
            Bienvenido a Pachamates 🧉
          </Typography>
          <Typography variant="body1" sx={{color: '#E2C7A1'}}>
            Mates artesanales, sets únicos y accesorios con identidad argentina. 
            Descubrí nuestra tienda y sentí la conexión con la tierra.
          </Typography>
        

        </Box>
        <OfertasDestacadas />
        <div ref={contactoRef} id="contacto">
          <ContactoSection />

        </div>
    </div>
  );
}
