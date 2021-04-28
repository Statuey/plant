<template>
  <div>
    <div class="button">
      <button v-on:click="login">登录</button>
    </div>
    <div class="button">
      <button v-on:click="register">注册</button>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
.button {
  text-align: center;
}
</style>