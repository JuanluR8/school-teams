<script>
export default {
  data: () => ({
    views: [
      { label: "Teams", url: "/teams" },
      { label: "Favorites", url: "/favorites" }
    ]
  })
};
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link v-for="{label, url} in views" :key="url" :to="url">{{ label }}</router-link>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
$navbarHeight: 40px;

body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  #nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    background: #42b983;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: $navbarHeight;

    a {
      font-weight: bold;
      // color: #2c3e50;
      color: #f9f9f9;
      margin: 0 10px;
      text-decoration: none;

      &.router-link-exact-active {
        // color: #42b983;
        color: #fff;
        text-decoration: underline;
      }
    }
  }

  .content {
    box-sizing: border-box;
    margin-top: $navbarHeight;
    max-width: 100wh;
  }
}
</style>
