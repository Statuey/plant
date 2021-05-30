<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <p class="title logo-text">PlantData</p>
      <p class="subtitle">公共识别模型</p>
    </div>
  </section>
  <div class="container mt-4">
    <div class="columns is-multiline">
      <div
        class="column is-12-mobile is-3-fullhd is-4-desktop is-6-tablet"
        v-for="modelset in modelsets"
        :key="modelset.id"
      >
        <ModelsetCard :modelset="modelset" />
      </div>
    </div>
  </div>
</template>

<script>
import ModelsetCard from "../components/ModelsetCard.vue";

export default {
  components: { ModelsetCard },
  data() {
    return {
      modelsets: [],
    };
  },
  mounted() {
    this.$http.get("/api/modelsets").then((res) => {
      this.modelsets = res.data.results;
    });
  },
};
</script>

<style scoped>
</style>