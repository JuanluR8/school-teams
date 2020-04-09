<script>
export default {
  name: 'FavoriteToggle',
  props: {
    value: Boolean
  },
  methods: {
    emitClick() {
      this.$emit('click');
    }
  }
}
</script>

<template>
  <div class="favorite-toggle" @click="emitClick">
    <img src="../../assets/heart-full.png" v-if="value"/>
    <img src="../../assets/heart-empty.png" v-else/>
  </div>
</template>

<style lang="scss" scopped>
.favorite-toggle {
  cursor: pointer;
}
</style>