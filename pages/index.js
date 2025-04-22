// Step 1: Basic Image Viewer (clickable coordinates + red dots)
// This file goes into: pages/index.js

import { useRef, useState } from 'react';

export default function Home() {
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [clicks, setClicks] = useState([]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setClicks(prev => [...prev, { x, y }]);
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
            onClick={handleClick}
          />
        )}

        {clicks.map((pt, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: pt.y + 'px',
              left: pt.x + 'px',
              width: '10px',
              height: '10px',
              background: 'red',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
