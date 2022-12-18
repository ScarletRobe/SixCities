import { ChangeEvent } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { sendReview } from '../../store/apiActions';
import ReviewStars from './ReviewStars';

const MIN_REVIEW_LENGTH = 50;

type NewReviewFormProps = {
  offerId: number;
}

type ReviewDataState = {
  rating: string;
  review: string;
}

const validateForm = ({rating, review}: ReviewDataState) => ((rating !== '0') && (review.length >= MIN_REVIEW_LENGTH));

function NewReviewForm ({offerId}: NewReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [reviewData, setReviewData] = useState<ReviewDataState>({
    rating: '0',
    review: '',
  });

  const formChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        dispatch(sendReview({id: offerId, reviewText: reviewData.review, reviewRating: reviewData.rating}));
        setReviewData({
          rating: '0',
          review: '',
        });
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewStars changeHandler={formChangeHandler} pickedStar={Number(reviewData.rating)} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={formChangeHandler}
        minLength={MIN_REVIEW_LENGTH}
        value={reviewData.review}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!validateForm(reviewData)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default NewReviewForm;
