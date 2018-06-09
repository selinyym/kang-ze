import { loadGood, loadCount } from 'common/js/cache.js'

const state = {
  goodList: loadGood(),
  count: loadCount()
}
export default state
