<template>
  <div class="login">
    <el-card>
      <h1>Login Form</h1>
      <el-form ref="form" :model="userAPI" class="login-form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="userAPI.username"
            placeholder="Username"
            prefix-icon="UserFilled"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="userAPI.password"
            placeholder="Password"
            :type="!status ? 'password' : 'text'"
            prefix-icon="Lock"
          >
            <template #suffix>
              <el-icon
                @click="show()"
                class="icon-hide"
                :style="{ display: !status ? 'inline' : 'none' }"
                ><hide
              /></el-icon>
              <el-icon
                @click="show()"
                class="icon-show"
                :style="{ display: status ? 'inline' : 'none' }"
                ><View
              /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            @click="log"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
      <router-link to="/register">Already to register? Register</router-link>
    </el-card>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import { store } from "../store/index";

interface UserAPI {
  id: string;
  username: string;
  email: string;
  password: string;
  isLogin: boolean;
}

export default defineComponent({
  name: "LoginUser",
  data() {
    return {
      userAPI: store.state.userAPI,
      status: false,
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    store.dispatch("getUsers");
  },

  computed: {
    ...mapState(["usersAPI"]),
    filterDataUser(): [] {
      return this.usersAPI;
    },
  },

  methods: {
    show() {
      if (this.status === false) {
        this.status = true;
      } else {
        this.status = false;
      }
    },

    resetInput() {
      this.userAPI.username = "";
      this.userAPI.password = "";
    },

    log(e: MouseEvent) {
      this.loading = true;
      if (this.userAPI.username === "" || this.userAPI.password === "") {
        e.preventDefault();
        setTimeout(() => (this.loading = false), 600);
        alert("Failed!");
        return;
      } else if (this.usersAPI.length === 0) {
        e.preventDefault();
        this.resetInput();
        return;
      } else {
        e.preventDefault();
        this.filterDataUser.forEach(async (item: UserAPI) => {
          if (
            this.userAPI.username === item.username &&
            this.userAPI.password === item.password
          ) {
            await store.dispatch("loginUser", item.id);
            this.$router.push("/homemanage");
          }
        });
        this.userAPI.username = "";
        this.userAPI.password = "";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.login {
  max-width: 450px;
  text-align: center;
  margin: 240px auto;

  & el-card {
    width: 100%;

    & .login-form {
      width: 100%;
    }
  }
}

a {
  text-decoration: none;
  color: rgb(86, 147, 228);

  &:hover {
    color: rgb(42, 123, 230);
  }
}

h1 {
  color: brown;
  size: 30px;
}

el-input {
  width: 100%;

  &#suffix-icon:hover {
    cursor: pointer;
  }
}

.button {
  width: 100%;
  margin-top: 40px;

  & .login-button {
    width: 100%;
  }
}

.icon-show,
.icon-hide:hover {
  cursor: pointer;
}

.icon-show {
  display: none;
}
</style>
