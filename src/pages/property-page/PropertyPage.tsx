import { Navigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import PropertyCard from '../../components/property-card/PropertyCard';
import { offers } from '../../mocks/offers';
import { Comment } from '../../types/comment';

type PropertyPageParams = {
  id: string;
}

type PropertyPageProps = {
  reviews: Comment[];
}

function Property ({reviews}: PropertyPageProps): JSX.Element {
  const params = useParams<PropertyPageParams>();
  const offer = offers.find((o) => o.id === Number(params.id));

  if (!offer) {
    return <Navigate to='/not-found'/>;
  }

  return (
    <div className="page">
      <Header withNav isMainPage={false}/>

      <PropertyCard offer={offer} reviews={reviews}/>
    </div>
  );
}

export default Property;
