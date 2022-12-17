import classes from './spinner.module.css';

const Spinner = () => (
  <div className={classes.citiesStatusWrapper}>
    <div className={classes.loaderWrapper}>
      <div className={classes.loader}>
        <div></div>
      </div>
    </div>
  </div>
);

export default Spinner;
