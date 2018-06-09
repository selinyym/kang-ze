<template>
  <div class="home">
    <search></search>
    <scroll ref="scroll" :data="home" class="home-content">
      <div>
        <div class="slider-wrapper" v-if="home.sliders">
          <slider :showDot="false">
            <div v-for="item in home.sliders">
              <a :href="item.urlLink">
                <img :src="item.picLink" class="needsclick"></img>
              </a>
            </div>
          </slider>
        </div>
        <nav class="nav">
          <ul class="nav_box">
            <li v-for="item in home.icons" @click="linkTo(item)" ref="navItem">
              <a :href="item.urlLink">
                <i :style="`background: url(${item.iconLink}) 0px 0px / 100% no-repeat`"></i>
                <span>{{item.txt}}</span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="activity" v-show="time.leftTime>0">
          <p class="title">
            <strong>秒杀专区</strong>
            <span>距离结束还剩</span>
          </p>
          <div class="time">
            <em>{{time.d}}</em>天
            <em>{{time.h}}</em>时
            <em>{{time.m}}</em>分
            <em>{{time.s}}</em>秒
          </div>
          <swiper v-if="home.activity" class="goods-wrapper">
            <swiper-slide
              v-for="(item,index) in home.activity"
              class="goods-item"
              :key="index"
              @click.native="selectItem(item)"
            >
              <a target="_blank">
                <img :src="item.picLink" alt="">
                <div class="price-wrapper">
                  <div class="price">
                    <em>¥{{item.price}}</em>
                    <del>¥{{item.oldPrice}}</del>
                  </div>
                  <p class="desc">{{item.txt}}</p>
                </div>
              </a>
            </swiper-slide>
          </swiper>
        </div>

        <div class="hotDep-wrapper">
          <titleWrapper></titleWrapper>
          <ul class="hotDep-content">
            <li
              class="hotDep-item"
              v-for="(item,index) in home.department"
              :style="`background-color: ${bgColor[index]}`"
              @click="search(item.id)"
            >
              <a>
                <div class="desc">
                  <p :style="`color: rgb${nameColor[index]}`">{{item.title}}</p>
                  <span :style="`color: rgb${descColor[index]}`">{{item.txt}}</span>
                </div>
                <img :src="item.picLink">
              </a>
            </li>
          </ul>
        </div>

        <div class="like-wrapper">
          <titleWrapper :desc="desc"></titleWrapper>
          <ul class="list-wrapper">
            <li v-for="item in home.like" class="list-item" @click="selectItem(item)">
              <a>
                <img :src="item.picLink" alt="">
                <div class="price">
                  <span>¥{{item.price}}</span>
                  <del>¥{{item.oldPrice}}</del>
                </div>
                <p>{{item.txt}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Search from 'components/search/search'
import Tab from 'components/tab/tab'
import Slider from 'base/slide/slide'
import Scroll from 'base/scroll/scroll'
import TitleWrapper from 'base/title/title'
import { freshTime } from 'common/js/time'
import Swiper from 'base/swiper/swiper'
export default {
  data() {
    return {
      home: [],
      time: [],
      desc:{
        title:"猜你喜欢",
        englishName:"HOT LIST"
      }
    }
  },
  created() {
    this.bgColor = ['#c8edfa','#ffefb6','#bedaf7','#b2f0f1','#bee6f7','#fde8d0']
    this.nameColor = ['(0, 160, 228)','(252, 148, 0)','(20, 115, 196)','(1, 162, 172)','(0, 152, 216)','(249, 135, 0)']
    this.descColor = ['(40, 171, 227)','(255, 180, 0)','(40, 131, 227)','(3, 184, 195)','(40, 171, 227)','(255, 152, 29)']
    this._getTime()
    this._getHome()
  },
  methods: {
    linkTo(item) {
      if(item.txt === '全部分类' || item.txt === '慢 性 病'){
        this.$router.push({
          path: '/kinds'
        })
      }else if(item.txt === '购 物 车') {
        this.$router.push({
          path: '/shopCar'
        })
      }else if(item.id) {
        this.$router.push({
          path: '/search',
          query: {
            id: `${item.id}`
          }
        })
      }else if(item.txt === '良济堂滋补'){
        this.$router.push({
          path: '/search',
          query: {
            kw: '良济堂'
          }
        })
      }
    },
    search(id){
      this.$router.push({
        path: '/search',
        query: {
          id: `${id}`,
          kw: ''
        }
      })
    },
    selectItem(item) {
      this.$router.push({
        name: 'good',
        params:{
          id: `${item.id}`,
          good: item
        }
      })
    },
    _getHome() {
      this.$http.get('/api/home').then((res) => {
        this.home = res.data.data
      });
    },
    _getTime() {
      this.time = freshTime()
    }
  },
  watch: {
    time() {
      setTimeout(() => {
        this._getTime()
      }, 1000)
    }
  },
  components: {
    Slider,
    Scroll,
    TitleWrapper,
    Swiper,
    Search,
    Tab
  }
}
</script>

<style scoped lang="scss">
.home{
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  .home-content{
    height: 100%;
    overflow: hidden;
    .slider-wrapper{
      position: relative;
      width: 100%;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .nav {
      color: #707070;
      font-size: 18px;
      text-align: center;
      background-color: #fff;
      padding-top: 26px;
      .nav_box{
        overflow: hidden;
        li{
          width: 25%;
          float: left;
          margin-bottom: 40px;
          i{
            display: block;
            margin: 0 auto;
            width: 110px;
            height: 110px;
            margin-bottom: 16px;
          }
        }
      }
    }
    .activity{
      position: relative;
      .title{
        font-size: 26px;
        padding: 20px 0;
        text-align: center;
        strong{
          font-weight: normal;
          color: red;
        }
      }
      .time{
        font-size: 16px;
        display: table;
        margin: 0 auto;
        em{
          color: #fff;
          text-align: center;
          @include ht(30px);
          padding: 0 8px;
          display: inline-block;
          font-style: normal;
          background: #484b54;
          border-radius: 8px;
          margin-right: 5px;
          &:nth-of-type(4){
            background: red;
          }
        }
      }
      .goods-wrapper{
        width: 100%;
        padding: 20px 0;
        .goods-item{
          border: 1px solid #e0e0e0; /* no */
          background: #fff;
          img{
            display: block;
            width: 70%;
            margin: 0 auto;
          }
          .price-wrapper{
            max-width: 90%;
            margin:0 auto;
            .price{
              overflow: hidden;
              line-height: 40px;
              em{
                float: left;
                color: red;
                font-size: 20px;
                font-style: normal;
              }
              del{
                float: left;
                margin-left: 10px;
                font-size: 20px;
              }
            }
            .desc{
              @include toe();
              @include ht(30px);
              font-size: 20px;
              margin-bottom: 10px;
            }
          }
        }

      }
    }
    .hotDep-wrapper{
      background-color: #fff;
      padding-bottom: 10px;
      .title-wrapper{
        background-color: #fff;
      }
      .hotDep-content{
        width: 96%;
        margin: 0 auto;
        overflow: hidden;
        .hotDep-item{
          border-radius: 10px;
          font-size: 23px;
          height: 130px;
          width: 49%;
          margin-bottom: 10px;
          &:nth-of-type(odd){
            float: left;
          }
          &:nth-of-type(even){
            float: right;
          }
          a{
            padding: 20px 15px;
            display: block;
            width: 100%;
            height: 130px;
            .desc{
              width: 60%;
              float: left;
              margin-top: 20px;
              P{
                @include ht(32px);
              }
              span{
                display: block;
                font-size: 16px;
                @include ht(24px);
                @include toe();
              }
            }
            img{
              float: right;
              width: 100px;
            }
          }
        }
      }
    }
    .like-wrapper{
      font-size: 12px;
      width: 96%;
      margin: 0 auto;
      padding-bottom: 180px;
      overflow: hidden;
      .list-wrapper{
        .list-item{
          padding: 20px 16px;
          background: #fff;
          border: 1px solid #e0e0e0; /* no */
          font-size: 20px;
          width: 49%;
          margin-bottom: 10px;
          &:nth-of-type(odd){
            float: left;
          }
          &:nth-of-type(even){
            float: right;
          }
          a{
            color: $color-text;
            img{
              width: 80%;
              display: block;
              margin: 0 auto;
            }
            .price{
              overflow: hidden;
              width: 100%;
              span{
                font-size: 30px;
                @include ht(46px);
                color: #020202;
              }
            }
            p{
              @include ht(26px);
              @include toe();
            }
          }
        }
      }
    }
  }
}
</style>
