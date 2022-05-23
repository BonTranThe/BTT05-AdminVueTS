<template>
  <div id="listProduct">
    <h1 style="text-align: center; font-size: 30px">List Product</h1>
    <el-table :data="filterTableData" border style="width: 100">
      <el-table-column type="index" width="100" label="Order" align="center" />
      <el-table-column label="Serial" prop="id" align="center" width="240" />
      <el-table-column label="Name" prop="name" align="center" width="400" />
      <el-table-column label="Price ($)" prop="price" align="center" />
      <el-table-column label="Quantity" prop="quantity" align="center" />
      <el-table-column align="center" width="160">
        <template #header>
          <el-button @click="passNewProduct" type="primary" size="small"
            >Add New Product</el-button
          >
        </template>
        <template #default="scope" >
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
            @confirm="confirmDelete(scope.$index)"
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

const STORAGE_KEY = "listProduct";
export default defineComponent({
  name: "ListProduct",
  data() {
    return {
      showModalSuccess: false,
    }
  },
  computed: {
    ...mapState(["products"]),
    filterTableData(): object {
      return this.products;
    },
  },
  watch: {
    products: {
      handler(products: object) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      },
      deep: true,
    },
  },
  methods: {
    confirmDelete(index: number) {
      this.products.splice(index, 1);
      this.showModalSuccess = true;
    },
    confirmEdit(index: number) {
      let id = this.products[index].id;
      this.$router.push({
        path: "/homemanage/editproduct",
        query: { id: id },
      });
    },
    cancel() {
      return;
    },
    passNewProduct() {
      this.$router.push("/homemanage/newproduct");
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
