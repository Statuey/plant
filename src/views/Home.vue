<template>
  <div class="container">
      <h2>上传图片识别植物！</h2>
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
      <div class="imagePanel">
        <img :src="imageUrl" width="300"/>
      </div>
      
      <v-btn
        id="confirm"
        color="blue-grey"
        class="ma-2 white--text"
        @click="identify"
      >
        上传识别
        <v-icon right dark> mdi-cloud-upload </v-icon>
      </v-btn>
      <v-alert type="success" color="#91c788" v-if="state">上传成功</v-alert>
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
  margin: 10px auto;
  height: 30px;
  transition: 0.2s linear;
}

.panel{
  width: 50%;
  float: left;
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
}
</style>