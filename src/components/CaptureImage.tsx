import React, { useState } from 'react';
import { google } from 'google-maps';

type CaptureImageProps = {
  map: google.maps.Map | null;
  onCapture: (data: string) => void;
};

const CaptureImage = ({ map, onCapture }: CaptureImageProps) => {
  const [imageData, setImageData] = useState<string>('');

  const captureImage = () => {
    if (map) {
      const mapDiv = map.getDiv();
      if (mapDiv instanceof HTMLCanvasElement) {
        const dataURL = mapDiv.toDataURL();
        setImageData(dataURL);
        onCapture(dataURL);
      } else if (mapDiv instanceof HTMLDivElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = mapDiv.clientWidth;
        canvas.height = mapDiv.clientHeight;
        const mapTiles = mapDiv.querySelectorAll<HTMLImageElement>('img[src*="googleapis.com"]');
        let loadedCount = 0;
        mapTiles.forEach((tile: HTMLImageElement) => {
          if (tile.complete) {
            loadedCount++;
            if (loadedCount === mapTiles.length) {
              mapTiles.forEach((tile: HTMLImageElement) => {
                ctx?.drawImage(tile, tile.offsetLeft, tile.offsetTop);
              });
              const dataURL = canvas.toDataURL();
              setImageData(dataURL);
              onCapture(dataURL);
            }
          } else {
            tile.addEventListener('load', () => {
              loadedCount++;
              if (loadedCount === mapTiles.length) {
                mapTiles.forEach((tile: HTMLImageElement) => {
                  ctx?.drawImage(tile, tile.offsetLeft, tile.offsetTop);
                });
                const dataURL = canvas.toDataURL();
                setImageData(dataURL);
                onCapture(dataURL);
              }
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <button onClick={captureImage}>Capture Image</button>
      {imageData && (
        <img src={imageData} alt="Captured Image" width="300" height="200" />
      )}
    </div>
  );
};

export default CaptureImage;
