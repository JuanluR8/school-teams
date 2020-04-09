
const STORAGE_NAME_TEAMS = 'teams';

const baseLocalStorage = {
  favorites: [],
}

const initializeLocalStorage = localStorage.setItem(STORAGE_NAME_TEAMS, JSON.stringify(baseLocalStorage));
const getLocalStorage = () => JSON.parse(localStorage.getItem(STORAGE_NAME_TEAMS));

const getLocalStorageFavorites = () => getLocalStorage().favorites;
const setLocalStorageFavorites = (newFavoritesList) => localStorage.setItem(STORAGE_NAME_TEAMS, JSON.stringify({ favorites: newFavoritesList }));

export {
  initializeLocalStorage,
  getLocalStorage,
  getLocalStorageFavorites,
  setLocalStorageFavorites
}
