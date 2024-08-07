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

	deleteItem(value, root = this.root) {
		if (root == null) {
			return root;
		}

		if (value > root.data) {
			root.right = this.deleteItem(value, root.right);
		} else if (value < root.data) {
			root.left = this.deleteItem(value, root.left);
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

	find(value, root = this.root) {
		if (root == null) {
			return "value doesn't exist";
		}
		if (root.data == value) {
			return root;
		}
		if (value > root.data) {
			return this.find(value, root.right);
		} else if (value < root.data) {
			return this.find(value, root.left);
		}
	}

	leverOrder(callback) {
		if (typeof callback !== "function") {
			throw new Error("A callback function must be provided.");
		}
		let queue = [];
		let root = this.root;
		if (!root) return;

		queue.push(root);

		while (queue.length > 0) {
			let currentNode = queue[0];
			callback(currentNode);
			if (currentNode.left) queue.push(currentNode.left);
			if (currentNode.right) queue.push(currentNode.right);
			queue.splice(0, 1);
		}
	}

	inOrder(callback) {
		if (typeof callback !== "function") {
			throw new Error("A callback function must be provided.");
		}
		let stack = [];
		let current = this.root;
		if (!current) return;

		while (current != null || stack.length > 0) {
			while (current != null) {
				stack.push(current);
				current = current.left;
			}

			current = stack.pop();
			callback(current);
			current = current.right;
		}
	}

	preOrder(callback, current = this.root) {
		if (typeof callback !== "function") {
			throw new Error("A callback function must be provided.");
		}
		if (!current) return;

		callback(current);
		this.preOrder(callback, current.left);
		this.preOrder(callback, current.right);
	}

	postOrder(callback, current = this.root) {
		if (typeof callback !== "function") {
			throw new Error("A callback function must be provided.");
		}

		if (!current) return;
		this.postOrder(callback, current.left);
		this.postOrder(callback, current.right);
		callback(current);
	}

	height(current = this.root) {
		if (!current) {
			return 0;
		} else {
			let left = this.height(current.left);
			let right = this.height(current.right);

			if (left > right) {
				return left + 1;
			} else {
				return right + 1;
			}
		}
	}

	depth(value, current = this.root) {
		if (!current) return;

		let depth = -1;

		if (
			current.data == value ||
			(depth = this.depth(value, current.left)) >= 0 ||
			(depth = this.depth(value, current.right)) > 0
		) {
			return depth + 1;
		}
		return depth;
	}

	isBalanced(current = this.root) {
		if (!current) return true;

		const leftHeight = this.height(current.left);
		const rightHeight = this.height(current.right);

		if (
			Math.abs(leftHeight - rightHeight) <= 1 &&
			this.isBalanced(current.left) &&
			this.isBalanced(current.right)
		) {
			return true;
		}

		return false;
	}

	rebalance() {
		let array = [];
		this.preOrder((node) => {
			array.push(node.data);
		});

		this.root = this.buildTree(array);
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
