export default {
  addHandler(elem, type, handler){
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false)
    } else if (elem.attachEvent) {
      elem.attachEvent(type, handler)
    } else {
      elem['on' + type] = handler
    }
  },
  removeHandler(elem, type, handler){
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handler, false)
    } else if (elem.detachEvent) {
      elem.detachEvent(type, handler)
    } else {
      elem['on' + type] = null
    }
  },
  hasClass(elem, cls){
    if (!elem.className) {
      return
    }
    return elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  },
  addClass(elem, cls){
    if (!this.hasClass(elem, cls)) {
      elem.className = (elem.className == "") ? cls : elem.className + " " + cls
    }
  },
  removeClass(elem, cls){
    if (this.hasClass(elem, cls)) {
      let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      elem.className = elem.className.replace(reg, ' ')
    }
  },
  toggleClass(elem, cls){
    if (this.hasClass(elem, cls)) {
      this.removeClass(elem, cls)
    } else {
      this.addClass(elem, cls)
    }
  }
}

