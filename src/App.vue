<template>
  <div class="app">
    <el-container>
      <el-header class="header"> <nav-header /> </el-header>
      <el-header class="header show"> <nav-header /> </el-header>
      <el-main class="container">
        <div class="main"><router-view /></div>
      </el-main>
    </el-container>
    <a href="https://beian.miit.gov.cn/" target="_blank">
      黔ICP备2022007201号-1
    </a>
  </div>
</template>

<script lang="ts" setup>
import NavHeader from "./components/NavHeader.vue";
</script>

<style lang="stylus">
:root
  --bg #F6F6F6
  --blue #056DE8
  --blue-deep #2B468C
  --blue-deeper #152243
html
  background-color var(--bg)
  overflow-x hidden
  font-size 16px
  @media (min-width 0px)
    font-size 10px
  // iPhone SE
  @media (min-width 375px)
    font-size 11px
  @media (min-width 500px)
    font-size 14px
  @media (min-width 720px)
    font-size 16px
body
  margin 0
.container
  width 100vw
  max-width 1000px
  margin 0 auto
  &.header
    max-width 1280px
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
.message-box-alert
  &.error
    --el-button-text-color var(--el-color-white)
    --el-button-bg-color var(--el-color-error)
    --el-button-border-color var(--el-color-error)
    --el-button-outline-color var(--el-color-error-light-5)
    --el-button-active-color var(--el-color-error-dark-2)
    --el-button-hover-text-color var(--el-color-white)
    --el-button-hover-link-text-color var(--el-color-error-light-5)
    --el-button-hover-bg-color var(--el-color-error-light-3)
    --el-button-hover-border-color var(--el-color-error-light-3)
    --el-button-active-bg-color var(--el-color-error-dark-2)
    --el-button-active-border-color var(--el-color-error-dark-2)
    --el-button-disabled-text-color var(--el-color-white)
    --el-button-disabled-bg-color var(--el-color-error-light-5)
    --el-button-disabled-border-color var(--el-color-error-light-5)
</style>

<style lang="stylus" scoped>
.el-header
  width 100%
  padding 0
  position relative
  opacity 0
  height 3.5rem
  /deep/& .nav-header
    padding 0
  &.show
    opacity 1
    position fixed
    z-index 1000
    & .nav-header
      box-shadow rgba(0, 0, 0, 0.3) 0px 0px 10px
.el-main
  padding 0.5rem
  & .main
    background-color white
    box-shadow rgba(0, 0, 0, 0.1) 0px 0px 5px
    border-radius 5px
    padding 0.5rem
</style>
