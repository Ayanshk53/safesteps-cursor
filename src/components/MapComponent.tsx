import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string;
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  zoom = 15,
  height = '400px',
  className = ''
}) => {
  const { isDarkMode } = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Create a simple map using OpenStreetMap tiles
      const mapElement = mapRef.current;
      mapElement.innerHTML = `
        <div style="width: 100%; height: 100%; position: relative;">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}"
            width="100%"
            height="100%"
            style="border: none; border-radius: 8px;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div style="position: absolute; top: 10px; right: 10px; background: white; padding: 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <a href="https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=${zoom}" target="_blank" rel="noopener noreferrer" style="color: #000; text-decoration: none; font-size: 12px;">
              View Larger Map
            </a>
          </div>
        </div>
      `;
    }
  }, [latitude, longitude, zoom, isDarkMode]);

  return (
    <div
      ref={mapRef}
      className={`w-full ${className}`}
      style={{ height }}
    />
  );
};

export default MapComponent;
