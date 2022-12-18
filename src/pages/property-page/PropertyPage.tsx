import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import PropertyCard from '../../components/property-card/PropertyCard';
import { AppRoute } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchOffer } from '../../store/apiActions';
import { Comment } from '../../types/comment';
import LoadingPage from '../loading-page/LoadingPage';

type PropertyPageParams = {
  id: string;
}

type PropertyPageProps = {
  reviews: Comment[];
}

function Property ({reviews}: PropertyPageProps): JSX.Element {
  const {id} = useParams<PropertyPageParams>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(fetchOffer(id));
  }, [id, dispatch]);

  const {currentOffer, currentOfferLoadingError, isCurrentOfferLoading} = useAppSelector((state) => state.rootReducer.appData);
  if (currentOfferLoadingError && !isCurrentOfferLoading) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  return (
    !isCurrentOfferLoading && currentOffer
      ? (
        <div className="page">
          <Header withNav isMainPage={false}/>
          <PropertyCard offer={currentOffer} reviews={reviews}/>
        </div>
      )
      : (
        <LoadingPage />
      )
  );
}

export default Property;
