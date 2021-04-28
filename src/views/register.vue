<template>
  <div id="form">
    <div class="register-wrap">
      <h3>注册</h3>
      <p v-show="Tips" class="tips">{{ Tips }}</p>
      <input type="text" placeholder="请输入用户名" v-model="newUsername" />
      <input type="password" placeholder="请输入密码" v-model="newPassword" />
      <button v-on:click="register">注册</button>
      <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Tips: "",
      newUsername: "",
      newPassword: "",
    };
  },
  methods: {
    register() {
      const self = this;
      axios
        .post("/api/signup", {
          username: this.newUsername,
          password: this.newPassword,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          self.Tips = err.response.data.description;
        });
    },
    ToLogin() {
      this.$router.push('/login')
    },
  },
};
</script>

<style>
.register-wrap {
  text-align: center;
}
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
button {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border: none;
  background-color: #41b883;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}
span {
  cursor: pointer;
}
span:hover {
  color: #41b883;
}
</style>