import React, { ChangeEvent } from 'react';

type ReviewStarsProps = {
  changeHandler: (evt:ChangeEvent<HTMLInputElement>) => void;
}

function ReviewStars ({changeHandler}: ReviewStarsProps): JSX.Element {
  const STARS_AMOUNT = 5;

  enum Titles {
    'perfect' = 5,
    'good' = 4,
    'not bad' = 3,
    'badly' = 2,
    'terribly' = 1
  }

  const result = [];
  for (let i = STARS_AMOUNT; i >= 1; i--) {
    result.push(
      <React.Fragment key={i}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={i}
          id={`${i}-stars`}
          type="radio"
          onChange={changeHandler}
        />
        <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title={Titles[i]}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </React.Fragment>
    );
  }
  return (
    <div className="reviews__rating-form form__rating">
      {result}
    </div>
  );
}

export default ReviewStars;
