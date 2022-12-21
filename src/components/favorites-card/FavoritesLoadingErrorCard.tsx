function FavoritesLoadingErrorCard () {
  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Мы не смогли загрузить ваши избранные места</b>
        <p className="favorites__status-description">Попробуйте позже</p>
      </div>
    </section>
  );
}

export default FavoritesLoadingErrorCard;
