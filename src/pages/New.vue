<template>
  <div class="container">
    <div class="form">
      <h1 class="title is-2 has-text-centered">创建数据集</h1>
      <div class="field">
        <label class="label">名字</label>
        <div class="control">
          <input class="input" type="text" v-model="name" />
        </div>
      </div>

      <div class="field">
        <label class="label">简介</label>
        <div class="control">
          <textarea class="textarea" type="text" v-model="description" />
        </div>
      </div>

      <div>
        <label class="label">标签</label>
        <div class="label-inputs">
          <div class="label-input" v-for="labelId in labels" :key="labelId">
            <LabelInput :ref="`label${labelId}`" />
          </div>
        </div>
        <button class="button is-fullwidth" @click="addLabel">添加标签</button>
      </div>

      <button
        class="signup-btn button is-primary is-fullwidth"
        @click="createDataset"
      >
        创建
      </button>
      <router-link
        to="/dashboard"
        class="signup-btn button is-primary is-fullwidth"
      >
        返回
      </router-link>
    </div>
  </div>
</template>

<script>
import LabelInput from "../components/LabelInput.vue";

export default {
  components: {
    LabelInput,
  },
  data() {
    return {
      name: "",
      description: "",
      labels: [],
      lastLabelId: 1,
      flag: true,
    };
  },
  methods: {
    addLabel() {
      this.labels.push(this.lastLabelId++);
    },
    createDataset() {
      const dataset = {
        name: this.name,
        description: this.description,
        labels: [],
      };
      for (let labelId of this.labels) {
        dataset.labels.push(this.$refs[`label${labelId}`].getValue());
      }
      this.$http
        .post("/api/datasets", dataset)
        .then((res) => {
          console.log(res.data);
          this.$router.push("/datasets/"+res.data.id);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
};
</script>


<style scoped>
.signup-btn {
  margin-top: 2rem;
}
.form {
  max-width: 500px;
  margin: 2rem auto 0 auto;
}
.label-input {
  margin-bottom: 1em;
}
</style>