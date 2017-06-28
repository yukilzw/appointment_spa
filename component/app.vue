<template>
  <div class="page">
    <header></header>
    <transition name="route">
       <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="less" scoped>
.route-leave-active{
  opacity:0;
  transition: all .3s
}
.route-enter{
  opacity:0;
}
.route-enter-active{
  transition: all .3s;
}
</style>