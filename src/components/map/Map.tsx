import { useEffect, useRef } from 'react';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Markers } from '../../consts';
import { Offer, City } from '../../types/offer';
import useMap from '../../hooks/useMap';

type MapProps = {
  city: City;
  offers: Offer[];
  activeCardId: number | null;
  type: 'property' | 'cities';
}

function Map({ city, offers, activeCardId, type }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);

  const defaultCustomMarker = leaflet.icon({
    iconUrl: Markers.Default,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomMarker = leaflet.icon({
    iconUrl: Markers.Current,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach(({ location, id }) => {
        leaflet
          .marker({
            lat: location.latitude,
            lng: location.longitude,
          }, {
            icon: (id === activeCardId)
              ? currentCustomMarker
              : defaultCustomMarker,
          })
          .addTo(map);
      });
    }
  }, [map, offers, activeCardId]);

  return (
    <section
      className={`${type}__map map`}
      ref={mapRef}
    >

    </section>
  );
}

export default Map;
