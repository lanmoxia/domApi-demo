
//<------- 创 建 节 点 ------>

// 创建节点
const div1 = dom.create('div')
const div2 = dom.create('<td>hi<td>')

//<------- 增 加 节 点 ------>

// 添加弟弟节点
const div3 = dom.create('<div>newDiv<div>')
dom.after(child, div3)

// 添加哥哥节点
const div4 = dom.create('<div>newDiv2<div>')
dom.before(child, div4)

// 添加子节点
const div5 = dom.create('<div>newDiv2<div>')
dom.append(child, div5)

// 添加父节点
const newParent = dom.create('<div id="newParent">newParent<div>')
dom.wrap(child, newParent)

//<------- 删 除 节 点 ------>

// 删除节点
dom.remove(remove)

// 删除所有子节点 
const nodes = dom.empty(empty)
//console.log(nodes)

//<------- 修 改 读 取 节 点 ------>

// 修改 title
// JS 接受的参数可以很随意
// 比如这个设置的时候是三个参数
// 读取的时候可以是两个参数

// 设置需要三个参数
dom.attr(setTitle, 'title', "Hi,I'm xxx")
// 读取只要两个参数
const title = dom.attr(setTitle, 'title')
console.log(`title: ${title}`)

// 设置和读取 节点 文本内容
dom.text(text, '这里设置节点的文本内容')

// 设置和读取 HTML 内容
dom.html(html, `
  <div id="child1"></div>
  <div id="child2"></div>
  <div id="child3"></div>
  <div id="child4"></div>
  <div id="child5"></div>
`)
console.log(html)

// 设置 style 样式
// 设置样式
dom.style(style, { border: '1px solid red', color: 'blue' })
// 读取样式
console.log(dom.style(style, 'border'))
// 修改样式
dom.style(style, 'border', '1px solid black')

// 设置 class
// add 'red'
dom.class.add(addClass, 'red')
// add 'blue'
dom.class.add(addClass, 'blue')
// remove 'blue'
dom.class.remove(addClass, 'blue')
// 检查 'blue' 在不在，不在返回 false
console.log(dom.class.const(addClass, 'blue'))

// 设置 onclick 监听事件
// 移除时时移除的上一个函数，要给上一个函数取个名字
const fn = () => {
  console.log('点击我')
}
// 添加点击事件
dom.on(xxx, 'click', fn)
// 移除点击事件
//dom.off(xxx, 'click', fn)

//<------- 修 改 读 取 节 点 ------>

// 获取节点
// 第一种 默认一个参数 通过‘选择器’查找 ‘class’ 为 ’xxx‘ 的元素
//const ddd = dom.find('#findNode1')[0]
//console.log(ddd)
// 第二种 有两个参数 如果有‘两个选择器’都有相同的 ’class‘ 可以根据不同的选择器差找不同的元素
const zzz = dom.find('.red', findNode2) // 这样拿到是一个对象，想获取内容后边加[0]
console.log(zzz)

// 获取父节点
console.log(dom.parent(li3))

// 查找子节点
console.log(dom.children(parent2)[0])

// 变型前
// 查除自己的兄弟元素
//console.log(dom.siblings(dom.find('#p1')[0]))
//console.log(dom.siblings(p1)[0]) // 错误 只能找到第二个兄弟两遍

// 变形后
// 找到这个元素
const p2 = dom.find('#p2')[0]
// 查除自己的兄弟元素
console.log(dom.siblings(p2))
// 查弟弟节点
console.log(dom.next(p2))
// 查哥哥节点
console.log(dom.previous(p2))

// 遍历所有子节点并添加样式
const t = dom.find('#parent3')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))

// 当前节点排行第几
console.log(dom.index(p2))