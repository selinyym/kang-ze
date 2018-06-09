<template>
  <div class="size-wrapper">
    <span class="size-title">疗 程 套 餐：</span>
    <ol class="size-list">
      <li
        v-for="(item, index) in good.details[currentIndex].suit"
        class="size-item"
        :class="{'current': classIndex === index}"
        @click="select(index)"
      >
        {{item.txt}}
        <i></i>
      </li>
    </ol>
  </div>
</template>

<script>
import { goodPropsMixin } from 'common/js/mixin'

export default {
  mixins: [goodPropsMixin],
  data(){
    return{
      classIndex: this.currentIndex
    }
  },
  methods: {
    select(index) {
      this.classIndex = index
      this.good.count = this.good.details[this.currentIndex].suit[index].num
      this.$emit("changeCls", index)
    },
    changeClass() {
      this.classIndex = -1
    },
    getSuit() {
      if(this.classIndex >=0) {
        return this.good.details[this.currentIndex].suit[this.classIndex]
      }
    }
  },
  watch:{
    currentIndex() {
      this.classIndex = 0
    }
  }
}
</script>
<style scoped lang="scss">
.size-wrapper{
  overflow: hidden;
  margin-bottom: 10px;
  &>*{
    float: left;
    vertical-align: middle;
  }
  .size-title{
    font-size: 20px;
    line-height: 50px;
    width: 28%;
    text-align: right;
  }
  .size-list{
    width: 72%;
    .size-item{
      position: relative;
      text-align: center;
      display: inline-block;
      padding: 0 10px;
      font-size: 18px;
      margin-right: 10px;
      @include ht(40px);
      margin-top: 5px;
      box-sizing: border-box;
      border: 1px solid #b2b2b2; /*no*/
      @include toe();
      &:last-child {
        margin-right: 0;
      }
      &.current{
        border-color: #FF0000;
        i{
          display: block;
          width: 15px;
          height: 15px;
          position: absolute;
          bottom: 0;
          right: 0;
          background: url(gou.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
