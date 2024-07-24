import React from 'react';
import QRCode from 'react-qr-code';
import { useLocation } from 'react-router-dom';
import './QRCodeGenerator.css';

const QRCodeGenerator = () => {
  const location = useLocation();
  const colis = location.state;

  if (!colis) {
    return <p>No data available</p>;
  }

  // Format the colis data to be more readable
  const qrValue = JSON.stringify(colis, null, 2);

  const downloadQRCode = () => {
    const svg = document.querySelector('.qr-code svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'QRCode.png';
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="qr-code-generator-container">
      <div className="qr-code-generator">
        <h1>QR Code Generator</h1>
        <div className="qr-code">
          <QRCode value={qrValue} />
        </div>
        <button onClick={downloadQRCode} className="download-btn">Download QR Code</button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
