<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">PlantData</p>
        <p class="subtitle">植物病害识别数据管理平台</p>
      </div>
    </section>
    <div class="container">
      <div class="header title is-4 mt-4">
        <span class="is-flex-grow-1"> 当前所有数据集： </span>
      </div>
      <div class="block" v-for="dataset in datasets" :key="dataset._user">
        <h1 class="title is-4">
          <span class="username">
            {{ dataset.creator.username }}
          </span>
          <i class="bi bi-person person"></i>
          <router-link
            class="button is-success is-small search"
            :to="`/datasets/${dataset.id}`"
            >查看</router-link
          >
        </h1>
        <p class="name">{{ dataset.name }}</p>
        <p class="sample">{{ dataset.description }}</p>
        <p class="id">{{ dataset.id }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dataset"],
  data() {
    return {
      samples: [],
      datasets: [],
      user: undefined,
    };
  },
  mounted() {
    this.$http.get("/api/datasets").then((res) => {
      this.datasets = res.data.results;
      console.log(this.datasets);
    });
  },
};
</script>

<style scoped>
.page {
  background-size: contain;
}
.username{
  flex:1;
}
.search{
  float: right;
}
</style>