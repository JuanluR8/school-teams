import { pipe, filter, sortBy, prop } from 'ramda/es';

const sortAndFilter = ({ sortModel, searchModel }) => pipe(
  filter(({ school }) => new RegExp(searchModel, "i").test(school)),
  sortBy(prop(sortModel))
);

export {
  sortAndFilter
}