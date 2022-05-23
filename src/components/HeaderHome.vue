<template>
  <div id="headerHome">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="gray"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-sub-menu index="1" style="margin-left: 1459px">
        <template #title>Hi, {{isLogin}}</template>
        <el-menu-item index="1-3">Profile</el-menu-item>
        <el-menu-item index="1-4" @click="logOut">Log out</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { defineComponent } from 'vue'
import { store } from '../store/index'

interface userAPI {
  username: string,
  email: string,
  password: string,
  isLogin: boolean,
}
export default defineComponent({
  name: "HeaderHome",
  mounted() {
    store.dispatch("getUsers");
  },

  computed: {
    ...mapState(["usersAPI"]),
    isLogin(): string {
      const current = this.usersAPI.find((user: userAPI) => user.isLogin == true);
      return current?.username;
    },
    isLogout(): string {
      const current = this.usersAPI.find((user: userAPI) => user.isLogin == true);
      return current.id;
    }
  },

  methods: {
    logOut() {
      store.dispatch("logoutUser", this.isLogout);
      this.$router.push("/");
    }
  }
})
</script>

<style lang="scss" scoped>
.headerHome {
  margin: -200px 0;
}
</style>
