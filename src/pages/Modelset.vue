<template>
  <div class="container">
    <div class="mt-4 mb-4 level">
      <div class="level-left">
        <div class="level-item">
          <span class="title is-4 mb-0">
            <span class="tag is-large is-link is-light">
              {{ modelset.creator.username }}
            </span>
            /
            <span class="tag is-large is-primary is-light">{{
              modelset.name
            }}</span>
          </span>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button is-primary" @click="preUploadModel">
            上传模型
          </button>
        </div>
      </div>
    </div>
    <ModelTable v-if="modelset.id" :modelset="modelset" :unchecked="false" />
  </div>
  <Dialog title="" v-model:open="modelCreateModelOpen">
    <div class="file has-name is-fullwidth mb-3">
      <label class="file-label">
        <input
          class="file-input"
          type="file"
          name="resume"
          @change="fileChange"
        />
        <span class="file-cta">
          <span class="file-icon">
            <i class="bi bi-upload"></i>
          </span>
          <span class="file-label">选择文件</span>
        </span>
        <span class="file-name">{{
          modelCreate.file ? modelCreate.file.name : ""
        }}</span>
      </label>
    </div>

    <div class="field" v-for="label in modelset.labels" :key="label.labelId">
      <label class="label">{{ label.labelName }}</label>
      <div class="field is-grouped" v-if="label.type === 'number'">
        <div class="control" v-if="label.minNum">
          <div class="tags has-addons">
            <span class="tag is-dark">最小值</span>
            <span class="tag is-info">{{ label.minNum }}</span>
          </div>
        </div>
        <div class="control" v-if="label.maxNum">
          <div class="tags has-addons">
            <span class="tag is-dark">最大值</span>
            <span class="tag is-info">{{ label.maxNum }}</span>
          </div>
        </div>
      </div>
      <div class="control">
        <input
          v-if="label.type === 'number'"
          class="input"
          type="text"
          v-model="modelCreate.labels[label.labelId]"
        />
        <div class="select is-fullwidth" v-if="label.type === 'enum'">
          <select v-model="modelCreate.labels[label.labelId]">
            <option
              v-for="(tag, index) in label.values"
              :key="Number(index)"
              :value="tag"
            >
              {{ tag }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <button class="button is-success" @click="uploadModel">确认上传</button>
      <button class="button">取消上传</button>
    </template>
  </Dialog>
</template>

<script>
import ModelTable from "../components/ModelTable.vue";
import Dialog from "../components/Dialog.vue";
import axios from "axios";

export default {
  components: { ModelTable, Dialog },
  data() {
    return {
      modelset: {
        id: undefined,
      },
    };
  },
  mounted() {
    const self = this;
    const { modelsetId } = this.$route.params;
    this.modelsetId = modelsetId;

    this.$http.get(`/api/modelsets/${modelsetId}`).then((res) => {
      self.modelset = res.data;
      console.log(self.modelset);
      for (let label of res.data.labels) {
        if (label.type === "enum") {
          self.modelCreate.labels[label.labelId] = label.values[0];
        } else {
          self.modelCreate.labels[label.labelId] = "";
        }
      }
    });
  },
  data() {
    return {
      refresh: 0,
      modelset: {
        id: undefined,
        name: "",
        labels: [],
        creator: {
          username: "",
        },
      },
      modelCreateModelOpen: false,
      modelCreate: {
        file: undefined,
        labels: {},
      },
      modelsetId: "",
      activeTab: 0,
      tabs: [],
    };
  },
  methods: {
    fileChange(e) {
      if (e.target.files.length > 0) {
        this.modelCreate.file = e.target.files[0];
      } else {
        this.modelCreate.file = undefined;
      }
    },
    uploadModel() {
      console.log(this.modelCreate.file);
      const formData = new FormData();
      formData.append("file", this.modelCreate.file);
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
            .post(`/api/modelsets/${this.modelsetId}/models`, {
              file: filename,
              labels: self.modelCreate.labels,
              originalFilename: self.modelCreate.file.name,
              mimetype: mimetype,
            })
            .then(() => {
              self.modelCreateModalOpen = false;
              self.modelCreate.file = undefined;
              self.modelCreate.labels = {};
              self.refresh++;
            });
        });
    },
    preUploadModel() {
      if (!this.$store.state.user.id) {
        this.$router.push("/login");
      } else {
        this.modelCreateModelOpen = true;
      }
    },
  },
};
</script>

<style scoped>
.bi {
  margin-left: 10px;
}
.level-item {
  justify-content: start;
}
</style>