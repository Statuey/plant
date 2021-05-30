<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ modelset.name }}</p>
    </header>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <div v-html="avatarUrl" class="avatar"></div>
        </div>
        <div class="media-content">
          <p class="title is-5">{{ modelset.creator.username }}</p>
          <p class="subtitle is-6">创建者</p>
        </div>
      </div>
      <div class="content">
        {{ modelset.description }}
      </div>
      <div class="has-text-grey">{{ date }}</div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <router-link :to="`/modelsets/${modelset.id}`">查看模型集</router-link>
      </p>
    </footer>
  </div>
</template>

<script>
import dayjs from "dayjs";
import * as jdenticon from "jdenticon";

export default {
  props: ["modelset"],
  computed: {
    avatarUrl() {
      if (this.modelset.creator.username) {
        return jdenticon.toSvg(this.modelset.creator.username, 48);
      }
      return "";
    },
    date() {
      return dayjs(this.modelset.date).fromNow();
    },
  },
};
</script>

<style scoped>
.avatar {
  border-radius: 4px;
  display: inline-block;
  width: 48px;
  height: 48px;
  overflow: hidden;
  border: 1px solid #dbdbdb;
}
.content {
  overflow: hidden;
  height: 3em;
}

.card-content {
  padding: 1rem;
}
</style>