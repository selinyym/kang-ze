import * as types from './mutation-types'

const mutations = {
  [types.SET_GOODLIST] (state, goodList) {
    state.goodList = goodList
  },
  [types.SET_COUNT] (state, count) {
    state.count = count
  }
}

export default mutations
