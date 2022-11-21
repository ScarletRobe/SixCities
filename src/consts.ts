export enum AppRoute {
  Main = '/',
  Favorites = 'favorites',
  Login = '/login',
  Place = '/place/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const LOCATIONS = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum CardTypes {
  Main = 'cities',
  Favorites = 'favorites',
  Property = 'property'
}
