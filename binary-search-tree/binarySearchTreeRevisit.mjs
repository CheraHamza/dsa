import { mergeSort } from "../recursion/mergeSort.mjs";

function Node(data = null) {
	let left = null;
	let right = null;
	return {
		data,
		left,
		right,
	};
}

function Tree(array) {
	let sortedArr = mergeSort([...new Set(array)]); //remove duplicates and sort the array

	function buildTree(arr = sortedArr) {
		let mid = Math.floor(arr.length / 2);

		let leftHalf = arr.slice(0, mid);
		let rightHalf = arr.slice(mid);
		if (mid < 1) return null;
		let root = Node(arr[mid]);
		root.left = buildTree(leftHalf);
		root.right = buildTree(rightHalf);

		return root;
	}

	let root = buildTree();

	function getTree() {
		return root;
	}

	function insert(value, currNode = root) {
		if (currNode == null) {
			return Node(value);
		}

		if (value < currNode.data) {
			currNode.left = insert(value, currNode.left);
		} else if (value > currNode.data) {
			currNode.right = insert(value, currNode.right);
		}

		return currNode;
	}

	function remove(value, currNode = root) {
		if (currNode == null) {
			return currNode;
		}

		if (value < currNode.data) {
			currNode.left = remove(value, currNode.left);
		} else if (value > currNode.data) {
			currNode.right = remove(value, currNode.right);
		} else {
			if (currNode.left == null) return currNode.right;
			if (currNode.right == null) return currNode.left;

			let succ = getSuccessor(currNode);
			currNode.data = succ.data;
			currNode.right = remove(succ.data, currNode.right);
		}

		return currNode;
	}

	function getSuccessor(curr) {
		curr = curr.right;
		while (curr != null && curr.left != null) {
			curr = curr.left;
		}
		return curr;
	}

	function find(value, currNode = root) {
		if (currNode == null) {
			return "value not found";
		}
		if (value == currNode.data) {
			return currNode;
		} else if (value < currNode.data) {
			return find(value, currNode.left);
		} else if (value > currNode.data) {
			return find(value, currNode.right);
		}
	}

	function levelOrder(callback, currNode = root) {
		if (typeof callback != "function")
			throw new Error("callback must be a function");
		if (currNode == null) return "Empty tree";
		let queue = [currNode];
		while (queue.length > 0) {
			callback(queue[0]);
			if (queue[0].left) queue.push(queue[0].left);
			if (queue[0].right) queue.push(queue[0].right);
			queue.shift();
		}
	}

	function inOrder(callback, currNode = root) {
		if (typeof callback != "function")
			throw new Error("callback must be a function");
		if (currNode == null) return "Empty Tree";
		inOrder(callback, currNode.left);
		callback(currNode);
		inOrder(callback, currNode.right);
	}

	function preOrder(callback, currNode = root) {
		if (typeof callback != "function")
			throw new Error("callback must be a function");
		if (currNode == null) return "Empty Tree";
		callback(currNode);
		preOrder(callback, currNode.left);
		preOrder(callback, currNode.right);
	}

	function postOrder(callback, currNode = root) {
		if (typeof callback != "function")
			throw new Error("callback must be a function");
		if (currNode == null) return "Empty Tree";
		postOrder(callback, currNode.left);
		postOrder(callback, currNode.right);
		callback(currNode);
	}

	function height(currNode = root) {
		if (!currNode) return -1;
		let left = height(currNode.left);
		let right = height(currNode.right);

		return Math.max(left, right) + 1;
	}

	function depth(value, currNode = root) {
		if (!currNode) return -1;
		let dist = -1;
		if (
			currNode.data == value ||
			(dist = depth(value, currNode.left)) >= 0 ||
			(dist = depth(value, currNode.right)) >= 0
		) {
			return dist + 1;
		}
		return dist;
	}

	function isBalanced(currNode = root) {
		let left = height(currNode.left);
		let right = height(currNode.right);

		if (Math.abs(left - right) > 1) return false;

		return true;
	}

	function rebalance(currNode = root) {
		if (!isBalanced()) {
			let newArr = [];
			levelOrder((node) => {
				newArr.push(node.data);
			});
			let newTree = Tree(newArr);
			root = newTree.getTree();
		}
	}

	return {
		getTree,
		insert,
		remove,
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
		height,
		depth,
		isBalanced,
		rebalance,
	};
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

let myTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(myTree.getTree());
myTree.insert(44);
myTree.insert(55);
prettyPrint(myTree.getTree());
console.log(myTree.isBalanced());
myTree.rebalance();
prettyPrint(myTree.getTree());
console.log(myTree.isBalanced());
