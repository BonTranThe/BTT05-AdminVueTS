<template>
  <div id="editproduct">
    <el-card>
      <h1>Edit Product API Form</h1>
      <el-form ref="form" :model="productEdit" class="editproduct-form" :rules="rulesProduct">
        <el-form-item prop="name">
          <el-input
            type="text"
            v-model="productEdit.name"
            :model-value="productEdit.name"
            placeholder="Name Product"
            prefix-icon="ShoppingBag"
          ></el-input>
        </el-form-item>
        <el-form-item prop="price">
          <el-input
            type="number"
            v-model="productEdit.price"
            :model-value="parseInt(productEdit.price)"
            placeholder="Price ($)"
            prefix-icon="Wallet"
          ></el-input>
        </el-form-item>
        <el-form-item prop="quantity">
          <el-input
            type="number"
            v-model="productEdit.quantity"
            :model-value="productEdit.quantity"
            placeholder="Quantity"
            prefix-icon="Grid"
          ></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button
            :loading="loading"
            class="addItem-button"
            type="primary"
            @click="saveItem"
            @keyup.enter="saveItem"
            >Save Product</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <div class="modal" v-if="showModalSuccess">
    <transition name="fade" appear>
      <div class="modal-overlay"></div>
    </transition>
    <transition name="slide" appear>
      <div class="alertSuccess">
        <p>Edit Product Successfull!</p>
        <el-button type="success" @click="showModalSuccess = false">Close</el-button>
      </div>
    </transition>
  </div>
  <div class="modal" v-if="showModalFailed">
    <transition name="fade" appear>
      <div class="modal-overlay"></div>
    </transition>
    <transition name="slide" appear>
      <div class="alertFailed">
        <p>Edit Product Failed!</p>
        <el-button type="error" @click="showModalFailed = false">Close</el-button>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { mapState } from 'vuex';
import { defineComponent } from 'vue'
import { store } from '../store/index'
interface ProductAPI {
  id: string,
  name: string,
  price: string,
  quantity: string,
}
export default defineComponent({
  name: "EditProductApi",
  data() {
    return {
      loading: false,
      showModalFailed: false,
      showModalSuccess: false,
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
            message: "Quantity (number) is greater than or equal 1",
            trigger: "blur",
          },
        ],
      },
    }
  },
  computed: {
    ...mapState(["productsAPI"]),
    productEdit(): ProductAPI {
      return this.productsAPI.find((product: ProductAPI) => product.id == this.$route.query.id);
    },
  },
  methods: {
    saveItem() {
      if (
       this.productEdit.name === "" ||
       this.productEdit.price === "" ||
       this.productEdit.quantity === ""
      ) {
       this.showModalFailed = true;
       return;
      }
      if (
       this.productEdit.name != "" &&
       this.productEdit.price != null &&
       this.productEdit.quantity != null
      ) {
       store.dispatch("editProductAPI", this.productEdit);
       this.loading = true;
        setTimeout(() => {
         this.loading = false;
         this.showModalSuccess = true;
         this.$router.push("/homemanage/listproductapi");
        }, 1000);
      }
    },
  },
})
</script>

<style lang="scss" scoped>
#editproduct {
  max-width: 450px;
  text-align: center;
  margin: 200px auto;

  & el-card {
    width: 100%;

    & .editproduct-form {
      width: 100%;
    }
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

.alertFailed {
  position: absolute;
  z-index: 3;
  background-color: #fff;
  color: red;
  width: 300px;
  height: 100px;
  border: 2px solid rgb(228, 10, 10);
  border-radius: 5px;
  top: 420px;
  left: 870px;
}
</style>
