import { mapGetters, mapMutations, mapActions } from 'vuex'

export const goodPropsMixin = {
  props: {
    good: {
      type: Object,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  }
}
export const setCoutMixin = {
  computed: {
    totalCount(){
      let count = 0
      this.goodList.forEach((good) => {
        count += good.num;
      })
      return count
    },
    ...mapGetters([
      'goodList'
    ])
  },
  methods: {
    ...mapMutations({
      setCount: 'SET_COUNT'
    })
  }
}
