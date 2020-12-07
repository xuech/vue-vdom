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

function render(vdom) {
  let { type, props, children } = vdom;
  let el = document.createElement(type);
  //对props进行处理
  for (const key in props) {
    // 根据key进行赋值，因为有可能key是input或者textare，也有可能是style
    // el.setAttribute(key,propos[key]);
    setAttrs(el, key, props[key])
  }

  // 对子节点进行遍历
  children.forEach(child => {
    //child可以是虚拟dom也可能是文本
    // child = render(child)
    child = (child instanceof Element) ? render(child) : document.createTextNode(child)
    el.appendChild(child)
  });
  return el;
}

function setAttrs(node, key, value) {
  // 需要判断key是什么
	switch(key){
		case 'value':
			if(node.tagName.toLowerCase() === 'input' ||
				node.tagName.toLowerCase() == 'textarea'){
				node.value = value;
			}else{
				node.setAttribute(key,value);
			}
			break;
		case 'style':
			node.style.cssText = value;
			break;
		default:
			node.setAttribute(key,value);
			break;
	}
}

// 将元素插入页面
function renderDom(el,target){
	target.appendChild(el);
}

export {
  createElement,
  render,
  setAttrs,
  renderDom
};