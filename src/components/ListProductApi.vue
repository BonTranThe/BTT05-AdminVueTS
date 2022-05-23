<template>
  <div id="listProduct">
    <h1 style="text-align: center; font-size: 30px">List Product API</h1>
    <el-table :data="filterTableData" border style="width: 100%">
      <el-table-column type="index" width="100" label="Order" align="center" />
      <el-table-column label="Serial" prop="id" align="center" width="220" />
      <el-table-column label="Name" prop="name" align="center" width="380" />
      <el-table-column label="Price ($)" prop="price" align="center" />
      <el-table-column label="Quantity" prop="quantity" align="center" />
      <el-table-column align="center" width="180">
        <template #header>
          <el-button @click="passNewProductApi" type="primary" size="small"
            >Add New Product API</el-button
          >
        </template>
        <template #default="scope">
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="#626AEF"
            title="Are you sure to edit this product?"
            @confirm="confirmEdit(scope.$index)"
            @cancel="cancel"
          >
            <template #reference>
              <el-button size="small">Edit</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="#626AEF"
            title="Are you sure to delete this product?"
            @confirm="confirmDelete(filterTableData[scope.$index].id)"
            @cancel="cancel"
          >
            <template #reference>
              <el-button type="danger" size="small">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="modal" v-if="showModalSuccess">
    <transition name="fade" appear>
      <div class="modal-overlay"></div>
    </transition>
    <transition name="slide" appear>
      <div class="alertSuccess">
        <p>Delete Product Successfull!</p>
        <el-button type="success" @click="showModalSuccess = false">Close</el-button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from 'vue'
import { store } from '../store/index'

export default defineComponent({
  name: "ListProductApi",
  data() {
    return {
      data: null,
      showModalSuccess: false,
    }
  },

  mounted() {
    store.dispatch("getProducts");
  },

  computed: {
    ...mapState(["productsAPI"]),
    filterTableData(): [] {
      return this.productsAPI;
    },
  },

  methods: {
    confirmDelete(id: string) {
      store.dispatch("deleteProductAPI", id);
      setTimeout(() => {
        this.showModalSuccess = true;
      }, 500);
    },

    confirmEdit(index: number) {
      let id = this.productsAPI[index].id;
      this.$router.push({
        path: "/homemanage/editproductapi",
        query: { id: id },
      });
    },

    cancel() {
      return;
    },

    passNewProductApi() {
      this.$router.push("/homemanage/newproductapi");
    },
  },
});
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.edit {
  margin-right: 14px;
}

.modal-overlay {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.alertSuccess {
  position: absolute;
  z-index: 3;
  background-color: #fff;
  color: rgb(13, 221, 13);
  width: 300px;
  height: 100px;
  border: 2px solid rgb(18, 214, 34);
  border-radius: 5px;
  top: 420px;
  left: 870px;
}
</style>
