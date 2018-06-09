<template>
  <div class="shopCart">
    <div class="header">
      <i class="iconfont" @click="back"></i>
      <h1 class="title">购物车</h1>
    </div>
    <div class="operation">
      <p class="selected-good">已经选中<em>{{selectedGoods}}</em>商品</p>
      <span class="delect-all" @click="del">删除选中</span>
    </div>
    <scroll class="scroll-wrapper" :data="goodList" ref="shoCart">
      <div>
        <div class="shopCart-con" v-show="goodList.length">
          <div class="shipping-tips">
            <span>满79免运费</span>
            <a>凑单免运费</a>
          </div>
          <div class="choose-goods">
            <div class="goods-details" v-for="(item, index) in goodList" v-show="item.num > 0">
              <ul class="goods-wrapper">
                <li class="goods-item">
                  <label class="checkbox">
                    <input type="checkbox" :value="index" v-model="selectArr">
                  </label>
                  <div class="infor">
                    <img :src="item.pic">
                    <div class="details">
                      <p>{{item.name}}</p>
                      <strong>￥{{item.price}}</strong>
                      <del>￥{{item.mprice}}</del>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="number">
                <div class="number-operation">
                  <span class="jian" @click="decrease(index)">-</span>
                  <span class="val">{{item.num}}</span>
                  <span class="jia" @click="add(index)">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="!goodList.length" class="no-goods">
          <img src="http://m.173kz.com/img/car.jpg" alt="" />
          <p>购物车空空如也</p>
          <span class="btn">去逛逛</span>
        </div>
        <div class="recommend">
          <h2 class="title"><img src="http://m.173kz.com/img/tuijian.jpg" alt=""></h2>
          <ul class="recommend-goods" v-show="goodList.length">
            <li>
              <img src="http://img.173kz.com/FileUpload/ProductImgMobile/2015/05/150514162880/1505141628804083.jpg" alt="">
              <p>同仁堂 调经促孕丸 5g(50粒)*10袋</p>
              <div class="price">
                <span>¥16.50</span>
                <del>¥30.00</del>
              </div>
            </li>
            <li>
              <img src="http://img.173kz.com/FileUpload/PictureMobile/2015/7/30/2015730161554350.jpg" alt="">
              <p>同仁堂 同仁乌鸡白凤丸 36g(每100粒重12g)</p>
              <div class="price">
                <span>¥11.00</span>
                <del>¥13.50</del>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="footer-bar">
      <div class="choose">
        <label class="select-all">
          <input type="checkbox" class="checkbox" :checked="selectArr.length === goodList.length && goodList.length"  @click="selectAll" ref="sel" :disabled="!goodList.length" />全选
        </label>
        <p class="all-price">实付款：<strong>￥<em>{{totalPrice}}</em></strong></p>
      </div>
      <i class="pay">结算</i>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { mapActions } from 'vuex'
import { setCoutMixin } from 'common/js/mixin'

