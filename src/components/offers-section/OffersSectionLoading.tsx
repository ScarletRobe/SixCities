import classes from './offersSection.module.css';

function OffersSectionLoading () {
  return (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className={classes.citiesStatusWrapper}>
            <div className={classes.loaderWrapper}>
              <div className={classes.loader}>
                <div></div>
              </div>
            </div>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
}

export default OffersSectionLoading;
