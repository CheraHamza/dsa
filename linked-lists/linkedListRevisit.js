function Node(value, nextNode = null) {
	return {
		value,
		nextNode,
	};
}

function LinkedList() {
	let root = null;

	function append(value) {
		let newNode = Node(value);
		if (root == null) {
			root = newNode;
		} else {
			let currentNode = root;
			while (currentNode.nextNode != null) {
				currentNode = currentNode.nextNode;
			}
			currentNode.nextNode = newNode;
		}
	}

	function prepend(value) {
		let newNode = Node(value, root);
		root = newNode;
	}

	function size() {
		let counter = 0;
		let currentNode = root;
		while (currentNode) {
			counter++;
			currentNode = currentNode.nextNode;
		}
		return counter;
	}

	function head() {
		return root;
	}

	function tail() {
		let currentNode = root;
		while (currentNode.nextNode) {
			currentNode = currentNode.nextNode;
		}
		return currentNode;
	}

	function at(index) {
		let currentNode = root;
		let counter = 0;
		while (currentNode && counter < index) {
			currentNode = currentNode.nextNode;
			counter++;
		}
		return currentNode;
	}

	function pop() {
		if (!root) return;
		if (!root.nextNode) {
			root = null;
		} else {
			let currentNode = root;
			while (currentNode.nextNode.nextNode) {
				currentNode = currentNode.nextNode;
			}
			currentNode.nextNode = null;
		}
	}

	function contains(value) {
		let currentNode = root;
		while (currentNode) {
			if (currentNode.value == value) return true;
			currentNode = currentNode.nextNode;
		}
		return false;
	}

	function find(value) {
		let currentNode = root;
		let index = 0;

		while (currentNode) {
			if (currentNode.value == value) {
				return index;
			}
			currentNode = currentNode.nextNode;
			index++;
		}

		return null;
	}

	function toString() {
		let currentNode = root;
		let message = "";
		while (currentNode) {
			message += "( " + currentNode.value + " ) -> ";
			currentNode = currentNode.nextNode;
		}
		message += "null";
		console.log(message);
	}

	function insertAt(value, index) {
		if (index == 0) {
			prepend(value);
		} else {
			let counter = 0;
			let currentNode = root;
			let previousNode = null;

			while (counter < index && currentNode) {
				previousNode = currentNode;
				currentNode = currentNode.nextNode;
				counter++;
			}
			if (counter == index) {
				previousNode.nextNode = Node(value, currentNode);
			}
		}
	}

	function removeAt(index) {
		if (index == 0) {
			root = root.nextNode;
		} else {
			let previousNode = null;
			let currentNode = root;
			let counter = 0;

			while (currentNode && counter < index) {
				previousNode = currentNode;
				currentNode = currentNode.nextNode;
				counter++;
			}

			if (counter == index) {
				previousNode.nextNode = currentNode.nextNode;
			}
		}
	}

	return {
		append,
		prepend,
		size,
		head,
		tail,
		at,
		pop,
		contains,
		find,
		toString,
		insertAt,
		removeAt,
	};
}
