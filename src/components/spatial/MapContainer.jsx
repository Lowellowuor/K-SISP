import React, { useRef, useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, ZoomControl, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Import layers
import FacilitiesLayer from './layers/FacilitiesLayer';
import HouseholdsLayer from './layers/HouseholdsLayer';
import ReportsLayer from './layers/ReportsLayer';
import WaterNetworkLayer from './layers/WaterNetworkLayer';
import CoverageLayer from './layers/CoverageLayer';
import HeatmapLayer from './layers/HeatmapLayer';
import MapControls from './controls/MapControls';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const KIBERA_BOUNDS = [-1.322, 36.785, -1.312, 36.795];
const INITIAL_CENTER = [-1.317, 36.791];
const INITIAL_ZOOM = 15;

function MapContainerComponent({ layers }) {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  const baseMaps = {
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  };

  const handleMapLoad = (map) => {
    setMapInstance(map);
    // Fit to Kibera bounds
    map.fitBounds([
      [KIBERA_BOUNDS[0], KIBERA_BOUNDS[1]],
      [KIBERA_BOUNDS[2], KIBERA_BOUNDS[3]]
    ]);
  };

  return (
    <LeafletMap
      center={INITIAL_CENTER}
      zoom={INITIAL_ZOOM}
      ref={mapRef}
      className="h-full w-full"
      zoomControl={false}
      whenCreated={handleMapLoad}
      maxBounds={[
        [-1.33, 36.77],
        [-1.30, 36.81]
      ]}
      maxZoom={19}
      minZoom={13}
    >
      {/* Base Map Layer */}
      <TileLayer
        url={baseMaps[layers.baseMap]}
        attribution={layers.baseMap === 'satellite' 
          ? 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      />

      {/* Data Layers */}
      {layers.facilities && <FacilitiesLayer />}
      {layers.households && <HouseholdsLayer />}
      {layers.reports && <ReportsLayer />}
      {layers.waterNetwork && <WaterNetworkLayer />}
      {layers.coverage && <CoverageLayer />}
      {layers.heatmap && <HeatmapLayer />}

      {/* Controls */}
      <ZoomControl position="bottomright" />
      <ScaleControl position="bottomleft" imperial={false} />
      
      {mapInstance && <MapControls map={mapInstance} />}
    </LeafletMap>
  );
}

export default MapContainerComponent;