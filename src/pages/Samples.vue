<template>
  <SampleTable :dataset="dataset" />
</template>

<script>
import SampleTable from "../components/SampleTable.vue";

export default {
  components: { SampleTable },
  props: ["dataset"],
};
</script>