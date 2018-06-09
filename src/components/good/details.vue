<template>
  <div class="good">
    <div class="nav-wrapper" ref="nav">
      <i class="iconfont yym-back" @click="back"></i>
      <nav class="navbar">
        <li
          v-for="(item, index) in nav"
          @click="selectList(index)"
          :class="{'act': navIndex === index}"
        >
          {{item}}
        </li>
      </nav>
    </div>
    <scroll
      class="good-con"
      v-if="good.details"
      :data="good"
      ref="good"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      @scroll="scroll"
    >
      <div>
        <div class="slider-wrapper">
          <pic :good="good" :currentIndex="currentIndex"></pic>
        </div>
        <name :good="good" :currentIndex="currentIndex"></name>
        <div class="specification">
          <price :good="good" ref="price"></price>
          <size :good="good" :currentIndex="currentIndex" @change="change"></size>
          <suit :good="good" :currentIndex="currentIndex" @changeCls="changeCls" ref="suit"></suit>
          <group-suit :good="good" :currentIndex="currentIndex" @delClass="delClass" ref="groupSuit"></group-suit>
          <carControl :good="good" @changePrice="changePrice" @showConfirm="showConfirm"></carControl>
        </div>
        <div class="tips-wrappper">
          <span class="tips">温馨提示：</span>
          <p class="tips-txt">部分商品包装更换频繁，如货品与图片不完全一致。请以收到的商实物为准。（如需协助请拨打<em>400-8678-391</em>）</p>
          <ul class="tips-icon">
            <li v-for="(item,index) in iconsTxt">
              <i :style="`background:url(http://m.173kz.com/img/view/sb_icon0${index+1}.png) 0 0 / 100%`"></i>
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
        <recommend :good="good" :currentIndex="currentIndex" ref="recommend"></recommend>
        <infor :good="good" :currentIndex="currentIndex" ref="infor" @changeInfor="changeNav"></infor>
      </div>
    </scroll>
    <footer class="footer">
      <ul class="footer-list">
        <li class="favorite">
          <i class="iconfont yym-shoucang"></i>收 藏
        </li>
        <li class="ask">
          <a href="tel:400-8678-391">
            <i class="iconfont yym-zixun"></i>在线咨询
          </a>
        </li>
        <li class="addshopcart" @click="showConfirm">加入购物车</li>
      </ul>
    </footer>
    <top-tips ref="topTip">
      <div class="tip-title">
        <span class="text">添加成功，在购物车等亲~</span>
      </div>
    </top-tips>
  </div>
</template>

<script>
import Vue from "vue"
import Scroll from 'base/scroll/scroll'
import Pic from 'components/good/pic'
import Name from 'components/good/name'
import Price from 'components/good/price'
import Size from 'components/good/size'
import Suit from 'components/good/suit'
import GroupSuit from 'components/good/groupSuit'
import CarControl from 'components/carControl/carControl'
import Recommend from 'components/good/recommend'
import Infor from 'components/good/infor'
import topTips from 'base/topTips/topTips'
import { insertArray } from 'common/js/dom'
import { mapActions } from 'vuex'
import { setCoutMixin } from 'common/js/mixin'


