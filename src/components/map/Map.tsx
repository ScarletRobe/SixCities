import { useEffect, useRef } from 'react';
import * as ReactDOMServer from 'react-dom/server';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { CardTypes, Markers } from '../../consts';
import { Location, Offer } from '../../types/offer';
import useMap from '../../hooks/useMap';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import PlaceCard from '../place-card/PlaceCard';

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
      offers.forEach((offer) => {
        const marker = leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeCardId)
              ? currentCustomMarker
              : defaultCustomMarker,
          });
        marker.on('click', () => {
          setActiveCardId?.(offer.id);
          navigate(`/place/${offer.id}`, { replace: true });
        });
        marker.bindPopup(ReactDOMServer.renderToString(
          <PlaceCard offer={offer} cardType={CardTypes.MarkerPopup} />
        ), {'offset': L.point(0,-30)});
        marker.on('mouseover', () => {
          marker.openPopup();
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
