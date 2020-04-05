import { head, pathOr, compose, pipe, append, prop, filter, identity, props, join, ifElse, isEmpty, always as K } from "ramda/es";

const getFirstTeamLogo = compose(head, pathOr([])(["logos"]));
const getTeamColors = (team) => pipe(
  append(prop("color")(team)),
  append(prop("alt_color")(team)),
  filter(identity)
)([]);

const getTeamAlternativeNames = pipe(
  props(['alt_name1', 'alt_name2', 'alt_name3']),
  filter(identity),
  join(', '),
  ifElse(isEmpty, K('--'), identity)
);

export {
  getFirstTeamLogo,
  getTeamColors,
  getTeamAlternativeNames,
}