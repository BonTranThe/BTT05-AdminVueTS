<template>
  <div class="register">
    <el-card>
      <h1>Register Form</h1>
      <el-form ref="form" :model="userAPI" class="register-form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="userAPI.username"
            placeholder="Username"
            prefix-icon="UserFilled"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            type="email"
            v-model="userAPI.email"
            placeholder="Email"
            prefix-icon="Postcard"
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
                ref="iconDisplay"
                @click="show()"
                class="icon-hide"
                :style="{ display: !status ? 'inline' : 'none' }"
                ><hide
              /></el-icon>
              <el-icon
                ref="iconDisplay"
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
            class="register-button"
            type="primary"
            native-type="submit"
            @click="addUser"
            >Register</el-button
          >
        </el-form-item>
      </el-form>
    <router-link to="/">Already to login? Login</router-link>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from "vuex";
interface UserAPI {
  username: string,
  email: string,
  password: string,
  isLogin: boolean,
}
import { store } from '../store/index'
export default defineComponent({
  name: "RegisterUser",
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
          {
            min: 4,
            message: "Username length should be at least 4 characters",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Email is required",
            trigger: "blur",
          },
          {
            min: 11,
            message: "Email length should be at least 11 characters and has '@gmail.com' ",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "blur",
          },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
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
    filterDataUser(): UserAPI {
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

    addUser(e: MouseEvent) {
      console.log(this.usersAPI);
      this.loading = true;
      if (
        this.userAPI.username === "" ||
        this.userAPI.email === "" ||
        this.userAPI.password === ""
      ) {
        e.preventDefault();
        setTimeout(() => {
          this.loading = false;
          // this.$message.error("PLEASE FILL OUT FULLY IN REGISTER FORM TO REGISTER ACCOUNT!")
        }, 600);
        return;
      } else {
        setTimeout(() => {
          this.loading = false;
          // this.$message.success("Register Successfull!");
          this.userAPI.username = "";
          this.userAPI.email = "";
          this.userAPI.password = "";
        }, 1000);
        store.dispatch("addUserAPI", this.userAPI);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.register {
  max-width: 450px;
  text-align: center;
  margin: 240px auto;

  & el-card {
    width: 100%;

    & .register-form {
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

  & .register-button {
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
