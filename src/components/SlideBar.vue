<template>
  <div>
    <el-row class="tac" width="200px">
      <el-col width="200px">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
        >
          <router-link to="/homemanage">
            <el-menu-item index="1">
              <template #title>
                <el-icon><homeFilled /></el-icon>
                <span>Home</span>
              </template>
            </el-menu-item>
          </router-link>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><briefcase /></el-icon>
              <span>Manage Product</span>
            </template>
            <router-link to="/homemanage/newproduct" class="nav-link"
              ><el-menu-item index="2-1">New Product</el-menu-item></router-link
            >
            <router-link to="/homemanage/listproduct" class="nav-link"
              ><el-menu-item index="2-2"
                >List Product</el-menu-item
              ></router-link
            >
            <router-link to="/homemanage/newproductapi" class="nav-link"
              ><el-menu-item index="2-1">New Product API</el-menu-item></router-link
            >
            <router-link to="/homemanage/listproductapi" class="nav-link"
              ><el-menu-item index="2-2"
                >List Product API</el-menu-item
              ></router-link
            >
          </el-sub-menu>
          <el-menu-item index="3">
            <template #title>
              <el-icon><homeFilled /></el-icon>
              <span>Documentation</span>
            </template>
          </el-menu-item>
          <el-menu-item index="4">
            <template #title>
              <el-icon><flag /></el-icon>
              <span>Guide</span>
            </template>
          </el-menu-item>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><grid /></el-icon>
              <span>Table</span>
            </template>
            <el-menu-item index="5-1">Table Product</el-menu-item>
            <el-menu-item index="5-2">List Table</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="6">
            <template #title>
              <el-icon><star /></el-icon>
              <span>Icons</span>
            </template>
          </el-menu-item>
          <el-sub-menu index="7">
            <template #title>
              <el-icon><setUp /></el-icon>
              <span>Setup</span>
            </template>
            <el-menu-item index="7-1">New Product</el-menu-item>
            <el-menu-item index="7-2">List Product</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="8">
            <template #title>
              <el-icon><stamp /></el-icon>
              <span>Theme</span>
            </template>
          </el-menu-item>
          <el-sub-menu index="9">
            <template #title>
              <el-icon><briefcase /></el-icon>
              <span>Zip</span>
            </template>
            <el-menu-item index="9-1">New Product</el-menu-item>
            <el-menu-item index="9-2">List Product</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="10">
            <template #title>
              <el-icon><suitcase /></el-icon>
              <span>Games</span>
            </template>
            <el-menu-item index="10-1">New Product</el-menu-item>
            <el-menu-item index="10-2">List Product</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="11">
            <template #title>
              <el-icon><bell /></el-icon>
              <span>Clipboard</span>
            </template>
            <el-menu-item index="11-1">New Product</el-menu-item>
            <el-menu-item index="11-2">List Product</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="12">
            <template #title>
              <el-icon><warning /></el-icon>
              <span>Error Log</span>
            </template>
            <el-menu-item index="12-1">New Product</el-menu-item>
            <el-menu-item index="12-2">List Product</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="13">
            <el-icon><setting /></el-icon>
            <span>Setting</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {
  name: "SlideBar",
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #fff;

  &.active .el-menu-item {
    color: #ffd04b;
  }
}

.el-menu-item.is-active {
  color: #fff;
}
</style>
