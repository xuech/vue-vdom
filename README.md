# vue-vdom

# `vdom.js`
## 构建虚拟节点
> 通过类的实例化将传入的dom元素信息对象化，此时就构成了虚拟节点
  - createElement(type,props,children)
  ```js
  //构造函数
  class Element {
    constructor(type, props, children) {
      this.type = type;
      this.props = props;
      this.children = children;
    }
  }

  function createElement(type,props,children){
    return new Element(type,props,children);
  }
  ```
## 转化真实节点
  - render(vdom)
## 渲染DOM节点
  - renderDom(rDom, document.getElementById('app'))
  
# `diff.js`

## 新旧阶段差异分析并获取补丁包
  - 使用深度优先算法进行比较
  - 得到新节点的操作记录，【增、删、改、换】
  - diff算法具体流程：
    1. 拿到新旧vdom
    2. 如果不存在新dom，则得到 'REMOVE' 类型的操作记录
    3. 如果不存在旧dom，则得到 'ADD' 类型的操作记录
    4. 如果新旧节点类型为字符串且文本不相同，则得到 'TEXT'类型的操作记录
    5. 如果新旧节点类型相同，通过递归调用得到所有子节点的操作记录
    6. 剩余则为'REPLACE'类型的替换操作记录 
    
# `patch.js`
## 给创建好的真实dom打补丁
  - 循环补丁包，补丁类型设置相应的操作

