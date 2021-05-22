<template>
  <div class="container">
    <hr />
    <div class="block" v-for="dataset in datasets" :key="dataset.id">
      <h1 class="title is-4">
        <span class="name">
          {{ dataset.name }}
        </span>
        <router-link
          class="button is-success is-small"
          :to="`/datasets/${dataset.id}`"
          >查看</router-link
        >
      </h1>
      <p class="description">{{ dataset.description }}</p>
      <p>{{ dateFormat(dataset.date) }}</p>
      <hr />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  mounted() {
    const user = localStorage.getItem("user");
    this.$http.get("/api/datasets", { params: { user } }).then((res) => {
      this.datasets = res.data.results;
    });
  },
  data() {
    return {
      datasets: [],
    };
  },
  methods: {
    dateFormat(date) {
      return dayjs(date).fromNow();
    },
  },
};
</script>

<style scoped>
.name {
  flex: 1;
}

.title {
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

.description {
  margin-bottom: 0.6rem;
}
</style>