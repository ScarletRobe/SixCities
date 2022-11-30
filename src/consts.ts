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

export const LOCATIONS = [
  {
    name: 'Paris',
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.935173,
      longitude: 6.953101,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.377956,
      longitude: 4.897070,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.551086,
      longitude: 9.993682,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.233334,
      longitude: 6.783333,
      zoom: 13
    }
  }
];

export enum CardTypes {
  Main = 'cities',
  Favorites = 'favorites',
  Property = 'property',
  MarkerPopup = 'marker'
}

export enum TileLayerConfig {
  URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}

export enum Markers {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg',
}

export const defaultCity = LOCATIONS[2];
