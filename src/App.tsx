import { useState } from 'react'
import Map from "./components/Map";
import CaptureImage from "./components/CaptureImage";
import Cuboid from "./components/Cuboid";
import './App.css'

function App() {
  const [imageData, setImageData] = useState<string | null>(null);
   const [map, setMap] = useState<google.maps.Map | null>(null);

  return (
    <div>
       <Map
        onMapLoad={(map) => {
          setMap(map);
        }}
      />
      <CaptureImage
        map={map}
        onCapture={(data) => {
          setImageData(data);
        }}
      />
      {imageData && <Cuboid imageData={imageData} />}
    </div>
  );
}

export default App;
