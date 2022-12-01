import { useState } from 'react';
import { SortOptions } from '../../consts';

function Sort () {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<string>(SortOptions.Popular);

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
        {activeOption}
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
              className={`places__option ${option === activeOption ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => setActiveOption(option)}
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
