<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ dataset.name }}</p>
    </header>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <div v-html="avatarUrl" class="avatar"></div>
        </div>
        <div class="media-content">
          <p class="title is-5">{{ dataset.creator.username }}</p>
          <p class="subtitle is-6">创建者</p>
        </div>
      </div>
      <div class="content">
        {{ dataset.description }}
      </div>
      <div class="has-text-grey">{{ date }}</div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <router-link :to="`/datasets/${dataset.id}`">查看数据集</router-link>
      </p>
    </footer>
  </div>
</template>

<script>
import dayjs from "dayjs";
import * as jdenticon from "jdenticon";

export default {
  props: ["dataset"],
  computed: {
    avatarUrl() {
      if (this.dataset.creator.username) {
        return jdenticon.toSvg(this.dataset.creator.username, 48);
      }
      return "";
    },
    date() {
      return dayjs(this.dataset.date).fromNow();
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