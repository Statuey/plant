<template>
  <div id="app">
    <div class="navbar">
      <div class="logo">
        <router-link to="/">
          <img src="./assets/img/logo1.svg" width="60" alt="" />
        </router-link>
      </div>
      <div class="navitem" v-if="visitor">
        <div class="form1" @click="login">
          <a href="">登录</a>
        </div>
        <div class="form1" @click="register">
          <a href="">注册</a>
        </div>
      </div>

      <div class="navitem" v-else>
        <ul class="tab-nav">
          <li v-for="(i, index) in navList" :key="index">
            <div class="nav" @click="openNav(index, i.list.length)">
              <i class="el-icon-s-home"></i>
              <span>{{ i.title }}</span>
              <i
                v-if="i.list.length"
                id="right-btn"
                class="el-icon-arrow-right"
              ></i>
            </div>
            <div class="nav-n-box">
              <div class="nav-n" v-for="(n, index) in i.list" :key="index">
                {{ n.title }}
              </div>
            </div>
          </li>
        </ul>

        <div class="form1" @click="upload">
          <a href="">上传图片</a>
        </div>
        <div class="form1">
          <span v-show="NAME">你好！用户 {{ NAME }}</span>
        </div>
        <div class="form1" @click="signout">
          <a href="">退出</a>
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
      navelist: [
        {
          title: "数据集管理",
          name: "database",
          list: [
            {
              title: "训练集数据",
              name: "trainManangement",
            },
            {
              title: "测试集数据",
              name: "testManangement",
            },
            {
              title: "病斑数据",
              name: "lesionsManangement",
            },
          ],
        },
        {
          title: "模型管理",
          name: "model",
          list: [
            {
              title: "测试集强化",
              name: "testEnhance",
            },
            {
              title: "模型管理",
              name: "modelManangement",
            },
          ],
        },
        {
          title: "测试管理",
          name: "testManagement",
          list: [],
        },
        {
          title: "植物识别",
          name: "plantDisplay",
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
    upload() {
      this.$router.push("/home");
    },
    isVisitor() {
      var item = localStorage.getItem("user_ID");
      if (localStorage.getItem("access_token")) {
        this.visitor = false;
        this.NAME = item;
      }
      return this.visitor;
    },
    openNav(index, num) {
      let nav = document.querySelectorAll(".nav"); //获取父级菜单栏，以便添加选中样式
      let items = document.querySelectorAll(".nav-n-box"); //获取容纳子级菜单栏的容器，以便动态设置高度，实现下拉效果

      //-----------------可注释部分开始------注释后则不是手风琴效果------------------
      // 遍历菜单栏，移除所有选中后的样式   添加此段可实现手风琴效果，注释则实现多展示效果
      for (let i = 0; i < nav.length; i++) {
        // nav[index].classList.contains("nav-n-box-active") 判断标签内是否含有该class属性，以布尔值类型返回
        if (
          items[i].style.height == "" ||
          items[i].style.height == "0rem" ||
          nav[index].classList.contains("nav-n-box-active")
        ) {
          let height = items[index].style.height;
          items[index].style.height = height;
        } else {
          items[i].style.height = "0rem";
        }
        nav[i].classList.remove("nav-n-box-active");
      }
      //-----------------可注释部分结束------------------------

      //根据子菜单栏的高度判断，是否展开菜单栏，若有进行遍历操作，那么每次点击某个菜单栏的时候 height 都为 0
      if (
        items[index].style.height == "" ||
        items[index].style.height == "0rem"
      ) {
        //num 为子菜单栏的个数，根据子菜单栏确定容器的高度
        items[index].style.height = num * 2 + "rem";
        //添加右箭头旋转样式
        nav[index].classList.add("nav-n-box-active");
      } else {
        items[index].style.height = "0rem";
        //移除右箭头旋转样式
        nav[index].classList.remove("nav-n-box-active");
      }
      //------------------------------------------
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

#app {
  background-color: #1bc6a4;
}

a {
  text-decoration-line: none;
  color: #212529;
}

.navitem {
  text-align: right;
}

.form1 {
  display: inline-block;
  margin: 20px;
  margin-bottom: 10px;
}
</style>
