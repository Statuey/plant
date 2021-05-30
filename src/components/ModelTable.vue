<template>
  <div class="mb-4 level">
    <div class="level-left">
      <div class="level-item">
        <div class="field has-addons is-horizontal">
          <div class="control">
            <a class="button is-static">模型</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="box">
    <div class="table-wrapper">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>
              文件名
              <p class="has-text-grey-light is-size-7 has-text-weight-normal">原始文件名</p>
            </th>
            <th v-for="label in modelset.labels" :key="label.labelId">
              {{ label.labelName }}
              <p
                class="has-text-grey-light is-size-7 has-text-weight-normal"
              >{{ label.description }}</p>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(model, index) in models" :key="model.id">
            <td>
              <div class="filename">{{ model.originalFilename }}</div>
            </td>
            <td
              v-for="label in dataset.labels"
              :key="label.labelId"
            >{{ model.labels[label.labelId] }}</td>
            <td class="actions">
              <div class="buttons has-addons is-right">
                <a
                  :href="`/api/files/${model.file}`"
                  download
                  class="is-small button is-light is-link"
                >下载</a>
                <span
                  @click="deleteModel(model.id, index)"
                  class="is-small button is-light is-danger"
                >删除</span>
              </div>
            </td>
          </tr>
          <tr v-if="models.length === 0">
            <td>
              <span class="has-text-grey-light">暂时没有数据</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modelset"],
  mounted() {
    this.fetchModels()
  },
  data() {
    return {
      filterLabel: null,
      filterLabelValue: undefined,
      models: [],
      label: "",
      tags: [],
    };
  },
  watch: {
    filterLabel(newFilterLabel) {
      if (newFilterLabel) {
        this.filterLabelValue = newFilterLabel.values[0];
      }
      this.fetchModels();
    },
    filterLabelValue() {
      this.fetchModels();
    }
  },
  methods: {
    fetchModels() {
        console.log(this.modelset);
      let url = `/api/modelsets/${this.modelset.id}/models`;
      let params = {}
      if (this.filterLabel) {
        params[this.filterLabel.labelId] = this.filterLabelValue;
      }
      this.$http.get(url, { params }).then((res) => {
        this.models = res.data.results;
      });
    },

    deleteModel(modelId, index) {
      this.$http
        .delete(`/api/modelsets/${this.modelset.id}/models/${modelId}`)
        .then(() => {
          this.models.splice(index, 1);
        });
    },
  },
};
</script>

<style scoped>
td,
th {
  vertical-align: middle;
  min-width: 100px;
}
.actions {
  text-align: right;
  min-width: 200px;
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
.table-wrapper {
  overflow-x: auto;
}
.level-item {
  justify-content: start;
}
</style>