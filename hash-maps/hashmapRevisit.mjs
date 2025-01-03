function Node(key, value = null) {
	return {
		key,
		value,
	};
}

function HashMap() {
	let loadFactor = 0.75;
	let capacity = 16;
	let buckets = [];

	function getCapacity() {
		return capacity;
	}

	function hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
		}

		return hashCode;
	}

	function outOfBound(index) {
		if (index < 0 || index >= capacity) {
			throw new Error("Trying to access index out of bounds");
		}
		return false;
	}

	function set(key, value) {
		let index = hash(key);

		if (outOfBound(index) == false) {
			let newPair = Node(key, value);
			if (buckets[index] == null) {
				buckets[index] = [newPair];
			} else {
				for (const pair of buckets[index]) {
					if (pair.key == key) {
						pair.value = value;
						return;
					}
				}
				buckets[index].push(newPair);
			}
			expand();
		}
	}

	function expand() {
		if (length() > capacity * loadFactor) {
			const oldEntries = entries();
			capacity = capacity * 2;
			clear();

			for (const entiry of oldEntries) {
				set(entiry.key, entiry.value);
			}
		}
	}

	function get(key) {
		let index = hash(key);

		if (buckets[index]) {
			for (const pair of buckets[index]) {
				if (pair.key == key) {
					return pair.value;
				}
			}
		}
		return null;
	}

	function has(key) {
		if (get(key) == null) {
			return false;
		}
		return true;
	}

	function remove(key) {
		if (has(key)) {
			let index = hash(key);
			let i = 0;
			for (const pair of buckets[index]) {
				if (pair.key == key) {
					buckets[index].splice(i, 1);
					return true;
				}
				i++;
			}
		}
		return false;
	}

	function length() {
		let counter = 0;
		for (const bucket of buckets) {
			for (const pair in bucket) {
				counter++;
			}
		}
		return counter;
	}

	function clear() {
		buckets = [];
	}

	function keys() {
		let keys = [];
		for (const bucket of buckets) {
			if (bucket) {
				for (const pair of bucket) {
					keys.push(pair.key);
				}
			}
		}
		return keys;
	}

	function values() {
		let values = [];
		for (const bucket of buckets) {
			if (bucket) {
				for (const pair of bucket) {
					values.push(pair.value);
				}
			}
		}

		return values;
	}

	function entries() {
		let entries = [];
		for (const bucket of buckets) {
			if (bucket) {
				for (const pair of bucket) {
					entries.push(pair);
				}
			}
		}

		return entries;
	}

	return {
		set,
		get,
		has,
		remove,
		length,
		clear,
		keys,
		values,
		entries,
		getCapacity,
	};
}

let test = HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");
test.set("moon", "hamza");

console.log(test.entries(), test.getCapacity());
