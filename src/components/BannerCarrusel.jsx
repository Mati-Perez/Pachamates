// src/components/BannerCarrusel.jsx
import { Box, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const imagenes = [
  '/images/banner/banner1.jpg',
  '/images/banner/banner2.jpg',
  '/images/banner/banner3.jpg'
];

export default function BannerCarrusel() {
  const [index, setIndex] = useState(0);
  const intervaloRef = useRef(null);

  const iniciarCarrusel = () => {
    intervaloRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % imagenes.length);
    }, 5000);
  };

  const detenerCarrusel = () => {
    clearInterval(intervaloRef.current);
  };

  useEffect(() => {
    iniciarCarrusel();
    return detenerCarrusel;
  }, []);

  const irAtras = () => {
    setIndex(prev => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const irAdelante = () => {
    setIndex(prev => (prev + 1) % imagenes.length);
  };

  const irAIndice = (i) => {
    setIndex(i);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 150, sm: 220, md: 400 },
        overflow: 'hidden',
        position: 'relative',
        maxWidth: '100vw'
      }}
      onMouseEnter={detenerCarrusel}
      onMouseLeave={iniciarCarrusel}
    >
      {/* Carrusel */}
      <Box
        sx={{
          display: 'flex',
          width: `${imagenes.length * 100}%`,
          transform: `translateX(-${index * (100 / imagenes.length)}%)`,
          transition: 'transform 0.8s ease-in-out'
        }}
      >
        {imagenes.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            alt={`Banner ${i + 1}`}
            sx={{
              width: `${100 / imagenes.length}%`,
              height: '100%',
              minHeight: { xs: 150, sm: 220, md: 400 },
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block'
            }}
          />
        ))}
      </Box>

      {/* Flechas */}
      <IconButton
        onClick={irAtras}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 16,
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.4)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' }
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        onClick={irAdelante}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 16,
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.4)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' }
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1
        }}
      >
        {imagenes.map((_, i) => (
          <Box
            key={i}
            onClick={() => irAIndice(i)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: i === index ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
