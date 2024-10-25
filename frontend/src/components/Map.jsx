import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import { tripState } from '../atoms/TripContext';
import { useRecoilValue } from 'recoil';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; // Use env variable for Mapbox token

const Map = ({src,des}) => {
  const mapContainer = useRef(null); // Container for map
  const map = useRef(null); // Reference to the map object
  const trip = useRecoilValue(tripState);
  
  const [source,setSource] = useState(trip.source); 
  const [destination,setDestination] =useState(trip.destination); // Bangalore coordinates

  useEffect(() => {
    if (map.current) return; // Prevent map from being initialized multiple times

    // Initialize Mapbox map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: source, // Starting position [lng, lat]
      zoom: 5, // Initial zoom level
    });

    // Add zoom and rotation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Fit map to bounds of source and destination
    map.current.fitBounds([source, destination], {
      padding: { top: 50, bottom: 50, left: 50, right: 50 }, // Add padding
      maxZoom: 14, // Maximum zoom level when fitting bounds
    });

    // Add source marker (Mumbai)
    new mapboxgl.Marker({ color: 'green' })
      .setLngLat(source)
      .addTo(map.current);

    // Add destination marker (Bangalore)
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat(destination)
      .addTo(map.current);

    // Fetch and draw the route between source and destination
    const getRoute = async () => {
      try {
        const response = await fetch(
         `https://api.mapbox.com/directions/v5/mapbox/driving/${source[0]},${source[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        const route = data.routes[0].geometry;

        // Add the route as a layer to the map
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route,
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3887be', // Route line color
            'line-width': 5, // Route line width
          },
        });
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    // Fetch and load the route once the map is fully loaded
    map.current.on('load', getRoute);
  }, []);

  return (
    <div className='relative overflow-hidden w-full h-[90vh]'>
      <div ref={mapContainer} className='h-full w-full' /> {/* Map container */}
    </div>
  );
};

export default Map;