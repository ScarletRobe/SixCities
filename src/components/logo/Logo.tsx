import {Link} from 'react-router-dom';
import { AppRoute } from '../../consts';

type LogoProps = {
  type: 'header' | 'footer';
  isActive: boolean;
}

function Logo({type, isActive = false} : LogoProps): JSX.Element {
  const styles = {
    header: {
      width: 81,
      height: 41,
    },
    footer: {
      width: 64,
      height: 33,
    }
  };

  return (
    <Link className={isActive ? `${type}__logo-link--active ${type}__logo-link` : `${type}__logo-link`} to={AppRoute.Main}>
      <img className={`${type}__logo`} src="img/logo.svg" alt="6 cities logo" width={styles[type].width} height={styles[type].height} />
    </Link>
  );
}

export default Logo;
