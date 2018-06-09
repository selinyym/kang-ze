<template>
  <div class="price">
    <div class="new-price">
      康 泽 价：<span>￥{{newPrice}}</span>
    </div>
    <div class="m-price">
      市 场 价：<del>￥{{mPrice}}</del>
    </div>
  </div>
</template>
<script>
import { returnFloat } from 'common/js/dom'
export default {
  props: {
    good: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
      newPrice: '',
      mPrice: ''
    }
  },
  created() {
    const selectedGood = this.good.details[0].suit[0]
    this._returnFloat(selectedGood, 1)
  },
  methods: {
    _returnFloat(val, count) {
      this.newPrice = returnFloat(val.price * count)
      this.mPrice = returnFloat(val.mprice * count)
    }
  }
}
</script>
<style scoped lang="scss">
.price{
  width: 92%;
  @include ht(60px)
  background: url(title_bg.png) no-repeat;
  background-size: 100% 100%;
  font-size: 24px;
  margin-bottom: 20px;
  overflow: hidden;
  color: #fff;
  font-size: 20px;
  .new-price{
    float: left;
    margin-left: 10px;
    span{
      font-size: 28px;
    }
  }
  .m-price{
    float: right;
    margin-right: 8%;
    del{
      font-size: 28px;
    }
  }
}
</style>
