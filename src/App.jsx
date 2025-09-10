import React, { useState } from 'react';
import { recognizeText } from './ocr';
import { translateText } from './translate';
import { sampleImages } from './sampleImages';

export default function App() {
  const [file, setFile] = useState(null);
  const [original, setOriginal] = useState('');
  const [translated, setTranslated] = useState([]);

  const handleUpload = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(URL.createObjectURL(f));
    const text = await recognizeText(f);
    setOriginal(text);
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const trans = await Promise.all(lines.map(l => translateText(l, 'en')));
    setTranslated(trans);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Menu Translate Web</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {file && <img src={file} alt="menu" style={{ maxWidth: '300px', marginTop: 10 }} />}
      <div style={{ marginTop: 20 }}>
        <h3>Results:</h3>
        <pre>{original}</pre>
        {translated.map((t, i) => (
          <div key={i} style={{ margin: '12px 0', border: '1px solid #ccc', padding: 8 }}>
            <p><b>{t}</b></p>
            {(sampleImages[t] || []).map((url, j) => (
              <img key={j} src={url} alt={t} style={{ width: 150, marginRight: 8 }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}