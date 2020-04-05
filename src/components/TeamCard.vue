<script>
import { compose, isEmpty, not, equals } from "ramda/es";
import { getFirstTeamLogo, getTeamColors } from "../helpers/teamHelper";

export default {
  data() {
    return {
      imgSrc: null
    };
  },
  props: {
    team: Object
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
    }
  },
  methods: {
    setNotFoundLogo() {
      this.imgSrc = "../assets/not-found.png";
    },
    goToTeamDetails() {
      this.$router.push({ name: 'team-details', params: this.team });
    }
  },
  mounted() {
    this.imgSrc = getFirstTeamLogo(this.team);
  }
};
</script>

<template>
  <div class="team-card t-card bg-white rounded border">
    <span v-if="imgSrc">
      <img
        class="team-card-logo"
        :src="imgSrc"
        @error="(() => imgSrc = null)"
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
      </div>
      <div class="right">
        <t-button variant="primary" size="sm" @click="goToTeamDetails">View details</t-button>
        <span class="favorite-icon">Estrellita</span>
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
  }
}
</style>