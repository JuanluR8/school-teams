import { pathOr } from 'ramda/es';

const STORAGE_NAME_TEAMS = 'teams';

const baseLocalStorage = {
  favorites: [],
}

const initializeLocalStorage = localStorage.setItem(STORAGE_NAME_TEAMS, JSON.stringify(baseLocalStorage));
const getLocalStorage = () => localStorage.getItem(STORAGE_NAME_TEAMS);

const getLocalStorageFavorites = () => pathOr([])(['favorites'])(getLocalStorage());
const setLocalStorageFavorites = (newFavoritesList) => localStorage.setItem(STORAGE_NAME_TEAMS, JSON.stringify({ favorites: newFavoritesList }));

export {
  initializeLocalStorage,
  getLocalStorage,
  getLocalStorageFavorites,
  setLocalStorageFavorites
}
