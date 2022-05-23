<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <SlideBar />
      </el-aside>
      <el-container>
        <el-header>
          <HeaderHome />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderHome from '../components/HeaderHome.vue'
import SlideBar from '../components/SlideBar.vue'
const STORAGE_KEY = "userlog";
export default {
  name: "ManageView",
  components: {
    HeaderHome, SlideBar,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
    }
  }
};
</script>

<style>
</style>
