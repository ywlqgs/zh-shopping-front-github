import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

// 路由懒加载
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const Pay = () => import('@/views/pay')
const ProDetail = () => import('@/views/prodetail')
const MyOrder = () => import('@/views/myorder')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home
        },
        {
          path: '/category',
          component: Category
        },
        {
          path: '/cart',
          component: Cart
        },
        {
          path: '/user',
          component: User
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/searchlist',
      component: SearchList
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/myorder',
      component: MyOrder
    },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带id
    {
      path: '/prodetail/:id',
      component: ProDetail
    }
  ]
})

// 全局前置导航守卫
// 所有的路由在真正被访问之前，都会先经过全局前置路由守卫，只有它放行了，才会到达页面
// to:到哪里去，到哪去的完整路由信息对象（路径，参数）
// from: 从哪来，从哪来的完整路由信息对象（路径，参数）
// next：是否放行
//  （1）next() 直接放行，放行到to要去的路径
//  （2）next(路径) 进行拦截，拦截到next里面的配置
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  const authUrls = ['/pay', '/myorder']
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }

  // 权限页面，判断是否有token
  // const token = store.state.user.userInfo.token
  // 太长，进行封装，通过全局去拿
  const token = store.getters.token
  console.log(token)
  if (token) { // 判断token是否存在，存在则放行，否则拦截跳转到/login
    next()
  } else {
    next('/login')
  }
})

export default router