export default {
  mixins: [setCoutMixin],
  data() {
    return {
      selectArr: []
    }
  },
  computed: {
    totalPrice() {
      let total = 0

      this.selectArr.forEach((item) => {
        total += this.goodList[item].price * this.goodList[item].num
      })
      return total
    },
    selectedGoods() {
      let num = 0
      let len = this.goodList.length
      for (var i = 0; i < len; i++) {
        if (this.selectArr.indexOf(i) >= 0) {
          num += 1
        }
      }
      return num
    }
  },
  methods: {
    // 删除选中
    del() {
      let arr = []
      let len = this.goodList.length
      for (let i = 0; i < len; i++) {
        if (this.selectArr.indexOf(i) < 0) {
           arr.push(this.goodList[i])
        }
      }
      this.delGoodItem(arr)
      this.selectArr = []
      this.setCount(this.totalCount)
    },
    // 全选
    selectAll() {
      let _this = this
      if (!event.currentTarget.checked) {
        this.selectArr = []
      } else {
        // 实现全选
        _this.selectArr = []
        _this.goodList.forEach(function(item, i) {
          _this.selectArr.push(i)
        })
      }
    },
    back() {
      this.$router.back()
    },
    decrease(index) {
      this.decreaseGoodCount(index)
      this.setCount(this.totalCount)
    },
    add(index) {
      this.addGoodCount(index)
      this.setCount(this.totalCount)
    },
    ...mapActions([
      'addGoodCount',
      'decreaseGoodCount',
      'delGoodItem'
    ])
  },
  components: {
    Scroll
  },
  watch:{
    $route() {
      this.$refs.shoCart.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
.shopCart{
  color: #000;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  .header{
    width: 100%;
    @include ht(80px);
    z-index: 2;
    text-align: center;
    position: relative;
    i{
      position: absolute;
      left: 5%;
      top: 35%;
      width: 20px;
      height: 20px;
      border-left: 1px solid #000;
      border-top: 1px solid #000;
      transform: rotate(-45deg)
    }
    h1{
      font-weight: normal;
      font-size: 26px;
    }
  }
  .operation{
    overflow: hidden;
    border-top: 2px solid #eee; /* no */
    padding: 20px;
    width: 100%;
    font-size: 26px;
    background: #eee;
    .selected-good{
      float: left;
      line-height: 60px;
      em{
        color: #ff0000;
        font-style: normal;
      }
    }
    .delect-all{
      float: right;
      border-radius: 10px;
      width: 150px;
      @include ht(60px);
      text-align: center;
      background: #0f8fe8;
      color: #fff;
    }
  }
  .scroll-wrapper{
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
    .shopCart-con{
      padding: 20px;
      .shipping-tips{
        font-size: 24px;
        overflow: hidden;
        span{
          float: left;
        }
        a{
          float: right;
          color: #ff0000;
        }
      }
      .goods-wrapper{
        .goods-item{
          overflow: hidden;
          margin-top: 20px;
          display: flex;
          .checkbox{
            margin-top: 8.5%;
            margin-right: 20px;
          }
          .infor{
            overflow: hidden;
            flex: 1;
            &>*{
              float: left;
            }
            img{
              width: 120px;
              height: 120px;
            }
            .details{
              margin-left: 20px;
              max-width: 70%;
              font-size: 20px;
              line-height: 30px;
              p{
                font-size: 26px;
                @include ht(40px);
                @include toe();
              }
              strong{
                color: #ff0000;
                font-size: 26px;
                display: block;
                line-height: 50px;
              }
              del{
                color: #aeaeae;
              }
            }
          }
        }
      }
      .number{
        overflow: hidden;
        .number-operation{
          float: right;
          font-size: 24px;
          border: 1px solid #dcdcdc; /* no */
          text-align: center;
          box-sizing: border-box;
          &>*{
            float: left;
            width: 50px;
            @include ht(50px);
          }
          .val{
            width: 80px;
            border-left: 1px solid #dcdcdc; /* no */
            border-right: 1px solid #dcdcdc; /* no */
          }
        }
      }
    }
    .no-goods{
      text-align: center;
      font-size: 26px;
      padding: 80px 0;
      img{
        margin: 0 auto 30px;
        display: block;
      }
      span{
        width: 80%;
        @include ht(50px);
        margin: 60px auto 0;
        display: block;
        background: #1b9ad8;
        font-size: 30px;
        color: #fff;
        border-radius: 10px;
        text-align: center;
      }
    }
    .recommend{
      padding-bottom: 320px;
      .title{
        background: #f1f2f6;
        img{
          display: block;
          height: 90px;
          margin: 0 auto;
        }
      }
      .recommend-goods{
        overflow: hidden;
        li{
          float: left;
          width: 50%;
          text-align: center;
          padding: 10px 0;
          img{
            width: 220px;
            height: 220px;
            display: block;
            margin: 0 auto 10px;
          }
          p{
            margin: 0 auto;
            font-size: 24px;
            @include ht(50px);
            @include toe(90%);
          }
          .price{
            font-size: 24px;
            line-height: 50px;
            span{
              color: #ff0000;
            }
            del{
              color: #AEAEAE;
            }
          }
        }
      }
    }
  }
  .footer-bar{
    position: fixed;
    left: 0;
    bottom: 0;
    overflow: hidden;
    border-top: 2px solid #eee; /* no */
    padding: 20px;
    font-size: 28px;
    width: 100%;
    background-color: #fff;
    .choose{
      float: left;
      margin-top: 18px;
      &>*{
        display: inline-block;
        vertical-align: middle;
      }
      .select-all{
        &>*{
          display: inline-block;
          vertical-align: middle;
        }
        .checkbox{
          margin-right: 5px;
        }
      }
      .all-price{
        margin-left: 20px;
        strong{
          font-weight: normal;
          color: #ff0000;
          em{
            font-style: normal;
          }
        }
      }
    }
    .pay{
      float: right;
      font-size: 28px;
      padding: 22px 44px;
      background: #e9332d;
      border-radius: 10px;
      color: #fff;
      font-style: normal;
    }
  }
}
</style>
