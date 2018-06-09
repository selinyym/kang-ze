<template>
  <div class="kinds">
    <search></search>
    <div class="kinds-con">
      <scroll class="kinds-left" :data="kinds.title">
        <ul>
          <li
            class="item"
            v-for="(item,index) in kinds.title"
            :data-index="index"
            @click="selectItem(index)"
            :class="{'current': currentIndex === index}"
          >
            <i class="icon" :style="`background: url(${item.icon}) 0 0 / 100% no-repeat`"></i>
            <span>{{item.txt}}</span>
          </li>
        </ul>
      </scroll>
      <scroll class="kinds-right" :data="kinds.list">
        <div>
          <ul
            v-for="(listItem, index) in kinds.list"
            v-if="currentIndex === index"
            class="listItem"
          >
            <li class="item" v-for="item in listItem.infos">
              <p>{{item.txt}}</p>
              <ul class="desc-wrapper">
                <li v-for="descItem in item.desc">{{descItem}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Search from 'components/search/search'
import Tab from 'components/tab/tab'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 50

export default {
  data() {
    return {
      kinds: [],
      showDesc: false,
      currentIndex: 0
    }
  },
  created() {
    this.touch = {}
   this._getKinds()
  },
  methods: {
    selectItem(index) {
       this.currentIndex = index
    },
    _getKinds() {
      this.$http.get('/api/kinds').then((res) => {
        this.kinds = res.data.data
      });
    }
  },
  components: {
    Scroll,
    Search,
    Tab
  }
}
</script>

<style scoped lang="scss">
.kinds-con{
  position: fixed;
  width: 100%;
  left: 0;
  top: 90px;
  bottom: 80px;
  display: flex;
  .kinds-left{
    height: 100%;
    overflow: hidden;
    width: 40%;
    margin-right: 2%;
    background: #fff;
    ul{
      background: #fff;
      .item{
        border-bottom: 1px solid #ddd; /* no */
        text-align: left;
        color: #424242;
        background: #fff;
        font-size: 16px;
        height: 80px;
        line-height: 80px;
        &.current{
          background: url('on.png') right no-repeat;
          background-size: 15px 80px;
        }
        &>*{
          display: inline-block;
          vertical-align: middle;
          margin-left: 20px;
        }
        .icon{
          width: 50px;
          height: 50px;
        }
      }
    }
  }
  .kinds-right{
    flex: 1;
    height: 100%;
    overflow: hidden;
    background: #fff;
    .listItem{
      box-sizing: border-box;
      padding-top: 10px;
      .item{
        p{
          width: 100%;
          background: #f8f8f8;
          @include ht(60px);
          padding-left: 20px;
          font-size: 16px;
          color: #000;
          border-top: 1px solid #e0e0e0; /* no */
        }
        .desc-wrapper{
          overflow: hidden;
          li{
            text-align: center;
            width: 50%;
            float: left;
            font-size: 16px;
            @include ht(60px);
          }
        }
      }
    }
  }
}

</style>
