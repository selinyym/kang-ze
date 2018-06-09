<template>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/home">
        <i class="iconfont yym-home"></i>
        <span>商城首页</span>
      </router-link>
    </div>
    <div class="tab-item">
      <router-link to="/kinds">
        <i class="iconfont yym-fenlei"></i>
        <span>分类</span>
      </router-link>
    </div>
    <div class="tab-item">
      <router-link to="/shopCar">
        <i class="iconfont yym-gouwuche"></i>
        <span>购物车</span>
        <em>{{count}}</em>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'count'
    ])
  }
}
</script>

<style scoped lang="scss">
.tab{
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 80px;
  padding-top: 4px;
  margin: 0 auto;
  display: flex;
  text-align: center;
  z-index: 99;
  border-top: 1px solid #eee;
  background-color: #fff;
  .tab-item{
    flex: 1;
    position: relative;
    i {
      font-size: 42px;
      display: block;
    }
    span{
      font-size: 22px;
      display: block;
    }
    em{
      position: absolute;
      left: 52%;
      top: 0;
      font-style: normal;
      background-color: #ff0000;
      color: #fff;
      width: 26px;
      @include ht(26px);
      border-radius: 50%;
      text-align: center;
      font-size: 16px;
    }
    .router-link-active {
      color: $color-theme;
    }
  }
}
</style>
