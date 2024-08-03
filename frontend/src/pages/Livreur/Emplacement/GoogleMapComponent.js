import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './GoogleMapComponent.css'; // Import the CSS file

const center = [36.8065, 10.1815]; // Latitude and Longitude of Tunisia
const position = [48.8566, 2.3522];

const GoogleMapComponent = () => {
  return (
    <MapContainer center={center} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Paris<br />The capital city of France.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default GoogleMapComponent;