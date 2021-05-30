<template>
  <div class="notification is-info">
    次列表中的样本数据目前还没有被管理员审查过，我们不能保证下面样本数据的准确性，请酌情下载！
  </div>
  <SampleTable :dataset="dataset" :unchecked="true" />
</template>

<script>
import SampleTable from "../components/SampleTable.vue";

export default {
  props: ["dataset"],
  components: { SampleTable },
};
</script>
