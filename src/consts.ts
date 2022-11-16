export enum AppRoute {
  Main = '/',
  Favorites = 'favorites',
  Login = '/login',
  Room = '/room/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
