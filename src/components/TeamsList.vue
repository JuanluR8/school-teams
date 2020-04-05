<script>
import axios from "axios";
import TeamCard from "../components/TeamCard.vue";
import { sortAndFilter } from '../helpers/listHelper';

export default {
  data: () => ({
    teamsList: [],
    error: false,
    loading: false,
    searchModel: "",
    sortModel: "id",
    propsToSortBy: [
      { text: "Id", value: "id" },
      { text: "Name", value: "school" },
      { text: "Abbreviation", value: "abbreviation" },
      { text: "Conference", value: "conference" },
      { text: "Division", value: "division" }
    ]
  }),
  computed: {
    iterableTeamsList() {
      return sortAndFilter({
        sortModel: this.sortModel,
        searchModel: this.searchModel
      })(this.teamsList);
    }
  },
  components: { TeamCard },
  methods: {
    fetchTeams() {
      this.loading = true;
      axios
        .get("https://api.collegefootballdata.com/teams")
        .then(response => {
          this.teamsList = response.data;
          this.error = false;
        })
        .catch(() => {
          this.error = true;
          this.teamsList = [];
        })
        .finally(() => (this.loading = false));
    }
  },
  mounted() {
    this.fetchTeams();
  }
};
</script>

<template>
  <div class="list">
    <div class="filters">
      <div class="filters-search">
        <span class="filters-search-text">Search teams:</span>
        <t-input type="text" v-model="searchModel" placeholder="Search..." size="sm" />
      </div>
      <div class="filters-sort">
        <span class="filters-sort-text">Sort by:</span>
        <t-select v-model="sortModel" :options="propsToSortBy" size="sm" />
      </div>
    </div>
    <TeamCard v-for="team in iterableTeamsList" :key="team.id" :team="team" />
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
}
</style>