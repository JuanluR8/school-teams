import { head, pathOr, compose, pipe, append, prop, filter, identity, props, join, ifElse, isEmpty, always as K, pluck, includes } from "ramda/es";
import { findById } from "./listHelper";

const getFirstTeamLogo = compose(head, pathOr([])(["logos"]));
const getTeamColors = (team) => pipe(
  append(prop('color')(team)),
  append(prop('alt_color')(team)),
  filter(identity)
)([]);

const getTeamAlternativeNames = pipe(
  props(['alt_name1', 'alt_name2', 'alt_name3']),
  filter(identity),
  join(', '),
  ifElse(isEmpty, K('--'), identity)
);

const isFavorite = (id) => pipe(
  pluck('id'),
  includes(id)
);

const quote = string => `"${string}"`;

const getTeamComment = teamId => pipe(
  findById(teamId),
  prop('comment'),
  ifElse(isEmpty)(K('No comments saved for this team'))(quote)
);

export {
  getFirstTeamLogo,
  getTeamColors,
  getTeamAlternativeNames,
  isFavorite,
  getTeamComment
}