import Logo from '../logo/Logo';
import HeaderNavigation from './HeaderNavigation';

type HeaderProps = {
  withNav: boolean;
  isMainPage: boolean;
}

function Header({withNav, isMainPage}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type={'header'} isMainPage={isMainPage}/>
          </div>
          {withNav ? <HeaderNavigation /> : ''}
        </div>
      </div>
    </header>
  );
}

export default Header;
