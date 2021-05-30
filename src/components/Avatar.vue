<template>
  <img :src="avatarUrl" :alt="username" class="image avatar" :class="{ circle: circle }" />
</template>

<script>
import * as jdenticon from "jdenticon";
export default {
  props: ["username", "size", "circle"],
  computed: {
    avatarUrl() {
      const svg = jdenticon.toSvg(this.username, this.size || 48);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      return url;
    },
  },
};
</script>

<style scoped>
.avatar {
  border-radius: 4px;
  display: inline-block;
  border: 1px solid #dbdbdb;
}

.avatar.circle {
  border-radius: 999999px;
}
</style>