import { Comment } from '../../types/comment';
import NewReviewForm from '../new-review-form/NewReviewForm';
import Review from './Review';

type ReviewsProps = {
  reviews: Comment[];
}

const Reviews = ({reviews}: ReviewsProps) => (
  <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {
        reviews.map((review) => <Review review={review} key={review.id}/>)
      }
    </ul>
    <NewReviewForm />
  </section>
);

export default Reviews;
