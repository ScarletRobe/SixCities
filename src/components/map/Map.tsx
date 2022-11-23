import { useEffect, useRef } from 'react';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Markers } from '../../consts';
import { Location, Offer } from '../../types/offer';
import useMap from '../../hooks/useMap';
import { useNavigate } from 'react-router-dom';

type MapProps = {
  location: Location;
  offers: Offer[];
  activeCardId: number | null;
  setActiveCardId?: (id: number) => void;
  type: 'property' | 'cities';
}

function Map({ location, offers, activeCardId, setActiveCardId, type }: MapProps): JSX.Element {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

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
      offers.forEach(({ location: loc, id }) => {
        const marker = leaflet
          .marker({
            lat: loc.latitude,
            lng: loc.longitude,
          }, {
            icon: (id === activeCardId)
              ? currentCustomMarker
              : defaultCustomMarker,
          });
        marker.on('click', () => {
          setActiveCardId?.(id);
          navigate(`/place/${id}`, { replace: true });
        });
        marker.addTo(map);
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
