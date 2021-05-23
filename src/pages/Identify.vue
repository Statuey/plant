<template>
  <div>
    <div>
      <section class="hero is-primary">
        <div class="hero-body">
          <p class="title">植物识别</p>
          <p class="subtitle">上传图片识别图片</p>
        </div>
      </section>
    </div>
    <div class="container">
      <div class="file has-name is-fullwidth mb-3">
        <label class="file-label">
        <input
          class="file-input"
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="getImage"
        />
        <span class="file-cta">
          <span class="file-icon">
            <i class="bi bi-upload"></i>
          </span>
          <span class="file-label">选择文件</span>
        </span>
        </label>
      </div>

      <div class="imagePanel">
        <img :src="imageUrl" width="300" />
      </div>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="identify">确认上传</button>
        <button class="button">取消上传</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      imageUrl: "",
      imageType: "train",
      state: false,
    };
  },
  methods: {
    getImage(event) {
      const self = this;
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid image!"); //判断图片是否有效
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        self.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      fileReader.onload = function () {
        self.imageUrl = this.result;
      };
    },
    identify(e) {
      e.preventDefault();
      let param = new FormData(); //创建form对象
      param.append("file", this.image); //通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      }; //添加请求头
      axios
        .post("/api/image/upload", param, config)
        .then((res) => {
          console.log(res.data.url);
          this.state = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>