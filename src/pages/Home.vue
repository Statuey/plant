<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title logo-text">PlantData</p>
        <p class="subtitle">植物病害识别数据管理平台</p>
      </div>
    </section>
    <div class="container mt-4">
      <div class="columns is-multiline">
        <div class="column is-12-mobile is-3-fullhd is-4-desktop is-6-tablet" v-for="dataset in datasets" :key="dataset.id">
          <DatasetCard :dataset="dataset" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DatasetCard from "../components/DatasetCard.vue";

export default {
  components: { DatasetCard },
  data() {
    return {
      datasets: [],
    };
  },
  mounted() {
    this.$http.get("/api/datasets").then((res) => {
      this.datasets = res.data.results;
    });
  },
};
</script>

<style scoped>
</style>