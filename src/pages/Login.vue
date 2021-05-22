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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
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
          console.log(res.data);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("user", self.username);
          self.$http.defaults.headers.common = {
            Authorization: `Bearer ${res.data.accessToken}`,
          };
          self.$router.push("/dashboard");
        })
        .catch((err) => {});
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
</style>