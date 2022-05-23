import axios from "axios";
import { api, apiUser } from "../api"
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
interface Product {
  id: number,
  name: string,
  price: string,
  quantity: string,
}
interface ProductAPI {
  id: string,
  name: string,
  price: string,
  quantity: string,
}
interface UserAPI {
  username: string,
  email: string,
  password: string,
  isLogin: boolean,
}

export interface State {
  products: Product[];
  product: Product;
  usersAPI: UserAPI[];
  productsAPI: ProductAPI[];
  userAPI: UserAPI;
  productAPI: ProductAPI;
}
// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

const STORAGE_KEY = "listProduct";
export const store = createStore<State>({
  state: {
    products: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as [],
    product: {
      id: Date.now(),
      name: "",
      price: "",
      quantity: "",
    },
    usersAPI: [],
    productsAPI: [],
    productAPI: {
      id: "",
      name: "",
      price: "",
      quantity: "",
    },
    userAPI: {
      username: "",
      email: "",
      password: "",
      isLogin: false,
    }
  },
  getters: {},
  mutations: {
    SET_USERS(state, users) {
      state.usersAPI = users;
    },
    SET_PRODUCTS(state, products) {
      state.productsAPI = products;
    },
    REMOVE_PRODUCT_API(state, productID) {
      state.productsAPI = state.productsAPI.filter((item: ProductAPI) => item["id"] != productID);
    },
    EDIT_PRODUCT_API(state) {
      return state.productsAPI;
    },
    ADD_PRODUCT_API(state) {
      return state.productsAPI;
    },
    ADD_USER_API(state) {
      return state.usersAPI;
    },
    EDIT_STATUS_LOGIN_USER_API(state) {
      return state.usersAPI;
    }
  },
  actions: {
    getProducts({commit}) {
      axios
        .get(`${api}`)
          .then((response) => {
            commit("SET_PRODUCTS", response.data);
          });
    },
    deleteProductAPI({commit}, id) {
      axios.delete(`${api}/${id}`)
        .then((response) => {
          commit("REMOVE_PRODUCT_API", response.data.id);
        })
    },
    editProductAPI({commit}, product) {
      axios.put(`${api}/${product.id}`, {
        name: product.name,
        price: parseInt(product.price),
        quantity: parseInt(product.quantity),
      })
        .then((response) => {
          commit("EDIT_PRODUCT_API", response.data);
        })
    },
    addProductAPI({commit}, product) {
      axios.post(`${api}`, {
        name: product.name,
        price: parseInt(product.price),
        quantity: parseInt(product.quantity),
      })
      .then((response) => {
          console.log(product);
          commit("ADD_PRODUCT_API", response.data);
        })
    },
    getUsers({commit}) {
      axios
        .get(`${apiUser}`)
          .then((response) => {
            commit("SET_USERS", response.data);
          });
    },
    addUserAPI({commit}, product) {
      axios.post(`${apiUser}`, {
        username: product.username,
        email: product.email,
        password: product.password,
      })
        .then((response) => {
          commit("ADD_USER_API", response.data);
        })
    },
    async loginUser({commit}, id) {
      const response = await axios.put(`${apiUser}/${id}`, {
        isLogin: true,
      })
      commit("EDIT_STATUS_LOGIN_USER_API", response.data);
    },
    logoutUser({commit}, id) {
      axios.put(`${apiUser}/${id}`, {
        isLogin: false,
      })
        .then((response) => {
          commit("EDIT_STATUS_LOGIN_USER_API", response.data);
        })
    }
  },
  modules: {},
});
