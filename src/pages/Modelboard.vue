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
            <h6 class="title is-6 head mb-0">我创建的模型集</h6>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <router-link to="/newmodel">
              <i class="bi bi-plus-circle-fill"></i>
            </router-link>
          </div>
        </div>
      </div>
      <hr />
      <div class="block" v-for="(modelset, index) in modelsets" :key="modelset.id">
        <h1 class="title is-4">
          <span class="name">{{ modelset.name }}</span>
          <div class="buttons">
            <router-link
              class="button is-success is-small is-light"
              :to="`/modelsets/${modelset.id}`"
            >查看</router-link>
            <button
              class="button is-danger is-small is-light"
              @click="preDeleteModelset(modelset, index)"
            >删除</button>
          </div>
        </h1>
        <p class="description">{{ modelset.description }}</p>
        <p class="has-text-grey-light">{{ dateFormat(modelset.date) }}</p>
        <hr />
      </div>
    </div>
  </div>
  <Dialog v-model:open="deleteDialog" title="删除模型集">
    <div class="notification is-warning">输入模型集名称删除该模型集，删除后将没有可能恢复！</div>
    <input
      class="input"
      type="text"
      v-model="deleteModelsetName"
      :placeholder="deleteModelset ? deleteModelset.name : ''"
    />
    <template v-slot:footer>
      <button
        class="button is-danger"
        @click="confirmDeleteModelset(deleteModel.id, deleteModelIndex)"
        :disabled="deleteModel && deleteModelName !== deleteModel.name"
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
    this.$http.get("/api/modelsets", { params: { user } }).then((res) => {
    this.modelsets = res.data.results;
      console.log(res.data);
    });
  },
  data() {
    return {
      modelsets: [],
      user: undefined,
      deleteDialog: false,
      deleteModelset: undefined,
      deleteModelsetIndex: undefined,
      deleteModelsetName: "",
    };
  },
  methods: {
    dateFormat(date) {
      return dayjs(date).fromNow();
    },
    confirmDeleteModelset(setId, index) {
      this.$http.delete(`/api/modelsets/${setId}/del_modelsets`).then(() => {
        this.modelsets.splice(index, 1);
        this.deleteDialog = false;
      });
    },
    preDeleteModelset(modelset, index) {
      this.deleteModelset = modelset;
      this.deleteModelsetIndex = index;
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
      this.deleteModelName = "";
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