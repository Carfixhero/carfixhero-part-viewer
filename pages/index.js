// Step 1: Image Viewer with Automatic Number Detection via Tesseract.js
// This file goes into: pages/index.js

import { useRef, useState } from 'react';
import Tesseract from 'tesseract.js';

export default function Home() {
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [clicks, setClicks] = useState([]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result;
      setImgSrc(base64Image);

      const result = await Tesseract.recognize(base64Image, 'eng', {
        logger: m => console.log(m),
      });

      const digits = result.data.words.filter(w => /^\d+$/.test(w.text));
      const detected = digits.map(w => ({
        number: parseInt(w.text),
        x: w.bbox.x0,
        y: w.bbox.y0,
        width: w.bbox.x1 - w.bbox.x0,
        height: w.bbox.y1 - w.bbox.y0,
      }));

      setClicks(detected);
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
          <img
            src={imgSrc}
            alt="Diagram"
            style={{ maxWidth: '100%' }}
          />
        )}

        {clicks.map((pt, idx) => (
          <div
            key={idx}
            title={`#${pt.number ?? ''}`}
            style={{
              position: 'absolute',
              top: pt.y + 'px',
              left: pt.x + 'px',
              width: '24px',
              height: '24px',
              background: 'rgba(255,0,0,0.4)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {pt.number ?? ''}
          </div>
        ))}
      </div>
    </div>
  );
}
