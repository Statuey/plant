<template>
  <div class="container">
    <div class="form">
      <h1 class="title is-2 has-text-centered">注册</h1>
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
      <div class="warn">
        <div class="notification is-warning" v-if="tips">
          <button class="delete" @click="close"></button>
          <strong>该用户名已存在或不符合要求，请重试！ </strong>
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
      repeatPassword: "",
      tips: false,
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
.warn{
  margin-top: 10px;
}
</style>