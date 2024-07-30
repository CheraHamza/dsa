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
		this.root = sortedArrayToBST(array, 0, array.length - 1);

		return this.root;
	}

	insert(value, root = this.root) {
		if (root == null) {
			root = new Node(value);
		}

		if (value > root.data) {
			root.right = this.insert(value, root.right);
		} else if (value < root.data) {
			root.left = this.insert(value, root.left);
		}

		return root;
	}
}

function removeDupicates(array) {
	let newArray = [];

	for (const element of array) {
		if (!newArray.includes(element)) {
			newArray.push(element);
		}
	}
	return newArray;
}

function sortedArrayToBST(array, start, end) {
	if (start > end) {
		return null;
	}
	let mid = Math.floor((start + end) / 2);
	let root = new Node(array[mid]);

	root.left = sortedArrayToBST(array, start, mid - 1);
	root.right = sortedArrayToBST(array, mid + 1, end);

	return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

let tree = new Tree([
	2, 1, 5, 35, 55, 3, 5, 7, 87, 98, 1, 2, 5, 6, 7, 8, 6, 54,
]);

tree.buildTree([2, 1, 5, 35, 55, 3, 5, 7, 87, 98, 1, 2, 5, 6, 7, 8, 6, 54]);

prettyPrint(tree.root);

tree.insert(100);

prettyPrint(tree.root);
