<template>
  <div class="root">
    <div class="icon-wrapper">
      <a v-if="isImage(mimetype)" class="icon-box" :href="url" target="_blank">
        <img :src="url" class="image box preview" />
      </a>
      <div v-else class="icon-box">
        <a class="file-icon box has-text-grey" :href="url" target="_blank">
          <span>
            {{ fileType }}
          </span>
        </a>
      </div>
    </div>
    <input class="filename" type="text" :value="filename" readonly />
  </div>
</template>

<script>
export default {
  props: ["filename", "url", "mimetype"],
  methods: {
    isImage(mimetype) {
      const [type] = mimetype.split("/");
      return type === "image";
    },
  },
  computed: {
    fileType() {
      return this.mimetype.split("/")[1];
    },
  },
};
</script>

<style scoped>
.root {
  display: inline-block;
  margin: 5px;
}
.icon-box {
  width: 128px;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.preview {
  padding: 5px;
  max-height: 100%;
  max-width: 100%;
  cursor: pointer;
}
.file-icon {
  width: 80px;
  height: 100px;
  margin: 0;
  cursor: pointer;
}
.filename {
  width: 128px;
  word-break: break-all;
  padding: 0 5px;
  outline: none;
  border: none;
  appearance: none;
  text-align: center;
}
.icon-wrapper {
  user-select: none;
}
</style>