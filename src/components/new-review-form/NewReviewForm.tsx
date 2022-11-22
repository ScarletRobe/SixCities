import { ChangeEvent } from 'react';
import { useState } from 'react';
import ReviewStars from './ReviewStars';

const MIN_REVIEW_LENGTH = 50;

type ReviewDataState = {
  rating: null | string;
  review: string;
}

function validateForm ({rating, review}: ReviewDataState) {
  if (!rating) {return false;}
  if (review.length <= MIN_REVIEW_LENGTH) {return false;}

  return true;
}

function NewReviewForm (): JSX.Element {
  const [reviewData, setReviewData] = useState<ReviewDataState>({
    rating: null,
    review: '',
  });

  const formChangeHandler = (evt:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewStars changeHandler={formChangeHandler} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={formChangeHandler}
        minLength={MIN_REVIEW_LENGTH}
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
