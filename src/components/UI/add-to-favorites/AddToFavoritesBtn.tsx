import React from 'react';
import { CardTypes } from '../../../consts';
import { useAppDispatch } from '../../../hooks/redux';
import { setFavoritesStatus } from '../../../store/apiActions';

type AddToFavoritesBtnProps = {
  id: number;
  isFavorite: boolean;
  btnType: CardTypes;
}

type Style = {
  [key: string]: {
    width: number;
    height: number;
    className: string;
  };
}

function AddToFavoritesBtn ({id, isFavorite, btnType}: AddToFavoritesBtnProps) {
  const dispatch = useAppDispatch();

  const Styles: Style = {
    [CardTypes.Main]: {
      width: 18,
      height: 19,
      className: 'place-card',
    },
    [CardTypes.Property]: {
      width: 31,
      height: 33,
      className: 'property',
    },
  };

  const favoritesBtnClickHandler = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    evt.preventDefault();
    dispatch(setFavoritesStatus({id, isFavorite, withChangeCurrentOffer: btnType === CardTypes.Property}));
  };

  return (
    <button
      className={`${isFavorite ? `${Styles[btnType].className}__bookmark-button ${Styles[btnType].className}__bookmark-button--active` : `${Styles[btnType].className}__bookmark-button`} button`} type="button"
      onClick={favoritesBtnClickHandler}
    >
      <svg
        className={`${Styles[btnType].className}__bookmark-icon`}
        width={Styles[btnType].width}
        height={Styles[btnType].height}
        style={isFavorite ? {fill: '#4481c3'} : {}}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'Add to bookmarks' : 'Remove from bookmarks'}</span>
    </button>
  );
}

export default AddToFavoritesBtn;
