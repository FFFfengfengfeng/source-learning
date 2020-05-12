/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

// 唯一id
let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

// 观察对象
export default class Dep {
  static target: ?Watcher; // 静态属性, 目标对象, 类型是一个观察者
  id: number; // id属性, 类型是一个数字
  subs: Array<Watcher>; // 订阅数组, 是一个观察者类型的数组

  constructor () {
    // 每new一个Dep, uid都自动递增
    this.id = uid++
    // 订阅数组
    this.subs = []
  }

  // 添加观察者
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  // 删除一个观察者
  removeSub (sub: Watcher) {
    // src/shared/utils.js
    remove(this.subs, sub)
  }

  // 建立依赖
  depend () {
    // 如果Dep的target存在
    if (Dep.target) {
      // 调用Dep.target.addDep方法, 即Watcher的addDep方法
      Dep.target.addDep(this)
    }
  }

  // 通知方法
  notify () {
    // stabilize the subscriber list first
    // 使用slice返回Dep的subs数组, slice会返回一个新数组, 并不过改变原始数组
    const subs = this.subs.slice()
    // 如果当前进程不是production环境, 并且config配置的async为false(src/core/config.js)
    // 先对订阅者数组进行排序, 通过id对比
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    // 遍历订阅者数组, 依次调用每个订阅者的update方法, 即Wather的update方法
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// 全局唯一的观察者对象
Dep.target = null
// 声明一个全局的观察者对象栈, 先进先出
const targetStack = []

// 全局观察者对象入栈方法
// 将一个Watcher入栈, 并且将全局的唯一的观察者对象设置为当前的栈顶
export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

// 全局观察者对象出栈方法
// 弹出栈顶, 重置全局唯一的观察者对象
export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
