import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PlaceCards from '../../components/place-cards/PlaceCards';
import { CardTypes } from '../../consts';
import { offers } from '../../mocks/offers';

function Favorites (): JSX.Element {
  return (
    <div className="page">
      <Header withNav isMainPage={false}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <PlaceCards cardType={CardTypes.Favorites} offers={offers.slice(0, 2)}/>
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <PlaceCards cardType={CardTypes.Favorites} offers={offers.slice(2, 4)}/>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer isMainPage={false}/>
    </div>
  );
}

export default Favorites;
