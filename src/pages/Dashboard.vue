<template>
  <div class="container">
    <div class="left">
      <div>
        <div v-html="avatarUrl" class="avatar"></div>
      </div>
      <div class="mt-4">
        <p class="is-size-4 has-text-weight-bold">{{ user }}</p>
      </div>
    </div>
    <div class="right">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h6 class="title is-6 head mb-0">我创建的数据集</h6>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <router-link to="/new">
              <i class="bi bi-plus-circle-fill"></i
            ></router-link>
          </div>
        </div>
      </div>
      <hr />
      <div class="block" v-for="(dataset, index) in datasets" :key="dataset.id">
        <h1 class="title is-4">
          <span class="name">
            {{ dataset.name }}
          </span>
          <router-link
            class="button is-success is-small"
            :to="`/datasets/${dataset.id}`"
            >查看</router-link
          >
          <button
            class="button is-danger is-small"
            @click="deleteDataset(dataset.id, index)"
          >
            删除
          </button>
        </h1>
        <p class="description">{{ dataset.description }}</p>
        <p class="has-text-grey-light">{{ dateFormat(dataset.date) }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import * as jdenticon from "jdenticon";

export default {
  mounted() {
    const user = localStorage.getItem("user");
    this.user = user;
    this.$http.get("/api/datasets", { params: { user } }).then((res) => {
      this.datasets = res.data.results;
    });
  },
  data() {
    return {
      datasets: [],
      user: undefined,
    };
  },
  methods: {
    dateFormat(date) {
      return dayjs(date).fromNow();
    },
    deleteDataset(setId, index) {
      this.$http.delete(`/api/datasets/${setId}/del_datasets`).then(() => {
        this.datasets.splice(index, 1);
      });
    },
  },
  computed: {
    avatarUrl() {
      if (this.user) {
        return jdenticon.toSvg(this.user, 200);
      }
      return "";
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 3rem;
  display: flex;
}

.avatar {
  border-radius: 8px;
  display: inline-block;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border: 1px solid #dbdbdb;
}

.left {
  width: 300px;
}

.right {
  flex: 1;
}

.name {
  flex: 1;
}

.title {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}
.head {
  display: inline-block;
}

.description {
  margin-bottom: 0.6rem;
  padding-right: 65px;
}

.button {
  margin-left: 10px;
}

.bi {
  float: right;
  font-size: 1.5em;
}
</style>