import storage from 'good-storage'

const GOOD_KEY = '__goodList__'

function insertArray(arr, key, compare, valNum, num) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    let count =  arr[index].num += num
    valNum = count
  }else{
    valNum = num
    arr.push(key)
  }
}


export function saveGood( key, valNum, num ) {
  let goods = storage.get(GOOD_KEY, [])
  insertArray(goods, key, (item) => {
    return item.name === key.name
  }, valNum, num)
  storage.set(GOOD_KEY, goods)
  return goods
}


export function loadCount() {
  let count = 0
  let goods = storage.get(GOOD_KEY, [])

  goods.forEach((good) => {
    count += good.num;
  })

  return count
}



export function addCount( index ) {
  let goods = storage.get(GOOD_KEY, [])
  goods[index].num++
  storage.set(GOOD_KEY, goods)
  return goods
}
export function decreaseCount( index ) {
  let goods = storage.get(GOOD_KEY, [])
  if(goods[index].num > 1) {
    goods[index].num--
  }
  storage.set(GOOD_KEY, goods)
  return goods
}

export function delGood( arr ) {
  let goods = storage.get(GOOD_KEY, [])
  goods = arr
  storage.set(GOOD_KEY, goods)
  return goods
}

export function loadGood() {
  return storage.get(GOOD_KEY, [])
}
