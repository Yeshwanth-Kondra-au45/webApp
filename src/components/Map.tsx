import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';

interface VisibleRegion {
  north: number;
  south: number;
  east: number;
  west: number;
}

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const Map = (props: { onMapLoad: (map: google.maps.Map) => void; }) => {
  const apiKey = 'AIzaSyCFpXomxkfaQV9EQlJeRtWSpiHAkZE5J6Q' ?? '';
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [visibleRegion, setVisibleRegion] = useState<VisibleRegion | null>(null);

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
    props.onMapLoad(map); 
  };

  useEffect(() => {
    if (map) {
      const bounds = map.getBounds();
      if (bounds) {
        setVisibleRegion({
          north: bounds.getNorthEast().lat(),
          south: bounds.getSouthWest().lat(),
          east: bounds.getNorthEast().lng(),
          west: bounds.getSouthWest().lng(),
        });
      }
    }
  }, [map]);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8} onLoad={onLoad} />
  ) : (
    <div>Error loading map</div>
  );
};

export default Map;
