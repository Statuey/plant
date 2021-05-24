<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">
        <span class="navbar-item is-size-4 has-text-weight-bold"
          >PlantData</span
        >
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">{{ user }}</a>

          <div class="navbar-dropdown is-boxed is-right">
            <router-link to="/identify" class="navbar-item"
              >植物识别</router-link
            >
            <router-link to="/dashboard" class="navbar-item"
              >我的数据集</router-link
            >
            <router-link to="/new" class="navbar-item">创建数据集</router-link>
            <hr class="navbar-divider" />
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
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.navbar {
  border-bottom: 2px solid #f5f5f5;
}
</style>
