<template>
  <div class="container">
    <SampleTable v-if="dataset" :dataset="dataset" :unchecked="true"/>
  </div>
</template>

<script>
import SampleTable from "../components/SampleTable.vue";

export default {
  components: { SampleTable },
  data() {
    return {
      dataset: undefined,
    };
  },
  mounted() {
    const { datasetId } = this.$route.params;
    this.datasetId = datasetId;
    this.$http.get(`/api/datasets/${datasetId}`).then((res) => {
      this.dataset = res.data;
    });
  },
};
</script>

<style scoped>
.person {
  margin: 10px;
}
</style>