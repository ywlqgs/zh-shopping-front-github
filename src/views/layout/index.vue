<template>
  <div>

    <router-view></router-view>

<!--    在前端应用中，通常有两种导航模式：push（推入）和 replace（替换）。
    Push 模式： 当你从一个标签切换到另一个标签时，使用 push 模式会在浏览器的历史记录中添加一个新的导航记录。
              这意味着你可以使用浏览器的返回按钮回到之前访问的标签。
    Replace 模式： 使用 replace 模式切换标签时，不会添加新的导航记录，而是替换当前的历史记录。
              这意味着你不能通过浏览器的返回按钮回到之前的标签，而是会直接返回到上一个历史记录。-->
      <van-tabbar route v-model="active" active-color="#ee0a24" inactive-color="#000">
        <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/category" icon="apps-o">分类页</van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'IndexLayout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>
