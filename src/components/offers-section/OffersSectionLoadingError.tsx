import { useAppSelector } from '../../hooks/redux';
import classes from './offersSection.module.css';

function OffersSectionLoadingError () {
  const errorMessage = useAppSelector((state) => state.rootReducer.appData.loadingError);

  return (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className={classes.citiesStatusWrapper}>
            <div>{errorMessage}</div>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
}

export default OffersSectionLoadingError;
