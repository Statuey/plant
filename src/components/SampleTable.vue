<template>
  <div class="box">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>
            文件名
            <p class="has-text-grey-light is-size-7 has-text-weight-normal">
              原始文件名
            </p>
          </th>
          <th v-for="label in dataset.labels" :key="label.labelId">
            {{ label.labelName }}
            <p class="has-text-grey-light is-size-7 has-text-weight-normal">
              {{ label.description }}
            </p>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sample in samples" :key="sample.id">
          <td>
            <div v-if="isImage(sample.mimetype)" class="dropdown is-hoverable">
              <div class="dropdown-trigger filename">
                {{ sample.originalFilename }}
              </div>
              <div class="dropdown-menu preview">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <img
                      class="image"
                      :src="`/api/files/${sample.file}`"
                      alt="preview"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="filename">
              {{ sample.originalFilename }}
            </div>
          </td>
          <td v-for="label in dataset.labels" :key="label.labelId">
            {{ sample.labels[label.labelId] }}
          </td>
          <td>
            <a :href="`/api/files/${sample.file}`" download>下载</a>
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
</template>

<script>
export default {
  props: ["dataset"],
  mounted() {
    const self = this;
    this.$http.get(`/api/datasets/${this.dataset.id}/samples`).then((res) => {
      self.samples = res.data.results;
    });
  },
  data() {
    return { samples: [] };
  },
  methods: {
    isImage(mimetype) {
      const [type] = mimetype.split("/");
      return type === "image";
    },
  },
};
</script>

<style scoped>
.preview {
  max-width: 200px;
}
.filename {
  cursor: default;
}
</style>