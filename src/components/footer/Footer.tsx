import Logo from '../logo/Logo';

type FooterProps = {
  isMainPage: boolean;
}

function Footer ({isMainPage}: FooterProps) {
  return (
    <footer className="footer container">
      <Logo type={'footer'} isMainPage={isMainPage}/>
    </footer>
  );
}

export default Footer;
