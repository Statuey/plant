<template>
  <div class="root" @click="focus">
    <div class="field is-grouped is-grouped-multiline">
      <div class="control" v-for="(tag, index) in modelValue" :key="Number(index)">
        <span class="tags has-addons">
          <span class="tag is-link label-text">{{ tag }}</span>
          <a class="tag is-delete" @click="deleteTag(index)"></a>
        </span>
      </div>
      <div class="control">
        <input
          ref="text"
          type="text"
          @keydown.enter="addTag"
          @keydown.delete="text === '' && deleteTag(modelValue.length - 1)"
          v-model="text"
          :placeholder="placeholder || ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  props: ["placeholder", "modelValue"],
  methods: {
    addTag() {
      if (this.text) {
        this.$emit("update:modelValue", [...this.modelValue, this.text]);
        this.text = "";
      }
    },
    deleteTag(index) {
      this.modelValue.splice(index, 1);
      this.$emit("update:modelValue", [...this.modelValue]);
    },
    focus() {
      this.$refs.text.focus();
    },
  },
};
</script>

<style scoped>
.root {
  background-color: #fff;
  border: 1px solid transparent;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  cursor: text;
}

.label-text {
  user-select: none;
  cursor: default;
}

input {
  border: none;
  background: none;
  appearance: none;
  outline: none;
  font-size: 1rem;
  min-width: 100px;
}

input::placeholder {
  color: #bdbdbd;
}

input {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>