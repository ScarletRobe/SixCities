import { Link } from 'react-router-dom';
import { LOCATIONS } from '../../consts';

type LocationsProps = {
  currentLocation: string;
}

function Locations({currentLocation}: LocationsProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {LOCATIONS.map((location) => (
          <li key={location} className="locations__item">
            <Link
              className={
                location === currentLocation
                  ? 'locations__item-link tabs__item tabs__item--active'
                  : 'locations__item-link tabs__item'
              }
              to="/"
            >
              <span>{location}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Locations;
