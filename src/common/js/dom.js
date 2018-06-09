import Vue from 'vue'

export function addClass(el, className) {
  if (hasClass(el, className)) return
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

export function returnFloat(value) {
  var value = Math.round(parseFloat(value)*100)/100
  var xsd = value.toString().split(".")
  if(xsd.length == 1){
    value = value.toString()+".00"
    return value
  }
  if(xsd.length > 1) {
    if(xsd[1].length < 2) {
      value = value.toString()+"0"
    }
    return value
  }
}


export function insertArray(arr, val, compare, num) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    let count =  arr[index].num += num
    // Vue.set(val,'num',count)
    val.num = count
  }else{
    // Vue.set(val,'name',name)
    // Vue.set(val,'num', num)
    val.num = num
    arr.push(val)
  }
}
