import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ManageView from '../views/ManageView.vue'
import LoginUser from '../components/LoginUser.vue'
import RegisterUser from '../components/RegisterUser.vue'
import BackGround from '../components/BackGround.vue'
import NewProduct from '../components/NewProduct.vue'
import ListProduct from '../components/ListProduct.vue'
import EditProduct from '../components/EditProduct.vue'
import NewProductApi from '../components/NewProductApi.vue'
import ListProductApi from '../components/ListProductApi.vue'
import EditProductApi from '../components/EditProductApi.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginUser,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser,
  },
  {
    path: '/manage',
    name: 'manage',
    component: ManageView,
    children: [
      {
        path: '/homemanage',
        name: 'homemanage',
        component: BackGround,
      },
      {
        path: '/homemanage/newproduct',
        name: 'newproduct',
        component: NewProduct,
      },
      {
        path: '/homemanage/listproduct',
        name: 'listproduct',
        component: ListProduct,
      },
      {
        path: '/homemanage/editproduct',
        name: 'editproduct',
        component: EditProduct,
      },
      {
        path: '/homemanage/newproductapi',
        name: 'newproductapi',
        component: NewProductApi,
      },
      {
        path: '/homemanage/listproductapi',
        name: 'listproductapi',
        component: ListProductApi,
      },
      {
        path: '/homemanage/editproductapi',
        name: 'editproductapi',
        component: EditProductApi,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'login',
    component: LoginUser,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
})

export default router
