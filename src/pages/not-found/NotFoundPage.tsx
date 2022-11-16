import { Link } from 'react-router-dom';

import { AppRoute } from '../../consts';

//TODO: Стили в модуль
function NotFoundPage():JSX.Element {
  return (
    <div className="page page--gray">
      <main className="page__main">
        <div className="container">
          <section
            style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
            className="page__not-found"
          >
            <h1>Sorry, we can&apos;t find that page</h1>
            <Link
              style={{textDecoration: 'underline'}}
              to={AppRoute.Main}
            >
              Back to the main page
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
