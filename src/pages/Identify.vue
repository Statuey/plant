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

      <div class="card">
        <footer class="card-footer">
          <p class="card-footer-item">
            <span> 识别图像 </span>
          </p>
          <p class="card-footer-item">
            <span> 病斑识别结果 </span>
          </p>
        </footer>
        <div class="card-content">
          <div class="columns">
            <div class="column is-half">
              <div class="imagePanel">
                <div class="uploadImg">
                  <img :src="imageUrl" v-if="imageUrl" />
                </div>
              </div>
            </div>
            <div class="column is-half">
              <div class="imagePanel">
                <div class="displayImg">
                  <img :src="images[result]" alt="" v-if="result">
                </div>
                <div class="showup" v-if="detective">
                  <h3>识别结果为：</h3>
                  <span class="tag is-success is-large">{{ result }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <footer class="modal-card-foot">
          <div class="btn">
            <div class="select is-success">
              <select>
                <option>模型选择</option>
                <option>模型1</option>
                <option>模型2</option>
                <option>模型3</option>
              </select>
            </div>
            <button class="button" @click="identify">
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
import img0 from "../../assets/img/0.jpg" 
import img1 from "../../assets/img/1.jpg" 
import img2 from "../../assets/img/2.jpg" 
import img3 from "../../assets/img/3.jpg" 
import img4 from "../../assets/img/4.jpg" 
import img5 from "../../assets/img/5.jpg" 
import img6 from "../../assets/img/6.jpg" 
import img7 from "../../assets/img/7.jpg" 
import img8 from "../../assets/img/8.jpg" 
import img9 from "../../assets/img/9.jpg" 

export default {
  data() {
    return {
      imageUrl: "",
      imageType: "train",
      state: false,
      detective: false,
      result: "",
      images:[
        img0,img1,img2,img3,img4,img5,img6,img7,img8,img9
      ]
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
      this.result="";
    },
  },
};
</script>

<style scoped>
.showup {
  margin: 20px;
  margin-right: 10rem;
  display: block;
  text-align: right;
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
  height: 250px;
  width: 250px;
  margin: 20px auto;
  display: block;
  background-color: #f1f1f1;
}

.displayImg{
  border: solid;
  border-width: 1px;
  border-color: #f4f5f6;
  height: 250px;
  width: 250px;
  margin: 20px auto;
  display: block;
  background-color: #f1f1f1;
}
.btn {
  margin: 10px auto;
}

.select {
  margin: 0px 30px;
}

.button {
  margin: 0px 30px;
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