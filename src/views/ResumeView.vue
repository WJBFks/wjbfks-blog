<template>
  <div class="resume-view">
    <div class="header">
      <div class="neu">
        <img :src="neu" />
      </div>
      <div class="main">
        <div class="name">王家兴</div>
        <div class="info">
          18085268536 | <a href="mailto:624662062@qq.com">624662062@qq.com</a>
        </div>
        <div class="info">22岁 | 仡佬族 | 共青团员</div>
      </div>
      <div class="wjx">
        <img :src="wjx" />
      </div>
    </div>
    <div class="division" style="margin-top: 1rem">
      <div class="title">教育背景</div>
    </div>
    <div class="content">
      <div class="paragraph flex">
        <div class="title">
          东北大学 计算机科学与工程学院 计算机科学与技术专业
        </div>
        <div>2019年09月 – 2023年06月</div>
      </div>
      <div class="paragraph flex-4">
        <div>绩点：3.87/5.0</div>
        <div>绩点排名：43/216</div>
        <div>综测排名：19/220</div>
        <div></div>
      </div>
      <div class="paragraph flex-4">
        <div>英语能力：CET-4 CET-6</div>
        <div></div>
        <div>编程能力：PAT甲级满分</div>
        <div></div>
      </div>
      <div class="paragraph">
        <div class="title">核心课程成绩：</div>
      </div>
      <div class="paragraph flex-4">
        <div>C语言程序设计：97</div>
        <div>C++程序设计：96</div>
        <div>概率论与数理统计：93</div>
        <div>计算理论：95</div>
      </div>
      <div class="paragraph flex-4">
        <div>离散数学：99</div>
        <div>数字逻辑与数字系统：99</div>
        <div>人工智能：98</div>
        <div>计算机组成原理：93</div>
      </div>
      <div class="paragraph flex-4">
        <div>Web编程技术：95</div>
        <div>计算机网络：93</div>
        <div>人工智能数学基础：95</div>
        <div>自然语言处理：95</div>
      </div>
    </div>
    <div class="division">
      <div class="title">科研竞赛</div>
    </div>
    <div class="content">
      <div class="paragraph flex">
        <div class="title">链上校园——基于区块链的智慧校园平台</div>
        <div>2020年10月 – 至今</div>
      </div>
      <div class="paragraph flex">
        <div>
          东北大学计算机科学与工程学院大学生创新创业项目（国家级）负责人
        </div>
        <div>导师：张岩峰</div>
      </div>
      <div class="paragraph flex left">
        <div class="title">项目内容：</div>
        <div>构建一个基于区块链后端的多功能智慧校园平台</div>
      </div>
      <div class="paragraph flex left">
        <div class="title">承担工作：</div>
        <div>
          在项目中作为负责人，主要负责基于Golang的区块链后端搭建、微信小程序的前端开发
        </div>
      </div>
      <div class="paragraph flex left">
        <div class="title">阶段成果：</div>
        <div>微信小程序——链上校园，核心功能基本开发完毕</div>
      </div>
      <div class="paragraph flex">
        <div class="title">沈阳舞指科技有限公司</div>
        <div>2021年03月 – 2021年10月</div>
      </div>
      <div class="paragraph flex">
        <div>第七届中国国际“互联网+”大学生创新创业大赛 核心成员</div>
        <div>导师：王斐、黄晓达、黄达</div>
      </div>
      <div class="paragraph flex left">
        <div class="title">项目内容：</div>
        <div>
          针对听障人士开发出的一套智能系统，包括肌电臂环或手套、云端数据、App程序
        </div>
      </div>
      <div class="paragraph flex left">
        <div class="title">承担工作：</div>
        <div>
          在项目中主要负责微信小程序开发、Web网页应用开发、Android程序开发
        </div>
      </div>
      <div class="paragraph flex left">
        <div class="title">项目成果：</div>
        <div>妙手回声微信小程序、妙手回声Android程序、肌电臂环、肌电手套等</div>
      </div>
      <div class="paragraph flex left">
        <div class="title">竞赛获奖：</div>
        <div>
          <div>第七届中国国际“互联网+”大学生创新创业大赛国赛金奖（Top5）</div>
          <div>
            第七届中国国际“互联网+”大学生创新创业大赛最具商业价值奖（全场唯一）
          </div>
        </div>
      </div>
    </div>
    <div class="division">
      <div class="title">荣誉获奖</div>
    </div>
    <div class="content">
      <div class="paragraph flex">
        <div>
          第七届中国国际“互联网+”大学生创新创业大赛<span
            style="font-weight: bold"
            >国赛金奖</span
          >（Top5）
        </div>
        <div>2021年10月</div>
      </div>
      <div class="paragraph flex">
        <div>
          第七届中国国际“互联网+”大学生创新创业大赛
          <span style="font-weight: bold">最具商业价值奖</span>（全场唯一）
        </div>
        <div>2021年10月</div>
      </div>
      <div class="paragraph flex">
        <div>全国大学生数学建模竞赛辽宁省赛区本科生一等奖</div>
        <div>2021年09月</div>
      </div>
      <div class="paragraph flex">
        <div>辽宁省大学生数学建模竞赛本科生一等奖</div>
        <div>2020年12月</div>
      </div>
      <div class="paragraph flex">
        <div>东北大学优秀学生干部标兵</div>
        <div>2020年12月</div>
      </div>
    </div>
    <div class="division">
      <div class="title">学生工作</div>
    </div>
    <div class="content">
      <div class="paragraph flex">
        <div class="title">
          东北大学计算机科学与工程学院计算机科学与技术1904班 班长
        </div>
        <div>2019年09月 – 至今</div>
      </div>
      <div class="paragraph flex">
        <div>
          从大一开始担任班长至今，作为班长，对待班级工作认真负责，严格要求自己，既要做好学生工作，也要注意自己的科研学习以及竞赛项目，在任期间获评校优秀学生干部标兵，班级获评校优秀班集体（两次）。
        </div>
      </div>
      <div class="paragraph flex">
        <div class="title">
          东北大学计算机科学与工程学院团委媒体中心技术支持部 副部长
        </div>
        <div>2020年09月 – 2021年07月</div>
      </div>
      <div class="paragraph flex">
        <div>
          大一时以部员身份加入技术支持部，认真学习PS、PR、AE等后期软件，并在大二时成为部门副部长，在部门内我主要负责部员的技术培训以及学院Bilibili账号的运营和直播，并在学年末评价中获评优秀。
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-var-requires
const neu = require("../assets/images/neu.png");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const wjx = require("../assets/images/wjx_white.jpg");
</script>

