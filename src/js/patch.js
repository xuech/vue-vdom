// const patchesModel = {
//   0: [
//     { // 将 属性class = 'oldClass' => 'newClass'
//       type: 'ATTR',
//       attrs: 'newClass'
//     }
//   ],
//   2: [
//     {// 将index为2的节点删除
//       type: 'REMOVE',
//       index: 2
//     }
//   ],
//   5: [
//     {// 新节点替换老节点
//       type: 'REPLACE',
//       newNode
//     }
//   ]
// }

import {Element,render, setAttrs } from "./vdom";
let allPatches;
let patchIndex = 0;  // 默认哪个需要打补丁

function patch(node,patches){
	allPatches = patches;
	
	walkPatches(node);
	
	// 替换和修改对比完之后，再打上添加节点的补丁
	for (let i in patches) {
		// console.log(allPatches[i][0])
		if(allPatches[i][0].type == 'ADD'){
			doPatch(node,allPatches[i]);
		}
	}
}

function walkPatches(node){
	let current = allPatches[patchIndex++];
	
	let childNodes = node.childNodes;
	
	// 遍历递归子节点
	childNodes.forEach(child => walkPatches(child));
	
	current && doPatch(node,current);
}

function doPatch(node,patches){
  patches.forEach(patch => {
    debugger
		switch (patch.type){
			case 'ATTR':
				for(let key in patch.attr){
          const value = patch.attr[key];
					value && setAttrs(node,key,value);
					!value && node.removeAttribute(key);
				}
				break;
			case 'TEXT':
				node.textContent = patch.text;
				break;
			case 'REPLACE':
				let newNode = patch.newNode;
				newNode = (newNode instanceof Element) ? render(newNode) :  document.createTextNode(newNode);
				node.parentNode.replaceChild(newNode, node);
				break;
			case 'REMOVE':
				node.parentNode.removeChild(node);
				break;
			case 'ADD':
				let addNode = patch.newNode;
				addNode = (addNode instanceof Element) ? render(addNode) :  document.createTextNode(addNode);
				node.appendChild(addNode);
				break;
			default:
				break;
		}
	});
}

function setAttr(node,key,value){
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

export {
	patch
}