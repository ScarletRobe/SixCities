import { useEffect, useRef } from 'react';
import * as ReactDOMServer from 'react-dom/server';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { CardTypes, Markers } from '../../consts';
import { Location } from '../../types/offer';
import useMap from '../../hooks/useMap';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import PlaceCard from '../place-card/PlaceCard';
import { useAppSelector } from '../../hooks/redux';
import React from 'react';

type MapProps = {
  location: Location;
  activeCardId: number | null;
  setActiveCardId?: (id: number) => void;
  type: 'property' | 'cities';
}

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

function Map({ location, activeCardId, setActiveCardId, type }: MapProps): JSX.Element {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);
  const offers = useAppSelector((state) => state.appReducer.offersByCity);
  const markerGroup = leaflet.layerGroup();

  useEffect(() => {
    if (map) {
      markerGroup.addTo(map);
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

        marker.addTo(markerGroup);
      });
    }

    return () => {
      if (map) {
        map.removeLayer(markerGroup);
      }
    };
  }, [map, offers, activeCardId, markerGroup, navigate, setActiveCardId]);

  return (
    <section
      className={`${type}__map map`}
      ref={mapRef}
    >

    </section>
  );
}

export default React.memo(Map);
