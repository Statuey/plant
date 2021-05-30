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
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <h6 class="title is-6 head mb-0">我创建的数据集</h6>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <router-link to="/new">
              <i class="bi bi-plus-circle-fill"></i>
            </router-link>
          </div>
        </div>
      </div>
      <hr />
      <div class="block" v-for="(dataset, index) in datasets" :key="dataset.id">
        <h1 class="title is-4">
          <span class="name">{{ dataset.name }}</span>
          <div class="buttons">
            <router-link
              class="button is-success is-small is-light"
              :to="`/datasets/${dataset.id}`"
            >查看</router-link>
            <button
              class="button is-danger is-small is-light"
              @click="preDeleteDataset(dataset, index)"
            >删除</button>
          </div>
        </h1>
        <p class="description">{{ dataset.description }}</p>
        <p class="has-text-grey-light">{{ dateFormat(dataset.date) }}</p>
        <hr />
      </div>
    </div>
  </div>
  <Dialog v-model:open="deleteDialog" title="删除数据集">
    <div class="notification is-warning">输入数据集名称删除该数据集，删除后将没有可能恢复，数据集下的所有样本都会被删除！</div>
    <input
      class="input"
      type="text"
      v-model="deleteDatasetName"
      :placeholder="deleteDataset ? deleteDataset.name : ''"
    />
    <template v-slot:footer>
      <button
        class="button is-danger"
        @click="confirmDeleteDataset(deleteDataset.id, deleteDatasetIndex)"
        :disabled="deleteDataset && deleteDatasetName !== deleteDataset.name"
      >删除</button>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "../components/Dialog.vue";
import dayjs from "dayjs";
import * as jdenticon from "jdenticon";

export default {
  components: { Dialog },
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
      deleteDialog: false,
      deleteDataset: undefined,
      deleteDatasetIndex: undefined,
      deleteDatasetName: "",
    };
  },
  methods: {
    dateFormat(date) {
      return dayjs(date).fromNow();
    },
    confirmDeleteDataset(setId, index) {
      this.$http.delete(`/api/datasets/${setId}/del_datasets`).then(() => {
        this.datasets.splice(index, 1);
        this.deleteDialog = false;
      });
    },
    preDeleteDataset(dataset, index) {
      this.deleteDataset = dataset;
      this.deleteDatasetIndex = index;
      this.deleteDialog = true;
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
  watch: {
    deleteDialog() {
      this.deleteDatasetName = "";
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

@media screen and (max-width: 1023px) {
  .left {
    display: none;
  }
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

.bi {
  float: right;
  font-size: 1.5em;
}
</style>