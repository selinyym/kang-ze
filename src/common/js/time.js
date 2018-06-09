// 倒计时
function checktime(i) {
  if (i<10) {
    i = "0" + i
  } else {
    i = i
  }
  return i
}
export function freshTime(){
  function GetDateStr(AddDayCount) {
		var dd = new Date()
		dd.setDate(dd.getDate() + AddDayCount)// 获取AddDayCount天后的日期
		var y = dd.getFullYear()
		var m = dd.getMonth() + 1// 获取当前月份的日期
		var d = dd.getDate()
		return y + "/" + m +"/" + d
	}
	var time = GetDateStr(1)
  var endTime = new Date(time)
  var nowTime = new Date()
  var leftTime = parseInt(endTime.getTime()-nowTime.getTime())
  var dm = 24*60*60*1000
  var d = parseInt(leftTime/dm)
  var hm = 60*60*1000
  var h = parseInt((leftTime/hm)%24)
  var mm = 60*1000
  var m = parseInt((leftTime/mm)%60)
  var s = parseInt((leftTime/1000)%60)
  h = checktime(h)
  m = checktime(m)
  s = checktime(s)
  return {
    leftTime,
    d,
    h,
    m,
    s
  }
}
