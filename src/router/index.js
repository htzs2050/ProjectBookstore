import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import Layout from "@/views/Layout.vue";
import ElementUI from 'element-ui'; //
import 'element-ui/lib/theme-chalk/index.css'; //
import '@/assets/global.css'

Vue.use(VueRouter);
Vue.use(ElementUI);
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () =>import ('@/views/Login/Login.vue')
  },

  // -----------user----------------------
  {
    path: '/',
    name: 'Layout',
    component: Layout,
     redirect: '/home',
    children: [//子路由的意思
      {
        path: 'home',
        name: 'home',
        component: ()=>import('@/views/home/HomeView.vue')
      },
      {
        path: 'Table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Table.vue')
      },
      {
        path: 'userList',
        name: 'userList',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/User.vue')
      },
      {
        path: 'AddUser',
        name: 'AddUser ',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/AddUser.vue')
      },
      {
        path: 'ManageUser',
        name: 'ManageUser ',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/ManageUser.vue')
      },
      // --------------Admin begin-------------------------
      {
        path: 'AddAdmin',
        name: 'AddAdmin',
        component: () => import('@/views/Admin/Add.vue')
      },
      {
        path: 'AdminList',
        name: 'AdminList',
        component: () => import('@/views/Admin/List.vue')
      },
      {
        path: 'ManageAdmin',
        name: 'ManageAdmin',
        component: () => import('@/views/Admin/Manage.vue')
      },

      // --------------Admin end-------------------------
      //   category
      {
        path: 'AddCategory',
        name: 'AddCategory',
        component: () => import('@/views/Category/Add.vue')
      },
      {
        path: 'CategoryList',
        name: 'CategoryList',
        component: () => import('@/views/Category/List.vue')
      },
      {
        path: 'EditCategory',
        name: 'EditCategory',
        component: () => import('@/views/Category/Edit.vue')
      },
    //    book
      {
        path: 'AddBook',
        name: 'AddBook',
        component: () => import('@/views/Book/Add.vue')
      },
      {
        path: 'BookList',
        name: 'BookList',
        component: () => import('@/views/Book/List.vue')
      },
      {
        path: 'EditBook',
        name: 'EditBook',
        component: () => import('@/views/Book/Edit.vue')
      },
      {
        path: 'Cardbook',
        name: 'Cardbook',
        component: () => import('@/views/card/Cardbook.vue')
      },

      {
        path: 'Collect',
        name:'Collect',
        component: () => import('@/views/person/Collect.vue')
      },



    ]
  },




]

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
// 针对ElementUI导航栏中重复导航报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') next()
//   const admin = Cookies.get("admin")
//   if (!admin && to.path !== '/login') return next("http://localhost:8080/login")  // 强制退回到登录页面
//   // 访问 /home 的时候，并且cookie里面存在数据，这个时候我就直接放行
//   next()
// })
export default router

// export default router{
//   data() {
//     return {
//       activeIndex: '1',
//       activeIndex2: '1'
//     };
//   },
//   methods: {
//     handleSelect(key, keyPath) {
//       console.log(key, keyPath);
//     }
//   }
// }
