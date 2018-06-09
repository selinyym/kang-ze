<template>
  <div class="carControl">
    <span>购 买 数 量：</span>
    <div class="carControl-wrapper">
      <div class="carControl-btn">
        <span class="buttonleft btn" @click="decreaseCart()">-</span>
        <em class="num">{{good.count}}</em>
        <span class="buttonright btn" @click="addCart()">+</span>
      </div>
      <p class="state">（库存状态：现在有货）</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    good: {
      type: Object,
      default: []
    }
  },
  methods: {
    decreaseCart() {
      if(this.good.count === 1) return
      this.good.count --
      this.$emit('changePrice', this.good.count)
    },
    addCart() {
      this.good.count ++
      this.$emit('changePrice', this.good.count)
    }
  }
}
</script>

<style scoped lang="scss">
.carControl{
  overflow: hidden;
  &>*{
    float: left;
    vertical-align: middle;
  }
  span{
    width: 28%;
    text-align: right;
    line-height: 50px;
    font-size: 20px;
  }
  .carControl-wrapper{
    width: 72%;
    .carControl-btn{
      overflow: hidden;
      width: 60%;
      border: 1px solid #ff0000; /* no */
      border-radius: 10px;
      margin: 5px 0;
      box-sizing: border-box;
      &>*{
        float: left;
        @include ht(40px);
        text-align: center;
      }
      .btn{
        color: #fff;
        width: 30%;
        cursor: pointer;
        font-size: 30px;
        background-color: #ff0000;
      }
      .num{
        width: 40%;
        font-style: normal;
        color: #000;
        font-size: 24px;
      }
      .buttonright{
        float: right;
      }
    }
  }
  .state{
    font-size: 20px;
    line-height: 35px;
    color: #ff0000;
  }
}
</style>
