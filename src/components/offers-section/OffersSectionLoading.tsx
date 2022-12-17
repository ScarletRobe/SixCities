import Spinner from '../UI/spinner/Spinner';

function OffersSectionLoading () {
  return (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <Spinner />
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
}

export default OffersSectionLoading;
