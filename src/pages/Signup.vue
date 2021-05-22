<template>
  <div class="container">
    <div class="form">
      <h1 class="title is-2 has-text-centered">注册账号</h1>
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

      <div class="field">
        <label class="label">重复密码</label>
        <div class="control">
          <input class="input" type="password" v-model="repeatPassword" />
        </div>
      </div>

      <button class="signup-btn button is-primary is-fullwidth" @click="signup">
        注册
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
      repeatPassword: "",
    };
  },
  methods: {
    signup() {
      console.log(this.username, this.password, this.repeatPassword);
      this.$http
        .post("/api/signup", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          this.$router.push("/login");
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