<style lang="stylus" scoped>
.resume-view
  padding 2rem
.header
  display flex
  & .main
    flex 1
    display flex
    flex-direction column
    justify-content center
    & .name
      font-size 2rem
      font-weight bold
      padding 1rem 0
    & .info
      font-size 1.5rem
      padding 0.1rem 0
.division
  text-align left
  position relative
  margin-bottom 20px
  & .title
    display inline-block
    font-size 2rem
    background-color var(--blue-deep)
    color white
    padding 0.125rem 1rem
    box-shadow rgba(0, 0, 0, 0.5) 2px 2px 10px
    &::after
      position absolute
      right 0
      bottom -1px
      left 0
      height 2px
      background-color var(--blue-deep)
      content ''
  &::after
    position absolute
    width 0
    height 0
    left -21px
    bottom -20px
    border-bottom 20px solid transparent
    border-left 20px solid transparent
    border-right 50px solid var(--blue-deeper)
    content ''
.content
  padding 0.5rem 0
  text-align left
  font-size 1.125rem
  .paragraph
    padding 0.125rem 0
    &.flex
      display flex
      justify-content space-between
      &.left
        justify-content flex-start
        & .title
          min-width 100px
          font-weight bold
    & .title
      font-weight bold
    &.flex-4
      display flex
      & div
        flex 1
</style>
