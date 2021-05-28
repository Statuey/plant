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
      <div>
        <button
          v-if="unchecked == true"
          class="button is-success is-primary"
          @click="showOperator = true"
        >
          添加协作者
        </button>
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
          <th>
            <span @click="showEnum = true" class="small-button"
              >添加枚举类型</span
            >
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sample, index) in samples" :key="sample.id">
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
            <a :href="`/api/files/${sample.file}`" download class="item"
              >下载</a
            >
            <span @click="deleteSample(sample.id, index)" class="small-button"
              >删除</span
            >
            <span
              v-if="unchecked"
              @click="check(sample.id, index)"
              class="small-button"
              >审核通过</span
            >
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
    <span v-if="samples.length === 0" class="has-text-grey-light"
      >暂时没有数据</span
    >
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

  <div>
    <div>
      <h2>当前所有管理者</h2>
    </div>
    <div>
      <th v-for="manager in dataset.managers" :key="manager">
        {{ manager }}
      </th>
    </div>
  </div>
  <!-- 创建管理员弹窗 -->
  <div class="modal" :class="{ 'is-active': showOperator }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">添加审核协作者</p>
        <button class="delete" @click="showOperator = false"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <span>用户名</span>
          <div class="control">
            <input class="input" type="text" v-model="username" />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addOperator">确认</button>
        <button class="button" @click="showOperator = false">取消</button>
      </footer>
    </div>
  </div>

  <!-- 添加枚举类型弹窗 -->
  <div class="modal" :class="{ 'is-active': showEnum }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">添加枚举类型</p>
        <button class="delete" @click="showEnum = false"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <span>标签名称</span>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="label">
                <option
                  v-for="label in dataset.labels"
                  :key="label.labelId"
                  :value="label"
                >
                  {{ label.labelName }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="field" v-if="label.type === 'enum'">
          <span>添加枚举值</span>
          <div class="control">
            <div class="second-row">
              <TagInput placeholder="添加枚举类型" v-model="tags" />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="notification is-info is-light">
            <button class="delete" @click="showEnum = false"></button>
            请选择枚举类型标签
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addEnumtype">确认</button>
        <button class="button" @click="showEnum = false">取消</button>
      </footer>
    </div>
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
      showOperator: false,
      username: "",
      showEnum: false,
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
    addOperator() {
      this.$http
        .put(`/api/datasets/${this.dataset.id}/managers`, {
          username: this.username,
        })
        .then((res) => {
          console.log(res);
          alert("添加成功");
        })
        .catch((err) => {
          alert("该账户不存在!");
        });
    },
    addEnumtype() {
      this.$http
      .post(`/api/datasets/${this.dataset.id}/labels/${this.label.labelId}`,{
        values:this.tags
      })
      .then((res)=>{
        console.log(res);
        alert("添加成功")
      })
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