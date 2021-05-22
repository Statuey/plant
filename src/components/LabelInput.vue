<template>
  <div class="first-row">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <input
            class="input"
            type="text"
            placeholder="标签名称"
            v-model="labelName"
          />
        </div>
        <div class="level-item">
          <input
            class="input"
            type="description"
            placeholder="标签描述"
            v-model="description"
          />
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="select">
            <select v-model="type">
              <option value="number">数值</option>
              <option value="enum">枚举</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="second-row" v-if="type === 'enum'">
    <TagInput placeholder="添加枚举类型" v-model="tags" />
  </div>
  <div class="second-row" v-if="type === 'number'">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <input
            type="text"
            class="input"
            placeholder="最小值"
            v-model="minNum"
          />
        </div>
        <div class="level-item">
          <input
            type="text"
            class="input"
            placeholder="最大值"
            v-model="maxNum"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagInput from "./TagInput.vue";

export default {
  components: {
    TagInput,
  },
  data() {
    return {
      labelName: "",
      description: "",
      type: "enum",
      tags: [],
      minNum: "",
      maxNum: "",
    };
  },
  methods: {
    getValue() {
      if (this.type === "enum") {
        return {
          labelName: this.labelName,
          description: this.description,
          type: this.type,
          values: [...this.tags],
        };
      } else {
        return {
          labelName: this.labelName,
          description: this.description,
          type: this.type,
          minNum: this.minNum,
          maxNum: this.maxNum,
        };
      }
    },
  },
};
</script>

<style scoped>
.second-row {
  margin-top: 0.5rem;
}
</style>