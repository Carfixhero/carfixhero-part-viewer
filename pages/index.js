// Step 1: Basic Image Viewer (without Tesseract)
// This file goes into: pages/index.js

import { useRef, useState } from 'react';

export default function Home() {
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📷 Upload Image</h1>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginBottom: '1rem' }}
      />

      <div style={{ position: 'relative', marginTop: '20px' }}>
        {imgSrc && (
          <img src={imgSrc} alt="Diagram" style={{ maxWidth: '100%' }} />
        )}
      </div>
    </div>
  );
}
