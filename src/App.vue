<template>
  <Navbar />
  <div class="main">
    <router-view></router-view>
  </div>
  <footer class="footer mt-4">
    <div class="content has-text-centered">
      <p>
        <!-- 实际上还有毛亚琛，主要都是毛亚琛 -->
        <strong>PlantData</strong> by
        zengfan and yanzihan. The source code is licensed
        <a
          href="http://opensource.org/licenses/mit-license.php"
        >MIT</a>. The website content
        is licensed
        <a
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >CC BY NC SA 4.0</a>.
      </p>
    </div>
  </footer>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
};
</script>

<style>
.container {
  padding: 1rem;
}
.main {
  min-height: 100vh;
}
.logo-text {
  font-family: "Zen Dots", cursive;
}
</style>
