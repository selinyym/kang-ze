import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = resolve => {
  import('components/home/home').then(module => {
    resolve(module)
  })
}
const Kinds = resolve => {
  import('components/kinds/kinds').then(module => {
    resolve(module)
  })
}
const ShopCar = resolve => {
  import('components/shopCar/shopCar').then(module => {
    resolve(module)
  })
}
const SearchList = resolve => {
  import('components/searchList/searchList').then(module => {
    resolve(module)
  })
}
const Good = resolve => {
  import('components/good/details').then(module => {
    resolve(module)
  })
}

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y : 0 }),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [{
        name: "good",
        path: "/home/good/:id",
        component: Good
      }]
    },
    {
      path: '/kinds',
      component: Kinds
    },
    {
      path: '/shopCar',
      component: ShopCar
    },
    {
      path:'/search/',
      component: SearchList
    }
  ]
})
