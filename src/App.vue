<template>
  <div id="app">
    <div class="navbar">
      <div class="logo">
        <router-link to="/">
          <img src="./assets/img/logo1.svg" width="60" alt="" />
        </router-link>
      </div>
    </div>
    <div class="container"><router-view></router-view></div>
    <div class="footer"><Footer></Footer></div>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #f8f9fa;
  height: 60px;
  display: block;
  text-align: center;
  border-bottom: solid;
  border-width: 1px;
  border-color: #dee2e6;
  margin: 0 0;
  padding: 0 0;
}

.navbar .logo {
  display: inline;
  height: 40px;
  padding-top: 12px;
  min-width: 80px;
  float: left;
}

a {
  text-decoration-line: none;
  color: #212529;
}
</style>
