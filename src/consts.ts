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

export enum TileLayerConfig {
  URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}

export enum Markers {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg',
}
