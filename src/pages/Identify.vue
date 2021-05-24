<template>
  <div>
    <div>
      <section class="hero is-primary">
        <div class="hero-body">
          <p class="title">病害识别</p>
          <p class="subtitle">上传图片识别植物病害</p>
        </div>
      </section>
    </div>
    <div class="container">
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

      <div>
        <div class="columns">
          <div class="column is-half">
            <div class="imagePanel">
              <div class="uploadImg">
                <img :src="imageUrl" width="320" v-if="imageUrl" />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="showup" v-if="detective">
              <h3>识别结果为：</h3>
              <span class="tag is-success is-large">{{ result }}</span>
            </div>
          </div>
        </div>
        <footer class="modal-card-foot">
          <div class="btn">
            <button class="button is-success" @click="identify">
              开始识别
            </button>
            <button class="button" @click="cancel">取消</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      imageType: "train",
      state: false,
      detective: false,
      result: "",
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
      this.$http
        .post("/api/upload_test_img", param, config)
        .then((res) => {
          console.log(res.data);
          this.result = res.data.result;
          this.detective = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.imageUrl = "";
      this.detective = false;
    },
  },
};
</script>

<style scoped>
.showup {
  margin: 20px;
  display: block;
}
.upload {
  height: 80px;
  width: 70%;
  border: solid;
  border-width: 1px;
  border-color: #f4f5f6;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 1ch;
  box-shadow: 0 0 4px #616161 inset;
  cursor: pointer;
}

.uploadImg {
  border: solid;
  border-width: 1px;
  border-color: #f4f5f6;
  height: 240px;
  width: 320px;
  margin: 20px auto;
  display: block;
  background-color: #f1f1f1;
}
.btn{
  margin: 10px auto;
}
#choose {
  display: none;
}
#label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #9b9b9b;
  margin-top: 25px;
  text-align: center;
}
</style>