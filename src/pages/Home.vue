<template>
  <div>
    <img :src="cover" alt="" />
  </div>
</template>
<script>
import cover from "../assets/cover.jpg";
export default {
  data() {
    return {
      cover,
    };
  },
};
</script>

<style scoped>
</style>