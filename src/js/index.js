import { createElement,render, renderDom } from "./vdom";
const virtualDom1 = createElement('ul',
  {
    class: 'list',
    style: 'color:red;'
  },[
    createElement('li',
      {
        class: 'item'
      },['苹果']),
    createElement('li',
      {
        class: 'item'
      }, ['橘子']),
    createElement('li',
      {
        class: 'item'
      }, ['香蕉']),
      createElement('input',
      {
        value: 'item'
      }, ['未知'])
  ]
)

const rDom = render(virtualDom1)
renderDom(rDom, document.getElementById('app'))
console.log(virtualDom1);