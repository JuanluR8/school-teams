import TeamsList from '../components/TeamsList.vue';

const routes = [
  {
    path: '/',
    name: 'root',
    component: TeamsList
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('../components/TeamsList.vue'),
    props: { view: 'teams' }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../components/TeamsList.vue'),
    props: { view: 'favorites' }
  },
  {
    path: '/team-details/:id',
    name: 'team-details',
    component: () => import('../components/TeamDetails.vue'),
  },
];

export default routes;