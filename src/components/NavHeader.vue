<template>
  <div class="nav-header">
    <div class="container">
      <div class="flex-item left">
        <div class="title" @click="toHome">
          <el-avatar :size="40" :src="icon" />
          <div>万劫不复ks</div>
        </div>
        <div
          class="item"
          :class="currentRoute == '/' ? 'current' : ''"
          @click="toHome"
        >
          <div>首页</div>
        </div>
        <div
          class="item"
          :class="currentRoute == '/user' ? 'current' : ''"
          @click="toUser"
        >
          <div>用户</div>
        </div>
        <div
          class="item"
          :class="currentRoute == '/draw' ? 'current' : ''"
          @click="toDraw"
        >
          <div>抽签</div>
        </div>
      </div>
      <div class="flex-item right">
        <div class="user logined" v-if="User.isLogin">
          <div class="name" @click="toHome" v-if="clientWidth >= 720">
            {{ User.data?.name }}
          </div>
          <div class="avatar" @click="toLogin('register')">
            <el-avatar
              :size="40"
              :src="
                User.data?.avatar ||
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              "
            />
          </div>
        </div>
        <div class="user before-login" v-else>
          <div class="login" @click="toLogin('login')">登录</div>
          <div class="register" @click="toLogin('register')">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref, watch } from "vue-demi";
import User from "@/scripts/user";
const clientWidth = ref(1280);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const icon = require("../assets/images/wjbfks.jpg");
const toHome = () => {
  router.push("/");
};
const toLogin = (p: string) => {
  router.push("/user?status=" + p);
};
const toUser = () => {
  router.push("/user");
};
const toDraw = () => {
  router.push("/draw");
};
const currentRoute = ref("/");
const routes = ["/", "/user", "/draw"];
watch(
  () => router.currentRoute.value.path,
  (now) => {
    if (routes.indexOf(now) != -1) {
      let s = "/";
      for (let i = 1; i < now.length; i++) {
        if (now[i] == "/") {
          break;
        }
        s += now[i];
      }
      currentRoute.value = s;
    }
  },
  { immediate: true }
);
window.onresize = () => {
  return (() => {
    clientWidth.value = document.body.clientWidth;
  })();
};
clientWidth.value = document.body.clientWidth;
</script>

<style lang="stylus" scoped>
.nav-header
  width 100%
  background-color white
  box-sizing border-box
  padding 0 1rem
  & div
    display flex
    align-items center
  & .item
    font-weight bold
    margin 0 0.5rem
    cursor pointer
    position relative
    color gray
    padding 1rem 0
    transition-property color
    transition-duration 0.5s
    &.current
      color var(--blue)
      &::after
        opacity 1
    &::after
      position absolute
      right 0
      bottom -1px
      left 0
      height 3px
      background #056de8
      content ''
      opacity 0
      transition-property opacity
      transition-duration 0.5s
.container
  display flex
  justify-content space-between
  & .flex-item
    &.left
      user-select none
      margin-left 0.5rem
    &.right
      user-select none
      margin-right 0.5rem
.title
  font-size 1.75rem
  font-weight bold
  color var(--blue)
  cursor pointer
  & div
    margin 0 10px
.user
  &.before-login
    color var(--blue)
    font-size 1.25rem
    line-height 1.25rem
    user-select none
    & div
      padding 0.5rem
      border var(--blue) dashed 1px
      border-radius 0.5rem
      cursor pointer
      &.login
        &:hover
          background-color var(--blue)
          color white
          box-shadow var(--blue) 0 0 5px
        &:active
          box-shadow rgba(0, 0, 0, 0) 0 0 0
      &.register
        margin-left 1rem
        background-color var(--blue)
        color white
        border-style solid
        &:hover
          background-color rgba(0, 0, 0, 0)
          color var(--blue)
          box-shadow var(--blue) 0 0 5px
        &:active
          box-shadow rgba(0, 0, 0, 0) 0 0 0
  &.logined
    cursor pointer
    & .name
      color var(--blue)
      margin-right 1rem
      font-weight bold
/deep/.el-avatar--circle
  height 2.5rem
  width 2.5rem
  max-height 40px
  max-width 40px
</style>
