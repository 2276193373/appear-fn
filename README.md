## 用法示例
```javascript
import { appearFn } from 'appear-fn'
// 需要注意的是 , 该方法要等 Dom 加载完成再调用 . 比如在 Vue 中 , 你应该写在 onMounted() 或者 nextTick() 等确定 dom 已经挂载完成的地方
const config = {
  appearFn: (el) => {
    console.log(el, '出现');
  },
  disappearFn: (el) => {
    console.log(el, '消失');
  },
  options: {
    threshold: .6
  },
  unobserve: false
}
appearFn('#target', config)
```


## 语法
```javascript
appearFn(selectors, config)
```
## 参数
* `selectors` : string - 选择器名称
* `config` : `object`
  * `appearFn` : `funtion` - 元素出现在视口中时要执行的函数 . 传入一个当前绑定的元素
  * `disappearFn` : `funtion` - 元素消失在视口中时要执行的函数 . 传入一个当前绑定的元素
  * `unobserve` : `boolean` 观察元素过后 , 是否取消观察 . 如果为 true 则 appearFn 执行一次过后 , 即使元素反复出现在视口中该函数也不会再执行
  * `options ( 可选 )` : `object` - 一个可以用来配置 observer 实例的对象。如果options未指定，observer 实例默认使用文档视口作为   root，并且没有 margin，阈值为 0%（意味着即使一像素的改变都会触发回调函数）[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver) 。你可以指定以下配置：
    * `root` - 指定元素为视口。目标在根的可见区域的的任何不可见部分都会被视为不可见。
    * `rootMargin` - 类似 margin , 可以有效的缩小或扩大根的判定范围 , 默认值为 `0px 0px 0px 0px` ( 单位是必须的 , 不能  省略 ). 可以理解为 margin 越大 , 被监听的元素与视口触发 "相交" 的时机越早 , 因为 root 设置了 margin 扩大了自身的判定范  围
    * `threshold` - 规定了一个监听目标与边界盒交叉区域的比例值 . 有效值在 0.0 到 1.0 之间 . 若指定值为 1.0，则意味着整个元素都在可见范围内时才算可见 . 默认值为 0.0
## 返回值
* 当前 IntersectionObserver 实例

## 完整示例 ( Vue3 )
```html
<template>
  <div id="rootEl">
    <div class="a" style="width: 50%;height: 80%;background: green;"></div>
    <div class="a" style="width: 50%;height: 80%;background: blue;"></div>
    <div class="a" style="width: 50%;height: 80%;background: yellow;"></div>
    <div class="a" style="width: 50%;height: 80%;background: red;"></div>
    <div class="b" style="width: 50%;height: 80%;background: red;"></div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import { appearFn } from 'appear-fn'
nextTick(() => {
  const config = {
    appearFn: (el) => {
      console.log(el.id, '出现');
    },
    disappearFn: (el) => {
      console.log('消失');
    },
    options: {
      root: '#rootEl',
      rootMargin: '0px 0px 0px 0px',
      threshold: .5 // 元素出现一半时 才会被视为 "出现" 了
    },
    unobserve: false
  }
  appearFn('.a, .b', config)
})
</script>
<style lang="scss" scoped>
#rootEl {
  height: 50vh;
  overflow: auto;
  border: 1px solid red;
}
.a {
  margin-bottom: 10px;
}
</style>
```
