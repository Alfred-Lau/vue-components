<template>
  <div class="wrapper">
    <h1 class="title">点我搜索</h1>
    <input type="search" id="search" @input="onInput">
    <ul id="result">
      <li class="item" v-for="item in items">{{item}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import EventUtil from './commot/util/util'
  import jsonp from './commot/util/api'
  export default {
    data(){
      return {
        items: []
      }
    },
    mounted() {
      window.addEventListener('click', function (e) {
        let target = e.target || e.srcElement
        let tagName = target.tagName.toLowerCase()
        let ulList = document.getElementById('result')
        if (tagName !== 'li' && tagName !== 'input') {
          EventUtil.addClass(ulList, 'hide')
          document.getElementById('search').value = ""
        }
      }, false)
    },
    methods: {
      param(data) {
        let url = ''
        for (let k in data) {
          let value = data[k] !== undefined ? data[k] : ''
          url += '&' + k + '=' + encodeURIComponent(value)
        }
        return url ? url.substring(1) : ''
      },
      onInput(e) {
        if (e.target.value.trim() !== '') {
          let ulList = document.getElementById('result')
          EventUtil.removeClass(ulList, 'hide')

          let data = {
            wd: e.target.value.trim(),
            p: 3
          }
          let options = {
            param: 'cb',
            name: 'fn'
          }
          let url = 'http://www.baidu.com/su?'
          jsonp(url, data, options).then(res => {
            this.items = res.s
          }, res =>{
              console.log(res)
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  body
    font-size 90% / 180%
    font-family "Helvetica Neue", Helvetica, Arial, sans-serif
    color: #666
    background: #fff
    .wrapper
      margin: 150px auto
      width: 230px
      input
        font-family: inherit;
        font-size: 100%;

        height: 30px;
        line-height: 30px;
        outline: none;
        -webkit-appearance: textfield;
        -webkit-box-sizing: content-box;
        background: #ededed url(./assets/search-icon.png) no-repeat 10px center;
        border: solid 1px #ccc;
        padding: 4px 4px 4px 32px;
        width: 60px;

        -webkit-border-radius: 10em;
        -moz-border-radius: 10em;
        border-radius: 10em;

        -webkit-transition: all .8s;
        -moz-transition: all .8s;
        transition: all .8s;
      input[type=search]:focus
        width: 180px;
        background-color: #fff;
        border-color: #66CC75;

        -webkit-box-shadow: 0 0 5px rgba(109, 207, 246, .5);
        -moz-box-shadow: 0 0 5px rgba(109, 207, 246, .5);
        box-shadow: 0 0 5px rgba(109, 207, 246, .5);
      ul
        position: relative;
        left: 10px;
        list-style: none;
        width: 200px;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      .hide
        visibility: hidden;
        li:nth-child(data-list-index)
          background-color: rgb(168, 213, 252);
        li[class~="hover"]
          background-color: rgb(168, 213, 252);


</style>
