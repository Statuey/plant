<template>
  <div class="container">
    <div class="header mt-4 mb-4">
      <span class="is-flex-grow-1 title is-4 mb-0">
        <span class="tag is-large is-link is-light">
          {{
            dataset.creator.username
          }}
        </span>
        /
        <span class="tag is-large is-primary is-light">{{ dataset.name }}</span>
      </span>
      <div class="buttons">
        <button class="button is-primary" @click="preUploadSample">上传样本</button>
      </div>
    </div>
    <div class="tabs">
      <ul>
        <router-link
          v-for="tab in tabs"
          :key="tab.name"
          custom
          :to="tab.to"
          v-slot="{ href, isExactActive, navigate }"
        >
          <li :class="{ 'is-active': isExactActive }" v-if="tab.show">
            <a :href="href" @click="navigate">{{ tab.name }}</a>
          </li>
        </router-link>
      </ul>
    </div>
    <router-view v-if="dataset.id" v-model:dataset="dataset" :key="refresh"></router-view>
  </div>
  <!-- 创建样本弹窗 -->
  <Dialog title="创建样本" v-model:open="sampleCreateModalOpen">
    <div class="file has-name is-fullwidth mb-3">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" @change="fileChange" />
        <span class="file-cta">
          <span class="file-icon">
            <i class="bi bi-upload"></i>
          </span>
          <span class="file-label">选择文件</span>
        </span>
        <span class="file-name">{{ sampleCreate.file ? sampleCreate.file.name : "" }}</span>
      </label>
    </div>

    <div class="field" v-for="label in dataset.labels" :key="label.labelId">
      <label class="label">{{ label.labelName }}</label>
      <div class="control">
        <input
          v-if="label.type === 'number'"
          class="input"
          type="text"
          v-model="sampleCreate.labels[label.labelId]"
        />
        <div class="select is-fullwidth" v-if="label.type === 'enum'">
          <select v-model="sampleCreate.labels[label.labelId]">
            <option v-for="(tag, index) in label.values" :key="Number(index)" :value="tag">{{ tag }}</option>
          </select>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <button class="button is-success" @click="uploadSample">确认上传</button>
      <button class="button">取消上传</button>
    </template>
  </Dialog>
</template>

<script>
import SampleTable from "../components/SampleTable.vue";
import Dialog from "../components/Dialog.vue";
import axios from "axios";

export default {
  components: { SampleTable, Dialog },
  mounted() {
    const self = this;
    const { datasetId } = this.$route.params;
    this.datasetId = datasetId;

    this.$http.get(`/api/datasets/${datasetId}`).then((res) => {
      self.dataset = res.data;
      self.tabs = [
        {
          name: "样本列表",
          to: `/datasets/${datasetId}`,
          show: true,
        },
        {
          name: "审核列表",
          to: `/datasets/${datasetId}/unchecked`,
          show: true,
        },
        {
          name: "数据集设置",
          to: `/datasets/${datasetId}/settings`,
          show: this.isCreator,
        },
      ];
      for (let label of res.data.labels) {
        if (label.type === "enum") {
          self.sampleCreate.labels[label.labelId] = label.values[0];
        } else {
          self.sampleCreate.labels[label.labelId] = "";
        }
      }
    });
  },
  data() {
    return {
      refresh: 0,
      dataset: {
        id: undefined,
        name: "",
        labels: [],
        creator: {
          username: "",
        },
      },
      sampleCreateModalOpen: false,
      sampleCreate: {
        file: undefined,
        labels: {},
      },
      datasetId: "",
      activeTab: 0,
      tabs: [],
    };
  },
  computed: {
    isManager() {
      if (!this.dataset.id) return false;
      const user = this.$store.state.user;
      if (!user.id) return false;
      return (
        user.username === this.dataset.creator.username ||
        this.dataset.managers.map(manager => manager.username).includes(user.username)
      );
    },
    isCreator() {
      if (!this.dataset.id) return false;
      const user = this.$store.state.user;
      if (!user.id) return false;
      return user.username === this.dataset.creator.username;
    }
  },
  methods: {
    fileChange(e) {
      if (e.target.files.length > 0) {
        this.sampleCreate.file = e.target.files[0];
      } else {
        this.sampleCreate.file = undefined;
      }
    },
    uploadSample() {
      console.log(this.sampleCreate.file);
      const formData = new FormData();
      formData.append("file", this.sampleCreate.file);
      this.$http
        .post(`/api/files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          transformRequest: [...axios.defaults.transformRequest],
        })
        .then((res) => {
          const self = this;
          const filename = res.data.filename;
          const mimetype = res.data.mimetype;
          this.$http
            .post(`/api/datasets/${this.datasetId}/samples`, {
              file: filename,
              labels: self.sampleCreate.labels,
              originalFilename: self.sampleCreate.file.name,
              mimetype: mimetype,
            })
            .then(() => {
              self.sampleCreateModalOpen = false;
              self.sampleCreate.file = undefined;
              self.sampleCreate.labels = {};
              self.refresh++;
            });
        });
    },
    preUploadSample() {
      if (!this.$store.state.user.id) {
        this.$router.push("/login");
      } else {
        this.sampleCreateModalOpen = true;
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.bi {
  margin-left: 10px;
}
</style>