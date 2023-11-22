<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    // Sets components name based on current route's specified layout, defaults to
    // <layout-default></layout-default> component.
    layout() {
      return "layout-" + ( this.$route.meta.layout || "default" ).toLowerCase() ;
    }
  },
}
</script>

<style lang = "scss">
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
