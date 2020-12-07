import { createElement, render, renderDom } from "./vdom";
import { diff } from "./diff";
import { patch } from "./patch";

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

const virtualDom2 = createElement('ul',
  {
    class: 'list',
    style: 'color:yellow;'
  },[
    createElement('li',
      {
        class: 'football'
      },['足球']),
    createElement('li',
      {
        class: 'item'
      }, ['橘子']),
    createElement('li',
      {
        class: 'item'
      }, ['香蕉'])
  ]
)

const rDom = render(virtualDom1)
renderDom(rDom, document.getElementById('app'))
// console.log(virtualDom1);

let patches = diff(virtualDom1, virtualDom2);
console.log(patches);
patch(rDom, patches);