import { pipe, filter, find, sortBy, prop, propEq } from 'ramda/es';
import { isFavorite } from './teamHelper';

const sortAndFilter = ({ sortModel, searchModel }) => pipe(
  filter(({ school }) => new RegExp(searchModel, "i").test(school)),
  sortBy(prop(sortModel))
);

const filterByFavorites = (allTeams) => (favoritesList) => filter(
  (item) => isFavorite(item.id)(favoritesList)
)(allTeams);

const findById = id => find(propEq('id')(id));

export {
  sortAndFilter,
  filterByFavorites,
  findById
}