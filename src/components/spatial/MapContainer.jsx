import React, { useRef, useState, useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, ZoomControl, ScaleControl, LayersControl } from 'react-leaflet';
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
import AnalysisPanel from './analysis/AnalysisPanel';
import MapControls from './controls/MapControls';

// Import custom green icons
import { createGreenMarkerIcon, createClusterIcon, createCustomDivIcon } from './icons/CustomIcons';

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

function MapContainerComponent({ layers, activeTool }) {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(INITIAL_CENTER);
  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM);
  const [isNightMode, setIsNightMode] = useState(false);

  // Custom green-themed base maps
  const baseMaps = {
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      className: 'satellite-layer'
    },
    street: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      className: 'street-layer'
    },
    terrain: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      className: 'terrain-layer'
    },
    green: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      className: 'green-layer'
    }
  };

  // Night mode overlay
  const nightModeOverlay = {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    className: 'night-mode-layer'
  };

  const handleMapLoad = (map) => {
    setMapInstance(map);
    
    // Fit to Kibera bounds with padding
    map.fitBounds([
      [KIBERA_BOUNDS[0], KIBERA_BOUNDS[1]],
      [KIBERA_BOUNDS[2], KIBERA_BOUNDS[3]]
    ], {
      padding: [50, 50]
    });

    // Add event listeners
    map.on('zoomend', () => {
      setZoomLevel(map.getZoom());
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      setCurrentLocation([center.lat, center.lng]);
    });
  };

  // Apply green theme filter to map tiles
  useEffect(() => {
    if (mapInstance) {
      const tiles = document.querySelectorAll('.leaflet-tile-pane img');
      tiles.forEach(tile => {
        if (isNightMode) {
          tile.style.filter = 'brightness(0.7) saturate(0.8) hue-rotate(180deg)';
        } else {
          tile.style.filter = 'hue-rotate(90deg) saturate(0.9) brightness(1.1)';
        }
      });
    }
  }, [mapInstance, layers.baseMap, isNightMode]);

  // Handle active tool changes
  useEffect(() => {
    if (!mapInstance || !activeTool) return;

    const handleClick = (e) => {
      switch (activeTool) {
        case 'measure':
          console.log('Measurement started at:', e.latlng);
          break;
        case 'search':
          console.log('Search location:', e.latlng);
          break;
        case 'buffer':
          console.log('Buffer analysis at:', e.latlng);
          break;
        default:
          break;
      }
    };

    mapInstance.on('click', handleClick);
    return () => {
      mapInstance.off('click', handleClick);
    };
  }, [mapInstance, activeTool]);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div className="relative h-full w-full">
      <LeafletMap
        center={INITIAL_CENTER}
        zoom={INITIAL_ZOOM}
        ref={mapRef}
        className="h-full w-full leaflet-container-green"
        zoomControl={false}
        whenCreated={handleMapLoad}
        maxBounds={[
          [-1.33, 36.77],
          [-1.30, 36.81]
        ]}
        maxZoom={19}
        minZoom={12}
        worldCopyJump={false}
        attributionControl={false}
      >
        {/* Base Map Layer */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Satellite" className="custom-layer-control">
            <TileLayer
              url={baseMaps.satellite.url}
              attribution={baseMaps.satellite.attribution}
              className={baseMaps.satellite.className}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Street Map" className="custom-layer-control">
            <TileLayer
              url={baseMaps.street.url}
              attribution={baseMaps.street.attribution}
              className={baseMaps.street.className}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Terrain" className="custom-layer-control">
            <TileLayer
              url={baseMaps.terrain.url}
              attribution={baseMaps.terrain.attribution}
              className={baseMaps.terrain.className}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Green Theme" className="custom-layer-control">
            <TileLayer
              url={baseMaps.green.url}
              attribution={baseMaps.green.attribution}
              className={baseMaps.green.className}
            />
          </LayersControl.BaseLayer>

          {/* Night Mode Overlay */}
          <LayersControl.Overlay checked={isNightMode} name="Night Mode">
            {isNightMode && (
              <TileLayer
                url={nightModeOverlay.url}
                attribution={nightModeOverlay.attribution}
                className={nightModeOverlay.className}
                opacity={0.7}
              />
            )}
          </LayersControl.Overlay>
        </LayersControl>

        {/* Data Layers with enhanced styling */}
        <LayersControl position="topright">
          {layers.facilities && (
            <LayersControl.Overlay checked name="Sanitation Facilities">
              <FacilitiesLayer />
            </LayersControl.Overlay>
          )}
          
          {layers.households && (
            <LayersControl.Overlay checked name="Households">
              <HouseholdsLayer />
            </LayersControl.Overlay>
          )}
          
          {layers.reports && (
            <LayersControl.Overlay checked name="Citizen Reports">
              <ReportsLayer />
            </LayersControl.Overlay>
          )}
          
          {layers.waterNetwork && (
            <LayersControl.Overlay checked name="Water Network">
              <WaterNetworkLayer />
            </LayersControl.Overlay>
          )}
          
          {layers.coverage && (
            <LayersControl.Overlay checked name="Service Coverage">
              <CoverageLayer />
            </LayersControl.Overlay>
          )}
          
          {layers.heatmap && (
            <LayersControl.Overlay checked name="Issue Heatmap">
              <HeatmapLayer />
            </LayersControl.Overlay>
          )}

          {/* Analysis Layer for active tools */}
          {activeTool && (
            <LayersControl.Overlay checked name={`${activeTool.charAt(0).toUpperCase() + activeTool.slice(1)} Analysis`}>
              <AnalysisLayer tool={activeTool} />
            </LayersControl.Overlay>
          )}
        </LayersControl>

        {/* Custom Controls */}
        <ZoomControl 
          position="bottomright" 
          className="custom-zoom-control"
        />
        
        <ScaleControl 
          position="bottomleft" 
          imperial={false} 
          className="custom-scale-control"
        />
        
        {mapInstance && (
          <MapControls 
            map={mapInstance} 
            onToggleNightMode={toggleNightMode}
            isNightMode={isNightMode}
            currentLocation={currentLocation}
            zoomLevel={zoomLevel}
            activeTool={activeTool}
          />
        )}

        {/* Map Attribution (Custom Styled) */}
        <div className="leaflet-control-attribution leaflet-control text-xs">
          {layers.baseMap === 'satellite' 
            ? baseMaps.satellite.attribution
            : '© OpenStreetMap contributors'
          }
        </div>

        {/* Loading Indicator */}
        <div className="leaflet-top leaflet-right absolute top-2 right-2">
          <div className="leaflet-control bg-emerald-900/90 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-emerald-500/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-300">Loading map data...</span>
            </div>
          </div>
        </div>

        {/* Coordinates Display */}
        <div className="leaflet-bottom leaflet-left absolute bottom-2 left-2">
          <div className="leaflet-control bg-emerald-900/90 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-emerald-500/30">
            <div className="text-xs font-mono text-emerald-300">
              Lat: {currentLocation[0].toFixed(4)}° | Lng: {currentLocation[1].toFixed(4)}° | Zoom: {zoomLevel}x
            </div>
          </div>
        </div>

        {/* Active Tool Indicator */}
        {activeTool && (
          <div className="leaflet-top leaflet-left absolute top-2 left-2">
            <div className="leaflet-control bg-gradient-to-r from-emerald-500/90 to-green-500/90 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-emerald-500/30 animate-pulse-green">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-xs font-medium text-white">
                  Active: {activeTool.charAt(0).toUpperCase() + activeTool.slice(1)} Tool
                </span>
              </div>
            </div>
          </div>
        )}
      </LeafletMap>

      {/* Map Legend (Custom Component) */}
      <div className="absolute bottom-10 right-2 z-[1000]">
        <div className="glass-effect-green rounded-xl p-3 border border-emerald-500/20 shadow-lg">
          <h4 className="text-xs font-semibold text-white mb-2">Map Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-gray-300">Facilities</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
              <span className="text-xs text-gray-300">Households</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-xs text-gray-300">Reports</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-xs text-gray-300">Water Network</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapContainerComponent;