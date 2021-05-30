<template>
  <div class="mb-4">
    <div class="field has-addons">
      <div class="control">
        <a class="button is-static">视图</a>
      </div>
      <div class="control">
        <div class="select">
          <select v-model="mode">
            <option value="table">表格</option>
            <option value="icon">预览</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div v-if="mode === 'table'" class="box">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>
            文件名
            <p class="has-text-grey-light is-size-7 has-text-weight-normal">原始文件名</p>
          </th>
          <th v-for="label in dataset.labels" :key="label.labelId">
            {{ label.labelName }}
            <p class="has-text-grey-light is-size-7 has-text-weight-normal">{{ label.description }}</p>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sample, index) in samples" :key="sample.id">
          <td>
            <div v-if="isImage(sample.mimetype)" class="dropdown is-hoverable">
              <div class="dropdown-trigger filename">{{ sample.originalFilename }}</div>
              <div class="dropdown-menu preview">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <img class="image" :src="`/api/files/${sample.file}`" alt="preview" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="filename">{{ sample.originalFilename }}</div>
          </td>
          <td
            v-for="label in dataset.labels"
            :key="label.labelId"
          >{{ sample.labels[label.labelId] }}</td>
          <td class="actions">
            <div class="buttons has-addons is-right">
              <a
                :href="`/api/files/${sample.file}`"
                download
                class="is-small button is-light is-link"
              >下载</a>
              <span
                @click="deleteSample(sample.id, index)"
                class="is-small button is-light is-danger"
                v-if="isManager"
              >删除</span>
              <span
                v-if="unchecked && isManager"
                @click="check(sample.id, index)"
                class="is-small button is-light is-success"
              >审核通过</span>
            </div>
          </td>
        </tr>
        <tr v-if="samples.length === 0">
          <td>
            <span class="has-text-grey-light">暂时没有数据</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="mode === 'icon'" class="box icon-view">
    <span v-if="samples.length === 0" class="has-text-grey-light">暂时没有数据</span>
    <FileIcon
      v-for="sample in samples"
      :key="sample.id"
      :filename="sample.originalFilename"
      :url="`/api/files/${sample.file}`"
      :mimetype="sample.mimetype"
    />
    <div class="dummy-file"></div>
    <div class="dummy-file"></div>
    <div class="dummy-file"></div>
    <div class="dummy-file"></div>
    <div class="dummy-file"></div>
    <div class="dummy-file"></div>
  </div>
</template>

<script>
import FileIcon from "./FileIcon.vue";
import TagInput from "./TagInput.vue";

export default {
  components: { FileIcon, TagInput },
  props: ["dataset", "unchecked"],
  mounted() {
    let url = `/api/datasets/${this.dataset.id}/samples`;
    if (this.unchecked) {
      url = `/api/datasets/${this.dataset.id}/unchecked_samples`;
    }
    this.$http.get(url).then((res) => {
      this.samples = res.data.results;
    });
  },
  data() {
    return {
      samples: [],
      mode: "table",
      label: "",
      tags: [],
    };
  },
  methods: {
    isImage(mimetype) {
      const [type] = mimetype.split("/");
      return type === "image";
    },
    deleteSample(sampleId, index) {
      this.$http
        .delete(`/api/datasets/${this.dataset.id}/samples/${sampleId}`)
        .then(() => {
          this.samples.splice(index, 1);
        });
    },
    check(sampleId, index) {
      this.$http
        .put(`/api/datasets/${this.dataset.id}/samples/${sampleId}/checked`)
        .then(() => {
          this.samples.splice(index, 1);
        });
    },
  },
  computed: {
    isManager() {
      const user = this.$store.state.user;
      if (!user.id) return false;
      return (
        user.username === this.dataset.creator.username ||
        this.dataset.managers.map(manager => manager.username).includes(user.username)
      );
    },
  }
};
</script>

<style scoped>
td {
  vertical-align: middle;
}
.actions {
  text-align: right;
}
.preview {
  max-width: 200px;
}
.filename {
  cursor: default;
}
.icon-view {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.dummy-file {
  width: 128px;
  height: 0;
}
.small-button {
  margin-left: 1rem;
  cursor: pointer;
  color: #3273dc;
}
.addOp {
  margin-right: 20px;
}
</style>