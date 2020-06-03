import Cookies from 'js-cookie'
import config  from '../config'
const domain = config.domain
let options = {
  domain: domain,
  expires: 365
}

export default {
  get (key) {
    let result = Cookies.get(key)
    try {
      return JSON.parse(result)
    } catch (e) {
      return result
    }
  },
  set (key, value) {
    return Cookies.set(key, value, options)
  },
  remove (key) {
    return Cookies.remove(key, options)
  },
  clear (key) {
    return Object.keys(Cookies.get()).forEach((key) => {
      Cookies.remove(key, options)
    })
  }
}
