<script>
import axios from 'axios';
import TeamCard from '../components/TeamCard.vue';
import { sortAndFilter, filterByFavorites } from '../helpers/listHelper';
import { equals, propEq, reject, append } from 'ramda/es';
import {
  getLocalStorageFavorites,
  setLocalStorageFavorites,
} from '../helpers/localStorage';

export default {
  name: 'TeamsList',
  data: () => ({
    teamsList: [],
    searchModel: '',
    sortModel: 'id',
    userCommentModel: '',
    showModal: false,
    propsToSortBy: [
      { text: 'Id', value: 'id' },
      { text: 'Name', value: 'school' },
      { text: 'Abbreviation', value: 'abbreviation' },
      { text: 'Conference', value: 'conference' },
      { text: 'Division', value: 'division' },
    ],
    favoritesList: [],
    teamToManage: {},
  }),
  computed: {
    isFavoritesView() {
      return equals('favorites')(this.$route.name);
    },
    listToIterate() {
      return this.isFavoritesView
        ? filterByFavorites(this.teamsList)(this.favoritesList)
        : this.teamsList;
    },
    sortedTeamsList() {
      return sortAndFilter({
        sortModel: this.sortModel,
        searchModel: this.searchModel,
      })(this.listToIterate);
    },
  },
  components: { TeamCard },
  methods: {
    fetchTeams() {
      axios
        .get('https://api.collegefootballdata.com/teams')
        .then((response) => (this.teamsList = response.data))
        .catch(() => (this.teamsList = []));
    },
    addToFavorites(id) {
      this.favoritesList = append({ id, comment: this.userCommentModel })(
        this.favoritesList
      );
      this.saveFavoritesList();
      this.showModal = false;
    },
    removeFromFavorites(id) {
      this.favoritesList = reject(propEq('id')(id))(this.favoritesList);
      this.saveFavoritesList();
    },
    saveFavoritesList() {
      setLocalStorageFavorites(this.favoritesList);
      return;
    },
    getFavoritesList() {
      this.favoritesList = getLocalStorageFavorites();
    },
    closeModal() {
      this.userCommentModel = '';
      this.showModal = false;
      this.teamToManage = {};
    },
    openModal(team) {
      this.showModal = true;
      this.teamToManage = team;
    },
  },
  mounted() {
    this.fetchTeams();
    this.getFavoritesList();
  },
};
</script>

<template>
  <div class="list">
    <t-modal
      :value="showModal"
      class="modal"
      footerClass="modal-footer"
      bodyClass="modal-body border-b"
      @before-close="closeModal"
    >
      <template v-slot:header class="modal-header">
        <h1>Add team to favorites</h1>
      </template>
      <template v-slot:default class="modal-body">
        <span class="filters-search-text"
          >Add a comment about {{ teamToManage.school }}:</span
        >
        <t-input
          type="text"
          v-model="userCommentModel"
          placeholder="..."
          size="sm"
          maxlength="150"
        />
      </template>
      <template v-slot:footer class="modal-footer">
        <t-button variant="danger" @click="closeModal">Cancel</t-button>
        <t-button variant="primary" @click="addToFavorites(teamToManage.id)"
          >Add</t-button
        >
      </template>
    </t-modal>
    <div class="filters">
      <div class="filters-search">
        <span class="filters-search-text">Search teams:</span>
        <t-input
          type="text"
          v-model="searchModel"
          placeholder="Search..."
          size="sm"
        />
      </div>
      <div class="filters-sort">
        <span class="filters-sort-text">Sort by:</span>
        <t-select v-model="sortModel" :options="propsToSortBy" size="sm" />
      </div>
    </div>
    <TeamCard
      v-for="team in sortedTeamsList"
      :key="team.id"
      :team="team"
      :favoritesList="favoritesList"
      @add="openModal(team)"
      @remove="removeFromFavorites(team.id)"
    />
  </div>
</template>

<style lang="scss" scopped>
$filtersFontSize: 20px;

.list {
  padding: 20px;
  display: flex;
  flex-direction: column;

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-search,
    &-sort {
      display: flex;
      align-items: center;
      &-text {
        margin-right: 10px;
        font-size: $filtersFontSize;
      }
    }
  }

  .modal {
    &-body {
      padding: 20px;
      height: 200px;
      input {
        width: 100%;
      }
    }

    &-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        margin: 5px;
      }
    }
  }
}
</style>
