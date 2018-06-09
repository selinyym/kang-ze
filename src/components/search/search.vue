<template>
  <div class="search">
    <div class="kinds-wrap">
      <div class="kinds-block" @click="showCategory">
        <i class="iconfont yym-leimu"></i>
        <span class="txt">分类</span>
      </div>
    </div>
    <div class="search-wrap">
      <div class="search-input">
        <input type="text" :placeholder="placeholder" v-model="query">
      </div>
      <div class="search-btn" tag="div" @click="search(query)">
        <i class="iconfont yym-sousuo"></i>
        <span class="txt">搜索</span>
      </div>
    </div>
  </div>
</template>

<script>
import "assets/iconfont/iconfont.css"
import {debounce} from 'common/js/dom'

export default {
  props: {
    placeholder: {
      type: String,
      default: '买药！就来康泽掌上药店！'
    },
    keyVal: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      query: ''
    }
  },
  created() {
    this.query = this.keyVal
  },
  methods: {
    showCategory() {
      this.$router.push({
        path: '/kinds'
      })
    },
    search(query) {
      this.$router.push({
        path: '/search',
        query: {
          kw: `${query}`
        }
      })
    }
  },
  watch: {
    keyVal(newVal) {
      this.query = newVal
    }
  }
}
</script>

<style scoped lang="scss">

.search{
  display: flex;
  height: 90px;
  padding: 0 8%;
  overflow: hidden;
  background-color: rgba(0,109,169,0.8);
  &>*{
    float: left;
  }
  .kinds-wrap{
    height: 90px;
    padding-right: 10px;
    padding-top: 14px;
    text-align: center;
    .kinds-block{
      &>*{
        display: block;
        margin: 0 auto;
        color: $color-text-white;
        font-size: 38px;
      }
      .txt{
        font-size: 22px;
        color: $color-text-white;
      }
    }
  }
  .search-wrap{
    flex: 1;
    margin-top: 15px;
    &>*{
      float: left;
    }
    .search-input{
      width: 70%;
      input{
        display: block;
        width: 100%;
        @include ht(60px);
        font-size: 24px;
        padding-left: 16px;
        border-bottom-left-radius: 14px;
        border-top-left-radius: 14px;
        background-color: #fff;
      }
    }
    .search-btn{
      position: relative;
      width: 30%;
      @include ht(60px);
      background-color: #57d4f4;
      border-bottom-right-radius: 14px;
      border-top-right-radius: 14px;
      text-align: center;
      color: $color-text-white;
      i{
        position: absolute;
        left: 5px;
        top: 0;
        bottom: 0;
        margin: auto;
        font-size: 38px;
      }
      .txt{
        display: block;
        font-size: 24px;
      }
    }
  }
}

</style>
