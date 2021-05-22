<template>
  <div class="container">
    <div class="header title is-4 mt-4">
      <span class="is-flex-grow-1">
        {{ dataset.name }}
      </span>

      <button class="button is-primary">上传样本</button>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  mounted() {
    const self = this;
    const { datasetId } = this.$route.params;
    this.$http.get(`/api/datasets/${datasetId}`).then((res) => {
      self.dataset = res.data;
    });
  },
  data() {
    return {
      dataset: {
        name: "",
      },
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
</style>