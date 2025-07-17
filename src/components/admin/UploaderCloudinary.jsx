import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

export default function UploaderCloudinary({ onUpload }) {
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tu_upload_preset'); // ⚠️ reemplazar
    const res = await fetch('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    setPreview(data.secure_url);
    onUpload(data.secure_url);
    setLoading(false);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="outlined" component="label">
        Subir imagen
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {loading && <Typography sx={{ mt: 1 }}>Subiendo imagen...</Typography>}
      {preview && (
        <Box sx={{ mt: 2 }}>
          <Typography>Preview:</Typography>
          <img src={preview} alt="preview" style={{ width: '100%', borderRadius: 8 }} />
        </Box>
      )}
    </Box>
  );
}
