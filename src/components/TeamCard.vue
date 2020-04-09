<script>
import { compose, isEmpty, not, equals } from 'ramda/es';
import {
  getFirstTeamLogo,
  getTeamColors,
  isFavorite,
  getTeamComment,
} from '../helpers/teamHelper';
import FavoriteToggle from '../components/UI/FavoriteToggle.vue';

export default {
  name: 'TeamCard',
  data() {
    return {
      imgSrc: null,
    };
  },
  props: {
    team: Object,
    favoritesList: Array,
  },
  components: {
    FavoriteToggle,
  },
  computed: {
    isFavoritesView() {
      return equals('favorites')(this.$route.name);
    },
    teamColors() {
      return getTeamColors(this.team);
    },
    teamHasColors() {
      return compose(not, isEmpty)(this.teamColors);
    },
    teamIsFavorite() {
      return isFavorite(this.team.id)(this.favoritesList);
    },
    teamComment() {
      return getTeamComment(this.team.id)(this.favoritesList);
    },
  },
  methods: {
    setNotFoundLogo() {
      this.imgSrc = '../assets/not-found.png';
    },
    goToTeamDetails() {
      this.$router.push({ name: 'team-details', params: this.team });
    },
    toggleFavorite() {
      this.$emit(this.teamIsFavorite ? 'remove' : 'add');
    },
    removeFromFavorites() {
      this.$emit('remove');
    },
  },
  mounted() {
    this.imgSrc = getFirstTeamLogo(this.team);
  },
};
</script>

<template>
  <div class="team-card t-card bg-white rounded border">
    <span v-if="imgSrc">
      <img
        class="team-card-logo"
        :src="imgSrc"
        @error="() => (imgSrc = null)"
      />
    </span>
    <span v-else>
      <img class="team-card-logo" src="../assets/not-found.png" />
    </span>
    <div class="team-card-info">
      <div class="left">
        <div class="left-header">
          <span class="team-name">{{ team.school || '--' }}</span>
        </div>
        <div class="left-footer" v-if="!isFavoritesView">
          <span class="colors" v-if="teamHasColors">
            <div
              class="team-color"
              v-for="(color, index) in teamColors"
              :key="index"
              :style="{ background: color }"
            ></div>
          </span>
          <span v-else>Team has't assigned colors</span>
        </div>
        <div class="left-footer-favorites" v-else>
          <p>{{ teamComment }}</p>
        </div>
      </div>
      <div class="right">
        <t-button
          class="view-details-button"
          variant="primary"
          size="sm"
          @click="goToTeamDetails"
          >View details</t-button
        >
        <FavoriteToggle
          v-if="!isFavoritesView"
          :value="teamIsFavorite"
          @click="toggleFavorite"
        />
        <t-button size="sm" variant="danger" v-else @click="removeFromFavorites"
          >Remove</t-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.team-card {
  padding: 10px;
  margin: 5px 0;
  display: flex;
  width: 100%;
  box-sizing: border-box;

  &-logo {
    width: 60px;
    margin: 0 20px;
  }

  &-info {
    width: 100%;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      flex-direction: column;
      &-header {
        .team-name {
          font-size: 20px;
          font-weight: 500;
        }
      }

      &-footer {
        .colors {
          display: flex;
        }
        .team-color {
          width: 50px;
          height: 12px;
          border-radius: 5px;
          margin: 0 5px;
          border: 1px solid #000;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .view-details-button {
        margin: 0 20px;
      }
      .favorite-toggle {
        width: 20px;
      }
    }
  }
}
</style>
