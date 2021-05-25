<template>
  <div class="container">
    <div class="header title is-4 mt-4">
      <span class="is-flex-grow-1">
        {{ dataset.name }}
      </span>
      <button class="button is-primary" @click="sampleCreateModalOpen = true">
        上传样本
      </button>
      <router-link to="/dashboard"><i class="bi bi-arrow-return-right"></i></router-link>

    </div>
    <hr />
    <SampleTable v-if="dataset.id" :dataset="dataset" />
  </div>

  <!-- 创建样本弹窗 -->
  <div class="modal" :class="{ 'is-active': sampleCreateModalOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">创建样本</p>
        <button class="delete" @click="sampleCreateModalOpen = false"></button>
      </header>
      <section class="modal-card-body">
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
            <span class="file-name">
              {{ sampleCreate.file ? sampleCreate.file.name : "" }}
            </span>
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
                <option
                  v-for="(tag, index) in label.values"
                  :key="index"
                  :value="tag"
                >
                  {{ tag }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="uploadSample">
          确认上传
        </button>
        <button class="button">取消上传</button>
      </footer>
    </div>
  </div>
</template>

<script>
import SampleTable from "../components/SampleTable.vue";
import axios from "axios";

export default {
  components: { SampleTable },
  mounted() {
    const self = this;
    const { datasetId } = this.$route.params;
    this.datasetId = datasetId;
    this.$http.get(`/api/datasets/${datasetId}`).then((res) => {
      self.dataset = res.data;
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
      dataset: {
        name: "",
        labels: [],
      },
      sampleCreateModalOpen: false,
      sampleCreate: {
        file: undefined,
        labels: {},
      },
      datasetId: "",
    };
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
            });
        });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.bi{
  margin-left: 10px;
}
</style>