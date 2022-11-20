type RatingProps = {
  rating: number;
  type: 'place-card' | 'property';
  round?: boolean;
}

function Rating ({rating, type, round = true}: RatingProps): JSX.Element {
  const STAR_WIDTH = 20;
  const width = round ? Math.round(rating) * STAR_WIDTH : rating * STAR_WIDTH;
  return (
    <div className={`${type}__stars rating__stars`}>
      <span style={{width: `${width}%`}}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default Rating;
