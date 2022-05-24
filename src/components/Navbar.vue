<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">
        <span class="navbar-item is-size-4 has-text-weight-bold logo-text">
          PlantData
        </span>
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': menu }"
        aria-label="menu"
        aria-expanded="false"
        @click="menu = !menu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': menu }">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">主页</router-link>
        <router-link to="/identify" class="navbar-item">植物识别</router-link>
        <router-link to="/publicData" class="navbar-item">数据集</router-link>
        <router-link to="/publicModel" class="navbar-item">模型库</router-link>
        <router-link to="/about" class="navbar-item">关于我们</router-link>
      </div>
      <div class="navbar-end">
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">{{ user }}</a>

          <div class="navbar-dropdown is-boxed is-right">
            <router-link to="/dashboard" class="navbar-item">
              我的数据集
            </router-link>
            <router-link to="/new" class="navbar-item">创建数据集</router-link>
            <router-link to="/modelboard" class="navbar-item">
              我的模型
            </router-link>
            <router-link to="/newmodel" class="navbar-item">
              创建模型
            </router-link>
            <hr class="navbar-divider" />
            <router-link
              v-if="user === 'admin'"
              to="/userAdmin"
              class="navbar-item"
            >
              用户管理 （管理员）
            </router-link>
            <a class="navbar-item" @click="logout">退出登录</a>
          </div>
        </div>
        <div class="navbar-item" v-if="!user">
          <div class="buttons">
            <router-link to="/signup" class="button is-primary">
              <strong>注册</strong>
            </router-link>
            <router-link to="/login" class="button is-light">登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit('logout');
      this.$router.push('/');
    },
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.username;
    },
  },
  watch: {
    $route(to, from) {
      this.menu = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 0.125em 0.25em rgb(10 10 10 / 10%);
}
</style>
