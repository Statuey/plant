<template>
  <div class="mb-4">
    <div class="field has-addons">
      <div class="control"><a class="button is-static">视图</a></div>
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
        <tr v-for="(sample,index) in samples" :key="sample.id">
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
            <a :href="`/api/files/${sample.file}`" download class="item">下载</a>
            <span @click="delSample(sample.id,index)" class="item">删除</span>
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

export default {
  components: { FileIcon },
  props: ["dataset"],
  mounted() {
    const self = this;
    this.$http.get(`/api/datasets/${this.dataset.id}/samples`).then((res) => {
      self.samples = res.data.results;
    });
  },
  data() {
    return { samples: [], mode: "table" };
  },
  methods: {
    isImage(mimetype) {
      const [type] = mimetype.split("/");
      return type === "image";
    },
    delSample(sampleId,index){
      console.log("样本删除成功");
      this.$http.delete(`/api/datasets/${this.dataset.id}/samples/${sampleId}`)
      .then(()=>{
        this.samples.splice(index,1);
      })
    }
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
.icon-view {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.dummy-file {
  width: 128px;
  height: 0;
}

.item{
  margin-right: 20px;
  cursor: pointer;
  color: #3273dc;
}
</style>