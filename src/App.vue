<template>
  <div id="app">
    <div class="navbar">
      <div class="logo">
        <router-link to="/">
          <img src="./assets/img/logo1.svg" width="60" alt="" />
        </router-link>
      </div>
      <div class="spacer"></div>
      <div class="navitem" v-if="visitor">
        <div class="form1" @click="login">
          <span>登录</span>
        </div>
        <div class="form1" @click="register">
          <span>注册</span>
        </div>
      </div>

      <div class="navitem" v-else>
        <div v-for="navItem in navItems" :key="navItem.title">
          <div class="mainItem">
            <div v-if="navItem.flag" class="form1">
              <span>{{ navItem.title }}</span>
            </div>
            <div class="form1" v-else>
              <router-link :to="navItem.href">{{ navItem.title }}</router-link>
            </div>
            <div class="menu" v-if="navItem.children">
              <div
                class="menu-item"
                v-for="child in navItem.children"
                :key="child.title"
              >
                <div>
                  <router-link :to="child.href">
                    {{ child.title }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form1">
          <span v-show="NAME">你好！用户 {{ NAME }}</span>
        </div>
        <div class="form1" @click="signout">
          <span>退出</span>
        </div>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
      <div style="height: 5rem"></div>
    </div>
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
      navItems: [
        {
          title: "数据集管理",
          flag: 1,
          href: "/database",
          children: [
            {
              title: "训练集数据",
              name: "trainManagement",
              href: "/database/trainManagement",
            },
            {
              title: "测试集数据",
              name: "testManagement",
              href: "/database/testDatabase",
            },
            {
              title: "病斑数据",
              name: "lesionsManagement",
              href: "/database/lesionsManagement",
            },
          ],
        },
        {
          title: "模型管理",
          flag: 1,
          href: "/model",
          children: [
            {
              title: "测试集强化",
              name: "testEnhance",
              href: "/model/testEnhance",
            },
            {
              title: "模型管理",
              name: "modelManangement",
              href: "/model/modelManangement",
            },
          ],
        },
        {
          title: "测试管理",
          flag: 0,
          href: "/testManagement",
          list: [],
        },
        {
          title: "植物识别",
          flag: 0,
          name: "plantDisplay",
          href: "/home",
          list: [],
        },
      ],
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
      axios.defaults.headers.common = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
      this.visitor = false;
      this.NAME = localStorage.getItem("user_ID");
    } else {
      this.visitor = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.spacer {
  flex: 1;
}

.mainItem {
  display: inline-block;
  position: relative;
  min-width: 120px;
  user-select: none;
  text-align: center;
  transition: 200ms;
}

.mainItem:hover .menu {
  visibility: visible;
  opacity: 1;
}

.menu {
  transition: 200ms;
  position: absolute;
  z-index: 100;
  top: 60px;
  padding: 0;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 16px 0px rgb(0, 0, 0, 0.12);
  left: -10px;
  right: -10px;
  text-align: center;
  line-height: 1.8;
  visibility: hidden;
  opacity: 0;
}

.menu .menu-item:last-of-type {
  border-bottom: none;
}

.menu-item {
  padding: 0.3em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  transition: 200ms;
}

.menu-item:hover {
  background-color: #6167d5;
  color: #ffffff;
}

.navbar {
  background-color: #f8f9fa;
  height: 60px;
  text-align: center;
  border-bottom: solid;
  border-width: 1px;
  border-color: #dee2e6;
  margin: 0 0;
  padding: 0 0;
  display: flex;
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

.navitem {
  display: flex;
  text-align: right;
}

.form1 {
  display: inline-block;
  margin: 20px;
  margin-bottom: 10px;
}
</style>
