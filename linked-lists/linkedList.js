export class LinkedList {
	constructor() {
		this.list = null;
	}

	append(value) {
		let newNode = new Node(value, null);
		if (this.list === null) {
			this.list = newNode;
			return;
		}

		let curr = this.list;
		while (curr.nextNode !== null) {
			curr = curr.nextNode;
		}
		curr.nextNode = newNode;
	}

	prepend(value) {
		this.list = new Node(value, this.list);
	}

	size() {
		let count = 0;
		let curr = this.list;
		while (curr != null) {
			count++;
			curr = curr.nextNode;
		}
		return count;
	}

	head() {
		return this.list;
	}

	tail() {
		let curr = this.list;
		if (curr == null) {
			return curr;
		}
		while (curr.nextNode != null) {
			curr = curr.nextNode;
		}
		return curr;
	}

	at(index) {
		let curr = this.list;
		if (curr == null) {
			return "List is empty!";
		}
		let counter = 0;
		while (counter < index && curr != null) {
			curr = curr.nextNode;
			counter++;
		}
		if (counter == index) {
			return curr;
		} else {
			return `There is no ${index}th element!`;
		}
	}

	pop() {
		let prev = null;
		let curr = this.list;

		if (curr == null) {
			return;
		}

		while (curr.nextNode != null) {
			prev = curr;
			curr = curr.nextNode;
		}

		prev.nextNode = curr.nextNode;
	}

	contains(value) {
		let curr = this.list;
		while (curr != null) {
			if (curr.value == value) {
				return true;
			}
			curr = curr.nextNode;
		}
		return false;
	}

	find(value) {
		let counter = 0;
		let curr = this.list;

		if (curr == null) {
			return "The list is empty!";
		}

		while (curr != null) {
			if (curr.value == value) {
				return counter;
			}
			curr = curr.nextNode;
			counter++;
		}

		return "There is no such value in the list!";
	}

	toString() {
		let curr = this.list;
		let listText = "";
		while (curr != null) {
			listText += `( ${curr.value} ) -> `;
			curr = curr.nextNode;
		}
		listText += "null";
		return listText;
	}

	insertAt(value, index) {
		if (this.size() < index) {
			console.log("Index is out of reach!");
			return;
		}

		let curr = this.list;
		let prev = null;
		let counter = 0;

		while (counter < index && curr != null) {
			prev = curr;
			curr = curr.nextNode;
			counter++;
		}

		if (counter == 0) {
			this.prepend(value);
		} else {
			let newNode = new Node(value, curr);
			prev.nextNode = newNode;
		}
	}

	removeAt(index) {
		if (this.size() - 1 < index) {
			console.log("Index is out of reach!");
			return;
		}

		let curr = this.list;
		let prev = null;
		let counter = 0;

		while (counter < index && curr.nextNode != null) {
			prev = curr;
			curr = curr.nextNode;
			counter++;
		}

		if (counter == 0) {
			this.list = curr.nextNode;
		} else {
			prev.nextNode = curr.nextNode;
		}
	}
}

export class Node {
	constructor(value, nextNode) {
		this.value = value;
		this.nextNode = nextNode;
	}
}
