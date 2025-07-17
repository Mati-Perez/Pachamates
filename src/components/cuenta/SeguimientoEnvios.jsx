import { Box, Typography, Stepper, Step, StepLabel } from '@mui/material';

const estados = ['En preparación', 'Despachado', 'En tránsito', 'Entregado'];

export default function SeguimientoEnvios() {
  const estadoActual = 2; // ejemplo: "En tránsito"

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Seguimiento de tu pedido
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Número de seguimiento: <strong>123456789AR</strong>
      </Typography>

      <Stepper activeStep={estadoActual} alternativeLabel>
        {estados.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
