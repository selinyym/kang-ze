<template>
  <div class="test">
    <ul>
      <li v-for="(item, index) in proData">
        <label for="">
          <input type="checkbox" :value="index" v-model="selectArr">
        </label>{{item.name}}
      </li>
    </ul>
    <button type="" @click="del">删除</button>{{selectArr}}
    <label>
      <input type="checkbox" class="checkbox" @click="selectAll" />全选
    </label>
  </div>
</template>
<script>
var proData = [{
    "name": "j1ax"
}, {
    "name": "j2ax"
}, {
    "name": "j3ax"
}, {
    "name": "j4ax"
}]
export default {
  data() {
    return {
      proData: proData,
      selectArr: []
    }
  },
  methods: {
    del() {
      let arr = [];
      var len = this.proData.length;
      for (var i = 0; i < len; i++) {
        if (this.selectArr.indexOf(i)>=0) {
          console.log(this.selectArr.indexOf(i))
        }else{
          arr.push(proData[i])
        }
      }
      console.log(arr)
      this.proData = arr;
      this.selectArr = []
    },
    selectAll(event) {
      var _this = this;
      console.log(event.currentTarget)
      if (!event.currentTarget.checked) {
        this.selectArr = [];
      } else { //实现全选
        _this.selectArr = [];
        _this.proData.forEach(function(item, i) {
            _this.selectArr.push(i);
        });
      }
    }
  }
}
</script>
<style scoped lang="scss">
.test{
  position: absolute;
  left: 0;
  top: 50%;
  background: #fff;
  z-index: 11111;
  color: red;
  width: 100%;
}
</style>
