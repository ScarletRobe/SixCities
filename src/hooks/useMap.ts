import { useState, useRef, useEffect, MutableRefObject } from 'react';

import leaflet, { Map } from 'leaflet';

import { Location } from '../types/offer';
import { TileLayerConfig } from '../consts';
import L from 'leaflet';

const DEFAULT_ZOOM = 13;

function useMap(
  mapRef: MutableRefObject<HTMLEmbedElement | null>,
  location: Location,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (map) {
      map.setView(new L.LatLng(location.latitude, location.longitude), DEFAULT_ZOOM);
    }
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet
        .tileLayer(
          TileLayerConfig.URL,
          {
            attribution: TileLayerConfig.Attribution,
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location, map]);

  return map;
}

export default useMap;
