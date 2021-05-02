<template>
  <div id="form">
    <div class="login-wrap">
      <h3>登录</h3>
      <p v-show="Tips" class="tips">{{ Tips }}</p>
      <input type="text" placeholder="请输入用户名" v-model="username" />
      <input type="password" placeholder="请输入密码" v-model="password" />
      <button v-on:click="login">登录</button>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      Tips: "",
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const self = this;
      axios
        .post("/api/signin", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("user_ID", this.username);
          axios.defaults.headers.common = { Authorization: `Bearer ${res.data.access_token}` };
          self.$router.push("/home");
        })
        .catch((err) => {
          self.Tips = err.response.data.description;
        });
    },
    ToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
.login-wrap {
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