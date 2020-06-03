export default {
  get (key) {
    let result = window.localStorage.getItem(key)
    try {
      return JSON.parse(result)
    } catch (e) {
      return result
    }
  },
  set (key, value) {
    let toString = Object.prototype.toString
    if (toString.call(value) === '[object Array]' || toString.call(value) === '[object Object]') {
      value = JSON.stringify(value)
    }
    return window.localStorage.setItem(key, value)
  },
  remove (key) {
    return window.localStorage.removeItem(key)
  },
  clear () {
    return window.localStorage.clear()
  }
}
