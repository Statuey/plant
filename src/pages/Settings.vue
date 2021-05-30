<template>
  <div class="columns">
    <div class="column is-half">
      <h4 class="title is-4">数据集管理员</h4>
      <hr />
      <div class="panel is-link managers mb-6">
        <p class="panel-heading">管理员</p>
        <div class="panel-block">
          <div class="field has-addons is-flex-grow-1">
            <p class="control has-icons-left is-expanded">
              <input
                class="input is-link"
                type="text"
                placeholder="添加管理员"
                v-model="managerUsername"
              />
              <span class="icon is-left">
                <i class="bi bi-people-fill"></i>
              </span>
            </p>
            <p class="control">
              <button class="button is-link" @click="addManager">添加</button>
            </p>
          </div>
        </div>
        <a v-for="manager in managers" :key="manager" class="panel-block">
          <Avatar :username="manager.username" :circle="true" :size="32" />
          <span class="ml-2 has-text-weight-bold">{{ manager.username }}</span>
        </a>
      </div>
    </div>
    <div class="column is-half" v-if="enumLabels.length">
      <h4 class="title is-4">添加枚举类型标签</h4>
      <hr />
      <div class="form box">
        <div class="field">
          <label class="label">标签名称</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="selectLabel">
                <option
                  v-for="label in enumLabels"
                  :key="label.labelId"
                  :value="label"
                >{{ label.labelName }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">添加枚举值</label>
          <div class="tags mb-0">
            <span class="tag" v-for="tag in selectLabel.values" :key="tag">{{ tag }}</span>
          </div>
          <div class="control">
            <div class="second-row">
              <TagInput placeholder="添加枚举类型" v-model="tags" />
            </div>
          </div>
        </div>

        <button class="signup-btn button is-link mt-4" @click="addEnum">添加</button>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "../components/Avatar.vue";
import TagInput from "../components/TagInput.vue";

export default {
  components: { Avatar, TagInput },
  props: ["dataset"],
  mounted() {
    this.managers = [...this.dataset.managers];
    if (this.enumLabels.length) {
      this.selectLabel = this.enumLabels[0];
    }
  },
  data() {
    return {
      managerUsername: "",
      managers: [],
      tags: [],
      selectLabel: { values: [] },
    };
  },
  methods: {
    addManager() {
      if (!this.managerUsername) return;
      this.$http
        .put(`/api/datasets/${this.dataset.id}/managers`, {
          username: this.managerUsername,
        })
        .then(() => {
          this.managers.push({ username: this.managerUsername });
          this.managerUsername = "";
        })
        .catch(() => {
          alert("该用户不存在!");
        });
    },
    addEnum() {
      this.$http
        .post(
          `/api/datasets/${this.dataset.id}/labels/${this.selectLabel.labelId}`,
          {
            values: this.tags,
          }
        )
        .then((res) => {
          this.$emit("update:dataset", res.data);
          this.tags = [];
          this.selectLabel = res.data.labels.filter((label) => label.type === "enum")[0];
        });
    },
  },
  computed: {
    enumLabels() {
      return this.dataset.labels.filter((label) => label.type === "enum");
    },
  },
};
</script>

<style>
</style>