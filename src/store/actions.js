import * as types from './mutation-types'
import { saveGood, addCount, decreaseCount, delGood } from 'common/js/cache.js'

export const saveGoodList = ({ commit }, {key, valNum, num }) => {
  commit(types.SET_GOODLIST, saveGood(key, valNum, num))
}

export const addGoodCount = ({ commit }, index ) => {
  commit(types.SET_GOODLIST, addCount(index))
}

export const decreaseGoodCount = ({ commit }, index ) => {
  commit(types.SET_GOODLIST, decreaseCount(index))
}

export const delGoodItem = ({ commit }, arr ) => {
  commit(types.SET_GOODLIST, delGood(arr))
}
