<template>
  <div id="newproduct">
    <el-card>
      <h1>Add New Product API Form</h1>
      <el-form
        ref="form"
        :model="productAPI"
        class="newproduct-form"
        :rules="rulesProduct"
      >
        <el-form-item prop="name">
          <el-input
            type="text"
            v-model="productAPI.name"
            placeholder="Name Product"
            prefix-icon="ShoppingBag"
          ></el-input>
        </el-form-item>
        <el-form-item prop="price">
          <el-input
            type="number"
            v-model="productAPI.price"
            placeholder="Price ($)"
            prefix-icon="Wallet"
          ></el-input>
        </el-form-item>
        <el-form-item prop="quantity">
          <el-input
            type="number"
            v-model="productAPI.quantity"
            placeholder="Quantity"
            prefix-icon="Grid"
          ></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button
            :loading="loading"
            class="addItem-button"
            type="primary"
            native-type="submit"
            @click="addItem"
            @keyup.enter="addItem"
            >Add Product</el-button
          >
        </el-form-item>
      </el-form>
      <router-link to="/homemanage/listproductapi">Go to List Product API</router-link>
    </el-card>
  </div>
  <div class="modal" v-if="showModal">
    <transition name="fade" appear>
      <div class="modal-overlay"></div>
    </transition>
    <transition name="slide" appear>
      <div class="alert">
        <p>Add New Product Successfull!</p>
        <el-button type="primary" @click="showModal = false">Close</el-button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '../store/index'
export default defineComponent({
  name: "NewProductApi",
  data() {
    return {
      productAPI: store.state.productAPI,
      showModal: false,
      loading: false,
      rulesProduct: {
        name: [
          {
            required: true,
            message: "Name of product is required",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "Price (number) is greater than or equal 1$",
            trigger: "blur",
          },
        ],
        quantity: [
          {
            required: true,
            message: "Quantity is required (number)",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addItem(e: MouseEvent) {
      this.loading = true;
      if (
        this.productAPI.name === "" ||
        this.productAPI.price === "" ||
        this.productAPI.quantity === ""
      ) {
        setTimeout(() => (this.loading = false), 3000);
        e.preventDefault();
        // this.$message.error("Please fill out fully to add new product!");
        return;
      } else {
        setTimeout(() => {
          this.loading = false;
          this.showModal = true;
          this.productAPI.name = "";
          this.productAPI.price = "";
          this.productAPI.quantity = "";
        },2000);
        e.preventDefault();
        store.dispatch("addProductAPI", this.productAPI);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
#newproduct {
  position: relative;
  max-width: 450px;
  text-align: center;
  margin: 200px auto;

  & el-card {
    width: 100%;

    & .newproduct-form {
      width: 100%;
    }
  }
}

a {
  text-decoration: none;
  color: rgb(77, 130, 209);
  font-style: italic;
  transition: 0.5s all;
  font-weight: 600;

  &:hover {
    color: rgb(5, 67, 160);
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

h1 {
  color: brown;
  font-size: 30px;
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

  & .addItem-button {
    width: 100%;
  }
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

.alert {
  position: absolute;
  z-index: 3;
  background-color: rgb(255, 255, 255);
  color: rgb(27, 252, 7);
  width: 300px;
  height: 100px;
  border: 2px solid rgb(27, 252, 7);
  border-radius: 5px;
  top: 420px;
  left: 870px;
}
</style>
