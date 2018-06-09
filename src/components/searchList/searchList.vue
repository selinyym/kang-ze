<template>
  <div class="search-wrapper">
    <search :keyVal="this.$route.query.kw"></search>
    <scroll
      :data="result"
      ref="search"
      class="search-list"
      :pullUp="pullUp"
      @scrollToEnd="_searchMore"
    >
      <ul class="search-content">
        <li class="list-item" v-for="item in result">
          <a>
            <div class="list-con">
              <img v-lazy="item.pic" >
              <div class="list-desc">
                <p>{{item.Name}}</p>
                <span>¥ {{item.MemberPrice}}</span>
                <del>¥ {{item.MarketPrice}}</del>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <div class="loading-wrapper" v-show="!showNoResult">
        <loading title=""></loading>
      </div>
      <div class="no-result-wrapper" v-show="showNoResult && !result.length">
        <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
    </scroll>
    <tab></tab>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Search from 'components/search/search'
import Tab from 'components/tab/tab'
import Loading from 'base/loading/loading'
import NoResult from 'base/noResult/noResult'
import { getSearchList } from 'api/search'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      page: 1,
      result: [],
      pullUp: true,
      showNoResult: false,
      hasMore: true
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult,
    Search,
    Tab
  },
  created() {
    this._getSearchList()
  },
  methods: {
    _getSearchList() {
      this.showNoResult = false
      if(this.$refs.search) {
        this.$refs.search.scrollTo(0, 0)
      }
      let router = this.$route.query
      getSearchList(router.id, this.page, router.kw).then(res => {
        this.result = res
        this.showNoResult = true
      })
    },
    _searchMore() {
      let router = this.$route.query
      if(router.id) {
        this.page ++
        getSearchList(router.id, this.page, router.kw).then(res => {
          this.result = this.result.concat(res)
          this.showNoResult = true
        })
      }
    },
    ...mapActions([
      'showSearchList'
    ])
  },
  watch: {
    '$route': '_getSearchList'
  }
}
</script>
<style scoped lang="scss">
.search-wrapper{
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 80px;
  background: #fff;
  box-sizing: border-box;
  padding-bottom: 90px;
  .search-list{
    height: 100%;
    overflow: hidden;
    position: relative;
    .search-content{
      .list-item{
        overflow: hidden;
        padding: 20px 20px;
        border-bottom: 1px solid #eee; /* no */
        &:nth-last-of-type(1){
          border: none;
        }
        .list-con{
          display: flex;
          overflow: hidden;
          &>*{
            float: left;
          }
          img{
            width: 100px;
            height: 100px;
            padding: 5px;
          }
          .list-desc{
            font-size: 14px;
            max-width: 80%;
            flex: 1;
            padding-top: 5px;
            margin-left: 20px;
            &>*{
              display: block;
            }
            p{
              @include ht(40px);
              @include toe();
            }
            span{
              font-size: 16px;
              color: #e60012;
            }
            del{
              @include ht(24px);
              font-size: 12px;
            }
          }
        }
      }
    }
    .loading-wrapper{
      position: absolute;
      left: 0;
      right: 0;
      top: 30%;
      margin: 0 auto;
    }
  }
}

</style>
