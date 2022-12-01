import { Dispatch, SetStateAction, useState } from 'react';
import { SortOptions } from '../../consts';

type SortProps = {
  activeSortOption: string;
  setActiveSortOption: Dispatch<SetStateAction<string>>;
}

function Sort ({activeSortOption, setActiveSortOption}: SortProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}
      >
        {
          Object.values(SortOptions).map((option) => (
            <li
              key={option}
              className={`places__option ${option === activeSortOption ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => setActiveSortOption(option)}
            >
              {option}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default Sort;
