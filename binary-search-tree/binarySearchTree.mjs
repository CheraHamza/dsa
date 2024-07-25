import { mergeSort } from "../recursion/mergeSort.mjs";

class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(array) {
		this.initArray = array;
		this.root = null;
	}

	buildTree(array) {
		array = removeDupicates(mergeSort(array));
        
	}

	prettyPrint(prefix = "", isLeft = true) {
		if (this.root === null) {
			return;
		}
		if (this.root.right !== null) {
			prettyPrint(
				this.root.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${this.root.data}`);
		if (this.root.left !== null) {
			prettyPrint(this.root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
	}
}

function removeDupicates(array) {
	let newArray = [];

	for (const element of array) {
		if (!newArray.includes(element)) {
			newArray.push(element);
		}
	}
}
