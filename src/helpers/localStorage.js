
import { pathOr } from 'ramda/es';
const STORAGE_NAME_TEAMS = 'teams';

const getLocalStorage = () => JSON.parse(localStorage.getItem(STORAGE_NAME_TEAMS));

const getLocalStorageFavorites = () => pathOr([])(['favorites'])(getLocalStorage());
const setLocalStorageFavorites = (newFavoritesList) => localStorage.setItem(STORAGE_NAME_TEAMS, JSON.stringify({ favorites: newFavoritesList }));

export {
  getLocalStorage,
  getLocalStorageFavorites,
  setLocalStorageFavorites
}
