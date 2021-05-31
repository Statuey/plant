<template>
  <section class="hero is-link">
    <div class="hero-body">
      <p class="title logo-text">Identification</p>
      <p class="subtitle">上传图片识别植物病害</p>
    </div>
  </section>
  <div class="container mt-4">
    <div class="field has-addons">
      <div class="control">
        <div class="select">
          <select>
            <option>69.pth</option>
            <option>模型1</option>
            <option>模型2</option>
            <option>模型3</option>
          </select>
        </div>
      </div>
      <div class="control">
        <button class="button" @click="cancel">重置</button>
      </div>
      <div  class="control">
        <button class="button is-primary" @click="identify">开始识别</button>
      </div>
    </div>
    <div class="box">
      <div class="columns">
        <div class="column is-half">
          <div class="upload">
            <div v-if="file" class="image-wrapper">
              <img v-if="fileURL" :src="fileURL" class="box image" />
              <div v-else>
                <div class="file-icon box">
                  <span class="is-size-4 has-text-grey">File</span>
                </div>
                <input class="filename" type="text" :value="file.name" readonly />
              </div>
            </div>
            <div v-else class="button-wrapper">
              <input
                type="file"
                id="file"
                hidden
                @change="fileChange"
                accept="image/png, image/jpeg"
              />
              <label for="file" class="button">点击上传测试样本</label>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <table
            class="result table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            v-if="result"
          >
            <thead>
              <tr>
                <th>标签号</th>
                <th>标签</th>
                <th>可能性</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in result" :key="row[0]">
                <td class="is-family-monospace">{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
                <td class="is-family-monospace">{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileIcon from "../components/FileIcon.vue";

export default {
  components: { FileIcon },
  data() {
    return {
      result: undefined,
      file: undefined,
      fileURL: "",
    };
  },
  methods: {
    fileChange(e) {
      if (e.target.files.length > 0) {
        this.file = e.target.files[0];
        if (this.isImage) {
          this.fileURL = URL.createObjectURL(this.file);
        } else {
          this.fileURL = "";
        }
      } else {
        this.sampleCreate.file = undefined;
      }
    },

    identify() {
      const formData = new FormData();
      formData.append("file", this.file);
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      this.$http
        .post("/api/upload_test_img", formData, config)
        .then((res) => {
          this.result = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.file = undefined;
      this.result = undefined;
    },
  },
  computed: {
    isImage() {
      if (!file) return false;
      const mimetype = this.file.type;
      const [type] = mimetype.split("/");
      return type === "image";
    },
  },
};
</script>

<style scoped>
.upload {
  display: block;
  width: 100%;
  height: 300px;
  align-items: center;
  border: 2px dashed #dddddd;
  border-radius: 5px;
  padding: 1rem;
}

.result {
  height: 300px;
  display: block;
  overflow: auto;
}

.image-wrapper,
.button-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  padding: 10px;
  max-width: 100%;
  max-height: 100%;
}

.file-icon {
  width: 128px;
  height: 180px;
  margin: 0;
  border-radius: 5px;
}
.filename {
  margin-top: 1rem;
  width: 128px;
  word-break: break-all;
  padding: 0 5px;
  outline: none;
  border: none;
  appearance: none;
  text-align: center;
}
</style>