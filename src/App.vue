<template>
  <div id="app">
    <div class="navbar">
      <div class="logo">
        <router-link to="/">
          <img src="./assets/img/logo1.svg" width="60" alt="" />
        </router-link>
      </div>
      <div class="rightPanel" v-if="visitor">
        <div class="form1" @click="login">
          <a href="">登录</a>
        </div>
        <div class="form1" @click="register">
          <a href="">注册</a>
        </div>
      </div>
      <div class="rightPanel" v-else>
        <div class="form1">
          <span v-show="NAME">你好！用户 {{ NAME }}</span>
        </div>
        <div class="form1" @click="signout">
          <a href="">退出</a>
        </div>
      </div>
    </div>
    <div class="container"><router-view></router-view></div>
    <div class="footer"><Footer></Footer></div>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    Footer,
  },
  data() {
    return {
      visitor: true,
      NAME: "",
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    signout() {
      localStorage.removeItem("access_token");
      this.visitor = true;
      this.$router.push("/");
      console.log("注销成功！");
    },
    isVisitor() {
      var item = localStorage.getItem("user_ID");
      if (localStorage.getItem("access_token")) {
        this.visitor = false;
        this.NAME = item;
      }
      return this.visitor;
    },
  },
  watch: {
    $route: "isVisitor",
  },
  mounted() {
    if (localStorage.getItem("access_token")) {
      axios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem("access_token")}` };
      this.visitor = false;
      this.NAME=localStorage.getItem("user_ID");
    } else {
      this.visitor = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #f8f9fa;
  height: 60px;
  display: block;
  text-align: center;
  border-bottom: solid;
  border-width: 1px;
  border-color: #dee2e6;
  margin: 0 0;
  padding: 0 0;
}

.navbar .logo {
  display: inline;
  height: 40px;
  padding-top: 12px;
  min-width: 80px;
  float: left;
}

a {
  text-decoration-line: none;
  color: #212529;
}

.rightPanel {
  text-align: right;
}

.form1 {
  display: inline-block;
  margin: 20px;
  margin-bottom: 10px;
}
</style>
