<template>
  <div class="container">
    <div class="text-center">
      <div class="intro">
        <img src="../assets/img/logo1.svg" width="120" alt="" />
        <span id="remind">"上传图片识别植物！"</span>
      </div>
      <div class="upload">
        <label for="choose">
          <span id="label">add an image</span>
        </label>
        <input
          id="choose"
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="getImage"
        />
      </div>
    </div>
    <div class="imagePanel">
      <img :src="imageUrl" width="300" />
    </div>
    <v-btn id="confirm" depressed elevation="4" outlined v-on:click="identify"
      >开始识别</v-btn
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      imageUrl: "",
      imageType: "train",
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#remind {
  font-size: 20px;
  font-weight: bold;
  color: #616161;
}
#label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #9b9b9b;
  margin-top: 17px;
}
#choose {
  display: none;
}
#confirm {
  display: block;
  width: 100px;
  margin: 10px auto;
  height: 30px;
  transition: 0.2s linear;
}

.text-center {
  background-color: #f8f9fa;
  margin: 0px auto;
  margin-top: 80px;
  text-align: center;
  border: solid;
  border-width: 2px;
  border-color: #f4f5f6;
  border-radius: 2ch;
  max-width: 600px;
  height: 400px;
}
.intro {
  margin: 80px auto;
}
.upload {
  height: 60px;
  border: solid;
  border-width: 1px;
  border-color: #f4f5f6;
  margin: 5px;
  background-color: #fff;
  border-radius: 1ch;
  box-shadow: 0 0 4px #616161 inset;
  cursor: pointer;
}
.imagePanel {
  width: 500px;
  margin: auto auto;
  text-align: center;
  background-color: #000;
  display: none;
}
</style>