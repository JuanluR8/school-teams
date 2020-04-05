<script>
import {
  getFirstTeamLogo,
  getTeamColors,
  getTeamAlternativeNames,
} from "../helpers/teamHelper";

import { pathOr } from 'ramda/es';
export default {
  data() {
    return {
      teamInfo: null,
      imgSrc: null
    };
  },
  computed: {
    teamColors() {
      return getTeamColors(this.teamInfo);
    },
    alternativeTeamNames() {
      return getTeamAlternativeNames(this.teamInfo);
    }
  },
  methods: {
    setNotFoundLogo() {
      this.imgSrc = "../assets/not-found.png";
    },
    goBackToList() {
      this.$router.go(-1);
    },
    getTeamProp(prop) {
      return pathOr('--')([prop])(this.teamInfo);
    }
  },
  mounted() {
    this.teamInfo = this.$route.params;
    this.imgSrc = getFirstTeamLogo(this.teamInfo);
  }
};
</script>

<template>
  <div class="team-details">
    <t-button @click="goBackToList">Back</t-button>
    <div class="team-details-card t-card bg-white rounded border">
      <div class="card-info-left">
        <h1 class="team-details-card-name">{{ getTeamProp('school') }}</h1>
        <div v-if="imgSrc">
          <img class="team-details-card-logo" :src="imgSrc" @error="(() => imgSrc = null)" />
        </div>
        <div v-else>
          <img class="team-details-card-logo" src="../assets/not-found.png" />
        </div>
      </div>
      <div class="card-info-right">
        <span class="team-colors-text">
          Team colors:
          <div class="team-details-card-colors">
            <div
              class="team-details-card-colors-container"
              v-for="(color, index) in teamColors"
              :key="index"
              :style="{ background: color }"
            ></div>
          </div>
        </span>
        <p>Alternative names: {{ alternativeTeamNames }}</p>
        <p>Mascot: {{ getTeamProp('mascot') }}</p>
        <p>Conference: {{ getTeamProp('conference') }}</p>
        <p>Division: {{ getTeamProp('division') }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.team-details {
  margin: 60px 40px;
  &-card {
    margin-top: 10px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 2fr;

    .card-info-left {
      display: flex;
      flex-direction: column;
    }
    .card-info-right {
      margin-top: 20px;
      display: flex;
      flex-direction: column;

      .team-colors-text {
        display: flex;
      }
    }

    &-name {
      font-size: 20px;
      font-weight: 500;
      text-align: center;
    }

    &-logo {
      width: 80px;
      margin: auto auto;
    }

    &-colors {
      display: flex;
      margin-left: 10px;
      &-container {
        width: 50px;
        height: 20px;
        border: 1px solid black;
        margin: 2px;
      }
    }

    &-alternative-names,
    &-mascot {
      margin-top: 10px;
    }
  }
}
</style>