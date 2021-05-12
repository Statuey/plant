<template>
  <div>
    <div class="choose">
      <span>病害种类：</span>
      <select v-model="type">
        <option disabled value="">请选择病害种类</option>
        <option :value="0">Tomato___Early_blight</option>
        <option :value="1">Tomato___healthy</option>
        <option :value="2">Tomato___Bacterial_spothealthy</option>
        <option :value="3">Tomato___Late_blight</option>
        <option :value="4">Tomato___Leaf_Mold</option>
        <option :value="5">Tomato___Septoria_leaf_spot</option>
        <option :value="6">
          Tomato___Spider_mites Two-spotted_spider_mite
        </option>
        <option :value="7">Tomato___Target_Spot</option>
        <option :value="8">Tomato___Tomato_mosaic_virus Tomato___</option>
        <option :value="9">Tomato_Yellow_Leaf_Curl_Virus</option>
      </select>
      <span>{{ type }}</span>
    </div>
    <div class="pictureFrame">
      <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        :options="dropzoneOptions"
        v-on:vdropzone-sending="onSend"
        v-on:vdropzone-success="onSuccess"
      ></vue-dropzone>
      <div class="confirm">
        <v-btn
          id="confirm"
          color="blue-grey"
          class="ma-2 white--text"
          @click="identify"
        >
          上传识别
          <v-icon right dark> mdi-cloud-upload </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";

export default {
  data() {
    return {
      type: "",
      imageUrl: "",
      imageType: "train",
      dropzoneOptions: {
        url: "/api/image/upload",
        thumbnailWidth: 150,
        maxFilesize: 10,
        headers: { "My-Awesome-Header": "header value" },
      },
      uploadedImages: [],
    };
  },
  components: {
    vueDropzone: vue2Dropzone,
  },
  methods: {
    identify() {
      if (!this.type) {
        return;
      }
      const requestList = [];
      for (let uuid of this.uploadedImages) {
        requestList.push(
          axios.post("/api/images/train_test/upload", {
            image_type: "train",
            train_type: "identify",
            mask_type: "-1",
            tag: this.type,
            image_uuid: uuid,
          })
        );
      }
      Promise.all(requestList).then((results) => {
        console.log(`${results.length}个样本上传成功！`);
      });
    },
    onSend(file, xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
      );
    },
    onSuccess(file, response) {
      this.uploadedImages.push(response.url.replace("/images/", ""));
    },
  },
};
</script>

<style scoped>
#choose {
  display: none;
}
.upload {
  height: 1000px;
  border: solid;
  border-width: 1px;
  border-color: #f4f5f6;
  margin: 5px;
  background-color: #fff;
  border-radius: 1ch;
  box-shadow: 0 0 4px #616161 inset;
  cursor: pointer;
}
.confirm {
  display: inline;
}
.choose {
  display: inline;
}
</style>