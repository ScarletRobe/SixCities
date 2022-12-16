import { Navigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import PropertyCard from '../../components/property-card/PropertyCard';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks/redux';
import { Comment } from '../../types/comment';

type PropertyPageParams = {
  id: string;
}

type PropertyPageProps = {
  reviews: Comment[];
}

function Property ({reviews}: PropertyPageProps): JSX.Element {
  const offers = useAppSelector((state) => state.rootReducer.appData.allOffers);

  const params = useParams<PropertyPageParams>();
  const offer = offers.find((o) => o.id === Number(params.id));

  if (!offer) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  return (
    <div className="page">
      <Header withNav isMainPage={false}/>

      <PropertyCard offer={offer} reviews={reviews}/>
    </div>
  );
}

export default Property;
