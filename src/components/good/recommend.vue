<template>
  <div class="recommend">
    <h3>更多推荐</h3>
    <swiper class="goods-wrapper">
      <swiper-slide
        v-for="(item,index) in good.details[currentIndex].recommend"
        :key="index"
      >
        <img :src="item.picLink" alt="">
        <div class="price-wrapper">
          <p class="desc">{{item.txt}}</p>
          <span class="price">¥{{item.price}}</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import Swiper from 'base/swiper/swiper'
import { goodPropsMixin } from 'common/js/mixin'

export default {
  mixins: [goodPropsMixin],
  components: {
    Swiper
  }
}
</script>
<style scoped lang="scss">
.recommend{
  text-align: center;
  margin-top: 20px;
  h3{
    font-size: 28px;
    font-weight: normal;
    text-align: center;
    line-height: 60px;
    font-weight: bold;
    background-color: #fff;
  }
  .goods-wrapper{
    margin: 20px 0 0;
    font-size: 20px;
    position: relative;
    img{
      display: block;
      width: 160px;
      height: 160px;
      padding: 10px;
      margin: 0 auto;
      border: 1px solid #c6c6c6; /*no*/
      border-radius: 10%;
      background: #fff;
    }
    p{
      @include ht(50px);
      @include toe();
    }
    span{
      display: block;
      font-size: 26px;
      color: #ff0000;
      margin: 20px 0;
    }
  }
}
</style>
