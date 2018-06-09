<template>
  <div class="size-wrapper" v-if="good.size.length">
    <span class="size-title">产 品 规 格：</span>
    <ol class="size-list">
      <li
        v-for="(item, index) in good.size"
        class="size-item"
        :class="{'current': classIndex === index}"
        @click="select(index)"
      >
        {{item}}
        <i></i>
      </li>
    </ol>
  </div>
</template>

<script>
import { returnFloat } from 'common/js/dom'
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
      if(this.classIndex == index){
        return
      }
      this.classIndex = index
      this.good.count = 1
      this.$emit('change', index)
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
