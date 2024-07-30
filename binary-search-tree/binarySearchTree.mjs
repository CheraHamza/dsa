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
		this.root = this.buildTree(array);
	}

	buildTree(array) {
		array = removeDupicates(mergeSort(array));
		return sortedArrayToBST(array, 0, array.length - 1);
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

	#getSuccessor(current) {
		current = current.right;
		while (current != null && current.left != null) {
			current = current.left;
		}
		return current;
	}

	deleteItem(item, root = this.root) {
		if (root == null) {
			return root;
		}

		if (item > root.data) {
			root.right = this.deleteItem(item, root.right);
		} else if (item < root.data) {
			root.left = this.deleteItem(item, root.left);
		} else {
			if (root.left == null) {
				let temp = root.right;
				root = null;
				return temp;
			}

			if (root.right == null) {
				let temp = root.left;
				root = null;
				return temp;
			}

			let successor = this.#getSuccessor(root);
			root.data = successor.data;
			root.right = this.deleteItem(successor.data, root.right);
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

prettyPrint(tree.root);

tree.deleteItem(7);

prettyPrint(tree.root);
