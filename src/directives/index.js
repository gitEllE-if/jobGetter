import scrollDirective from './scroll'

export default {
  install (Vue) {
    Vue.directive('scroll', scrollDirective)
  }
}