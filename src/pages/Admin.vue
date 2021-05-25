<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <p class="title">样本审核</p>
        <p class="subtitle">Sample Check</p>
      </div>
    </section>
  </div>
  <div class="container">
    <div class="header title is-4 mt-4">
      <span class="is-flex-grow-1"> 当前未审核的样本： </span>
    </div>
    <div class="block" v-for="dataset in datasets" :key="dataset._user">
      <h1 class="title is-4">
        <span class="username">
          {{ dataset.creator.username }}
        </span>
        <i class="bi bi-person person"></i>
      </h1>
      <p class="name">{{ dataset.name }}</p>
      <p class="sample">{{ dataset.description }}</p>
       <p class="id">{{ dataset.id }}</p>
      <hr />
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
.person {
  margin: 10px;
}
</style>