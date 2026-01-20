import React from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// Initialize leaflet.heat
import 'leaflet.heat';

function HeatmapLayer() {
  const map = useMap();
  
  React.useEffect(() => {
    // Generate random heatmap points around Kibera
    const generateHeatmapPoints = () => {
      const points = [];
      const centerLat = -1.317;
      const centerLng = 36.791;
      
      for (let i = 0; i < 50; i++) {
        const lat = centerLat + (Math.random() - 0.5) * 0.01;
        const lng = centerLng + (Math.random() - 0.5) * 0.01;
        const intensity = Math.random();
        points.push([lat, lng, intensity * 100]);
      }
      
      return points;
    };

    const heatmapData = generateHeatmapPoints();
    
    // Check if L.heatLayer exists (from leaflet.heat)
    if (typeof L.heatLayer === 'function') {
      const heat = L.heatLayer(heatmapData, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        gradient: {
          0.0: 'rgba(0, 0, 255, 0)',
          0.2: 'rgba(0, 0, 255, 1)',
          0.4: 'rgba(0, 255, 255, 1)',
          0.6: 'rgba(0, 255, 0, 1)',
          0.8: 'rgba(255, 255, 0, 1)',
          1.0: 'rgba(255, 0, 0, 1)'
        }
      }).addTo(map);

      return () => {
        map.removeLayer(heat);
      };
    } else {
      console.warn('leaflet.heat is not available. Heatmap will not be displayed.');
    }
    
    return () => {};
  }, [map]);

  return null;
}

export default HeatmapLayer;