export default {
  mixins: [setCoutMixin],
  data() {
    return {
      good: [],
      currentIndex: 0,
      navIndex: 0,
      scrollY: 0
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.food = []
    this.nav = ["商品","详情","说明书"]
    this.iconsTxt = ["国家审批","真诚服务","满79元包邮","品质保障"]
    this._getGood()
  },
  mounted(){
    if(this.$refs.recommend) {
      this.scrollHeight = this.$refs.nav.clientHeight + this.$refs.recommend.$el.clientHeight
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    // 导航栏
    selectList(index) {
      this.navIndex = index
      if(index === 0) {
        this.$refs.good.scrollTo(0, 0, 500)
      } else if (index === 1) {
        this.$refs.good.scrollToElement(this.$refs.infor.$el, 500, 0, -50)

        this.$refs.infor.$data.classIndex = 0
      } else {
        this.$refs.good.scrollToElement(this.$refs.infor.$el, 500, 0, -50)
        this.$refs.infor.$data.classIndex = 1
      }
    },
    changeNav(index) {
      this.navIndex = index + 1
    }, 
    // 产品规格
    change(index) {
      this.currentIndex = index
      const selectedGood = this.good.details[index].suit[0]
      this.$refs.price._returnFloat(selectedGood, 1)
    },
    // 疗程套餐
    changeCls(index) {
      this.$refs.groupSuit.changeClass()
      const suit = this.good.details[this.currentIndex].suit[index]
      this.good.count = suit.num
      this.$refs.price._returnFloat(suit, this.good.count)
    },
    // 联合套餐
    delClass(index) {
      this.$refs.suit.changeClass()
      const suitWrapper = this.good.details[this.currentIndex].suitWrapper[index]
      this.good.count = suitWrapper.num
      this.$refs.price._returnFloat(suitWrapper, this.good.count)
    },
    // 购物车
    changePrice(count) {
      const suit = this.$refs.suit.getSuit() || this.$refs.groupSuit.getSuit()
      this.$refs.price._returnFloat(suit, count)
    },
    // 加入购物车
    showConfirm() {
      const goodItem = this.good.details[this.currentIndex]
      const txt = goodItem.title
      const suit = this.$refs.suit.getSuit() || this.$refs.groupSuit.getSuit()
      const name = txt + ' ' + suit.txt
      Vue.set(suit,'name', name)
      Vue.set(suit,'pic', goodItem.pic[0])

      this.saveGoodList({
        key: suit,
        valNum: suit.num,
        num: this.good.count
      })
      this.setCount(this.totalCount)
      this.$refs.topTip.show()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _getGood() {
      if (!this.$route.params.good) {
        this.$router.push('/home')
        return
      }
      this.good = this.$route.params.good
      if(!this.good.count){
        Vue.set(this.good,'count',1)
      }
    },
    ...mapActions([
      'saveGoodList'
    ])
  },
  components: {
    Scroll,
    Name,
    Pic,
    Price,
    Size,
    Suit,
    GroupSuit,
    CarControl,
    Recommend,
    Infor,
    topTips
  },
  watch: {
    '$route': '_getGood',
    scrollY(newVal) {
      let inforOffsetTop = this.$refs.infor.$el.getBoundingClientRect().top
      if(inforOffsetTop < this.scrollHeight) {
        if(this.$refs.infor.$data.classIndex === 0) {
          this.navIndex = 1
        }
        if(this.$refs.infor.$data.classIndex === 1) {
          this.navIndex = 2
        }
      }else {
        this.navIndex = 0
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
.good{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: $color-background;
  z-index: 100;
  .nav-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 99;
    background: #fff;
    box-shadow: 0 0 3px #333; /*no*/
    .iconfont{
      font-size: 40px;
      position: absolute;
      left: 10px;
      top: 12px;
    }
    .navbar{
      text-align: center;
      li{
        display: inline-block;
        @include ht(70px);
        margin: 0 10px;
        font-size: 28px;
        color: #000;
        box-sizing: border-box;
        &.act{
          border-bottom: 2px solid #000; /*no*/
        }
      }
    }
  }
  .good-con{
    height: 100%;
    overflow: hidden;
    padding-bottom: 80px;
    box-sizing: border-box;
    .slider-wrapper{
      position: relative;
      width: 100%;
      overflow: hidden;
      margin: 70px 0 10px;
    }
    .specification{
      background: #fff;
      margin-top: 20px;
      padding: 20px 15px;
    }
    .tips-wrappper{
      background: #fff;
      margin-top: 20px;
      padding: 4% 2%;
      .tips{
        font-weight: bold;
        font-size: 28px;
        color: #000;
      }
      .tips-txt{
        font-size: 18px;
        color: #000;
        margin-top: 20px;
        line-height: 30px;
        em{
          color: #ff0000;
          font-style: normal;
        }
      }
      .tips-icon{
        display: flex;
        margin: 20px 0;
        li{
          flex: 1;
          text-align: center;
          font-size: 16px;
          i{
            width: 80px;
            height: 80px;
            display: block;
            margin: 0 auto 10px;
          }
        }
      }
    }
  }
  .footer{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #f2f2f2;
    font-size: 26px;
    border-top: 1px solid #fff; /* no */
    .footer-list{
      display: flex;
      text-align: center;
      li{
        color: #000;
        i{
          display: block;
          font-size: 46px;
          margin: 6px 0;
          color: #ff0000;
        }
        &.favorite{
          width: 160px;
          i{
            color: #2d2d2d;
            &.act{
              color: #ff0000;
              &.yym-shoucang:before {
                content: "\e62b";
              }
            }
          }
        }
        &.ask{
          flex: 1;
          margin-top: 20px;
          i{
            display: inline-block;
            margin-right: 20px;
            vertical-align: middle
          }
        }
        &.addshopcart{
          flex: 1;
          @include ht(90px);
          color: #fff;
          background: #ff0000;
        }
      }
    }
  }
  .tip-title{
    font-size: 26px;
    line-height: 50px;
    color: #fff;
    text-align: center;
  }
}
</style>
