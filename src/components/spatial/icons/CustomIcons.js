// icons/CustomIcons.js
import L from 'leaflet';

export const createGreenMarkerIcon = (type = 'default') => {
  const colors = {
    default: '#10b981',
    facility: '#059669',
    report: '#d97706',
    water: '#0891b2',
    household: '#7c3aed',
    alert: '#dc2626'
  };

  const svgTemplate = (color) => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      <circle cx="12" cy="9" r="1.5" fill="white" opacity="0.8"/>
    </svg>
  `;

  return L.divIcon({
    html: svgTemplate(colors[type] || colors.default),
    className: 'custom-green-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

export const createClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  let size = 'small';
  let color = '#10b981';
  
  if (count > 50) {
    size = 'large';
    color = '#059669';
  } else if (count > 20) {
    size = 'medium';
    color = '#34d399';
  }

  const sizes = {
    small: 40,
    medium: 50,
    large: 60
  };

  const svgTemplate = (size, color, count) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="${color}" opacity="0.9" stroke="white" stroke-width="3"/>
      <text x="50" y="55" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="30" font-weight="bold">
        ${count}
      </text>
    </svg>
  `;

  return L.divIcon({
    html: svgTemplate(sizes[size], color, count),
    className: 'custom-cluster-marker',
    iconSize: [sizes[size], sizes[size]],
    iconAnchor: [sizes[size] / 2, sizes[size] / 2]
  });
};

export const createCustomDivIcon = (options = {}) => {
  const {
    className = '',
    html = '',
    iconSize = [30, 30],
    iconAnchor = [15, 30],
    popupAnchor = [0, -30]
  } = options;

  return L.divIcon({
    html,
    className: `custom-div-icon ${className}`,
    iconSize,
    iconAnchor,
    popupAnchor
  });
};