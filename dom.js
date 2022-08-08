window.dom = {

  //<------- 创 建 节 点 ------>

  // 创建节点
  create(String) {
    const container = document.createElement('template')
    container.innerHTML = String.trim()
    return container.content.firstChild
  },

  //<------- 增 加 节 点 ------>

  // 添加弟弟节点
  after(node, node2) {
    // 找到当前节点的父元素，调用父元素 insertBefore() 方法, 把 node2 放到当前节点下一个节点的前边 
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  // 添加哥哥节点
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  // 添加子节点
  append(parent, node) {
    parent.appendChild(node)
  },
  // 添加父节点
  wrap(node, parent) {
    // div2 放到 div3 前边
    dom.before(node, parent)
    // 然后把 div2 放到 div3 的里边
    dom.append(parent, node)
  },

  //<------- 删 除 节 点 ------>

  // 删除节点
  remove(node) {
    //debugger
    // 新的删除方式
    //node.remove(node)
    // 旧的删除方式
    node.parentNode.removeChild(node)
    // 为了防止删除以后别人的引用断开return出去，别人还能引用
    //return node
  },
  // 删除所有子节点
  empty(node) {
    // 直接删除 别人引用不到
    //node.innerHtml = ''
    // 下边这种删除后再返回别人的引用不会断了
    const array = []
    let x = node.firstChild
    while (x) { // 如果 x 存在
      // 每次移除大儿子，再 push 到新数组
      array.push(dom.remove(node.firstChild))
      // 移除大儿子后，第二个儿子变成大儿子
      // x 指向他 继续循环，一直到孩子不存在
      x = node.firstChild
    }
    return array
  },

  //<------- 修 改 节 点 ------>

  // 修改 title
  attr(node, name, value) { // attribute
    // 这里的判断语句意思是 JS 参数很随意 
    // 比如参数是三个的时候 说明是想设置 title 
    // 参数是两个的时候，说明是想获取 title
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  // 设置节点 文本内容
  text(node, string) {
    // 参数为 2 说明想设置修改内容
    if (arguments.length === 2) {
      // 两个不同的接口适配不同的浏览器叫适配
      if ('innerText' in node) {
        node.innerText = string // ie 支持的接口
      } else {
        node.textContent = string // 其他浏览器(谷歌/火狐)
      }
      // 参数为 1 说明想获取内容
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText // ie 支持的接口
      } else {
        return node.textContent // 其他浏览器(谷歌/火狐)
      }
    }
  },
  // 设置 HTML
  html(node, string) {//重载
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  // 修改 style
  style(node, AttributeName, AttributeValue) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red') 三个参数想修改
      node.style[AttributeName] = AttributeValue
      // dom.style(div, 'color') 两个参数，后边参数类型是字符串是想读取
    } else if (typeof AttributeName === 'string') {
      return node.style[AttributeName]
      // dom.style(div, {color: 'red'}) 两个参数，后边参数类型是一个实例对象是想设置
    } else if (AttributeName instanceof Object) {
      for (let key in AttributeName) {
        node.style[key] = AttributeName[key]
        //const object = AttributeName
        //for (let key in object) {
        //node.style[key] = object[key]
      }
    }
  },
  // 添加 移除 获取className
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    const(node, className) {
      return node.classList.contains(className)
    }
  },
  // // 设置 onclick 监听事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },
  find(selector, scope) {
    // 第一种 默认查找某选择器内的 class 为 xxx 的元素
    //return document.querySelectorAll(selector)
    // 第二种 
    // 如果有 scope(范围，指的是从多个选择器的范围查找)就调用 scope.querySelectorAll(selector)
    // 如果没有查找范围，就调用 document.querySelectorAll(selector)
    return (scope || document).querySelectorAll(selector)
  },
  parent(node) {
    return node.parentNode
  },
  children(node) {
    return node.children
  },
  siblings(node) {
    //debugger
    // parentNode.children 是一个伪数组，
    // 用 from 变成真正的数组
    return Array.from(node.parentNode.children)
      // 然后用 filter()过滤掉自己，得到除自己外所有兄弟元素
      .filter(n => n != node)
  },
  // 查找弟弟节点
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  // 查找哥哥节点
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },
  // 遍历节点 给每个子节点添加 class
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },
  // 检查这个节点排行第几
  index(node) {
    // 父元素下的子节点 包括自己
    const list = dom.children(node.parentNode)
    let i // 这样下边 return i 就可以使用了
    // 遍历子节点 如果节点第 i 个等于这个节点，这个节点排行第几
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  }
}
