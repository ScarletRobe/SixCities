import Header from '../../components/header/Header';
import Locations from '../../components/locations/Locations';
import EmptyOffersSection from '../../components/offers-section/EmptyOffersSection';
import OffersSection from '../../components/offers-section/OffersSection';
import OffersSectionLoading from '../../components/offers-section/OffersSectionLoading';
import OffersSectionLoadingError from '../../components/offers-section/OffersSectionLoadingError';
import { useAppSelector } from '../../hooks/redux';
import { Offer } from '../../types/offer';
import { findOffersByCity } from '../../utils';

const getOffersSectionElement = (offersByCity: Offer[], isLoading: boolean, loadingError: string | null) => {
  if (isLoading) {
    return <OffersSectionLoading />;
  }
  if (loadingError) {
    return <OffersSectionLoadingError />;
  }
  if (!offersByCity.length) {
    return <EmptyOffersSection />;
  } else {
    return <OffersSection offers={offersByCity}/>;
  }
};

function MainPage(): JSX.Element {
  const {allOffers, city, isAllOffersLoading, allOffersLoadingError} = useAppSelector((state) => state.rootReducer.appData);
  const offersByCity = findOffersByCity(city.name, allOffers);

  return (
    <div className="page page--gray page--main">
      <Header
        withNav
        isMainPage
      />

      <main
        className={`page__main page__main--index ${offersByCity.length ? '' : 'page__main--index-empty'}`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations />
        </div>
        {getOffersSectionElement(offersByCity, isAllOffersLoading, allOffersLoadingError)}
      </main>
    </div>
  );
}

export default MainPage;
