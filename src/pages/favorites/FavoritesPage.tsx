import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks/redux';
import FavoritesCard from '../../components/favorites-card/FavoritesCard';
import EmptyFavoritesCard from '../../components/favorites-card/EmptyFavoritesCard';

export type FavoritesOffers = {
  [key: string]: Offer[];
}

const getFavoritesPlacesFromOffers = (favoriteOffers: Offer[]) => {
  const result: FavoritesOffers = {};
  favoriteOffers.forEach((offer) => {
    if (result?.[offer.city.name]?.length) {
      result[offer.city.name].push(offer);
    } else {
      result[offer.city.name] = [offer];
    }
  });
  return result;
};

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.appReducer.favoriteOffers);

  return (
    <div className="page">
      <Header withNav isMainPage={false}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            favoriteOffers.length
              ? <FavoritesCard favoritesPlaces={getFavoritesPlacesFromOffers(favoriteOffers)} />
              : <EmptyFavoritesCard />
          }
        </div>
      </main>

      <Footer isMainPage={false}/>
    </div>
  );
}

export default FavoritesPage;
