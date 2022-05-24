<template>
  <section class="hero is-danger">
    <div class="hero-body">
      <p class="title logo-text">User Admin</p>
      <p class="subtitle">用户管理</p>
    </div>
  </section>
  <div class="container mt-4">
    <table class="table is-fullwidth" v-click-outside="onClickOutside">
      <thead>
        <tr>
          <th>用户名</th>
          <th>邮箱</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.username">
          <td>
            <input type="text" v-model="editUser.username" v-if="editUser.oldUsername === user.username" />
            <span v-else>
              {{ user.username }}
            </span>
          </td>
          <td>
            <input type="email" v-model="editUser.email" v-if="editUser.oldUsername === user.username" />
            <span v-else>
              {{ user.email }}
            </span>
          </td>
          <td class="actions">
            <button
              class="is-small button is-light is-warning"
              v-if="editUser.oldUsername === user.username"
              @click="confirm(user.username)"
            >
              更改
            </button>
            <button v-else class="is-small button is-light is-info" @click="edit(user)">编辑</button>
            <button class="is-small button is-light is-danger" @click="deleteUser(user)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      editUser: {
        oldUsername: null,
      },
    };
  },
  methods: {
    onClickOutside() {
      this.editUser = {
        username: null,
      };
    },
    deleteUser(user) {
      this.$http.delete(`/api/users/${user.username}`).then((res) => {
        this.$http.get(`/api/all_users`).then((res) => {
          this.users = res.data.results;
        });
      });
    },
    edit(user) {
      this.editUser = {
        username: user.username,
        oldUsername: user.username,
        email: user.email,
      };
    },
    confirm(oldUsername) {
      this.$http
        .post(`/api/change_user/${oldUsername}`, {
          username: this.editUser.username,
          email: this.editUser.email,
        })
        .then((res) => {
          this.editUser = {
            username: null,
          };
          this.$http.get(`/api/all_users`).then((res) => {
            this.users = res.data.results;
          });
        });
    },
  },
  mounted() {
    this.$http.get(`/api/all_users`).then((res) => {
      this.users = res.data.results;
    });
  },
};
</script>

<style scoped>
td,
th {
  vertical-align: middle;
  min-width: 100px;
}
.actions {
  text-align: right;
  min-width: 200px;
}
</style>
