import Header from '../../components/header/Header';
import Locations from '../../components/locations/Locations';
import EmptyOffersSection from '../../components/offersSection/EmptyOffersSection';
import OffersSection from '../../components/offersSection/OffersSection';
import { useAppSelector } from '../../hooks/redux';

function MainPage(): JSX.Element {
  const currentCityOffers = useAppSelector((state) => state.appReducer.offersByCity);

  return (
    <div className="page page--gray page--main">
      <Header
        withNav
        isMainPage
      />

      <main
        className={`page__main page__main--index ${currentCityOffers.length ? '' : 'page__main--index-empty'}`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations />
        </div>
        {
          currentCityOffers.length
            ? <OffersSection />
            : <EmptyOffersSection />
        }
      </main>
    </div>
  );
}

export default MainPage;
