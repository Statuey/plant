<template>
  <div class="container">
    <div class="form">
      <h1 class="title is-2 has-text-centered">登录</h1>
      <div class="field">
        <label class="label">用户名</label>
        <div class="control">
          <input class="input" type="text" v-model="username" />
        </div>
      </div>

      <div class="field">
        <label class="label">密码</label>
        <div class="control">
          <input class="input" type="password" v-model="password" />
        </div>
      </div>

      <button class="signup-btn button is-primary is-fullwidth" @click="login">
        登录
      </button>
      <div class="warn">
        <div class="notification is-warning" v-if="tips">
          <button class="delete" @click="close"></button>
          <strong>登录失败，请重试 </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      tips: false,
    };
  },
  methods: {
    login() {
      const self = this;
      this.$http
        .post("/api/signin", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("user", self.username);
          self.$http.defaults.headers.common = {
            Authorization: `Bearer ${res.data.accessToken}`,
          };
          this.$store.commit("login", self.username);
          self.$router.push("/dashboard");
        })
        .catch((err) => {
          this.tips = true;
          console.log("error");
        });
    },
    close() {
      this.tips = false;
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
.warn {
  margin-top: 10px;
}
</style>