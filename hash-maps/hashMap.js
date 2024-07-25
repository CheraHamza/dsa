export class HashMap {
	loadFactor = 0.75;

	constructor(buckets_nbr) {
		this.buckets_nbr = buckets_nbr || 16;
		this.buckets = new Array(this.buckets_nbr);
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode =
				(primeNumber * hashCode + key.charCodeAt(i)) % this.buckets_nbr;
		}

		return hashCode;
	}

	increaseSize() {
		if (this.length() > this.buckets_nbr * this.loadFactor) {
			let newHashMap = new HashMap(this.buckets_nbr * 2);

			this.entries().forEach((entry) => {
				let key = entry.key;
				let value = entry.value;

				newHashMap.set(key, value);
			});

			this.buckets_nbr = newHashMap.buckets_nbr;
			this.buckets = newHashMap.buckets;
		}
	}

	set(key, value) {
		let index = this.hash(key);

		if (!this.buckets[index]) {
			this.buckets[index] = [new Node(key, value)];
			return;
		} else {
			for (let i = 0; i < this.buckets[index].length; i++) {
				if (this.buckets[index][i].key == key) {
					this.buckets[index][i].value = value;
					return;
				}
			}
			this.buckets[index].push(new Node(key, value));
		}
		this.increaseSize();
	}

	get(key) {
		let index = this.hash(key);
		let bucket = this.buckets[index];

		if (bucket) {
			for (let i = 0; i < bucket.length; i++) {
				if (bucket[i].key == key) {
					return bucket[i].value;
				}
			}
		}
		return null;
	}

	has(key) {
		let index = this.hash(key);
		let bucket = this.buckets[index];

		if (bucket) {
			for (let i = 0; i < bucket.length; i++) {
				if (bucket[i].key == key) {
					return true;
				}
			}
		}
		return false;
	}

	remove(key) {
		let index = this.hash(key);
		let bucket = this.buckets[index];

		if (bucket) {
			for (let i = 0; i < bucket.length; i++) {
				if (bucket[i].key == key) {
					this.buckets[index].splice(i, 1);
					return true;
				}
			}
		}
		return false;
	}

	length() {
		let counter = 0;

		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				counter += this.buckets[i].length;
			}
		}

		return counter;
	}

	clear() {
		this.buckets = new Array(this.buckets_nbr);
	}

	keys() {
		let keys = [];

		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				for (let j = 0; j < this.buckets[i].length; j++) {
					keys.push(this.buckets[i][j].key);
				}
			}
		}

		return keys;
	}

	values() {
		let values = [];

		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				for (let j = 0; j < this.buckets[i].length; j++) {
					values.push(this.buckets[i][j].value);
				}
			}
		}

		return values;
	}

	entries() {
		let entries = [];

		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				for (let j = 0; j < this.buckets[i].length; j++) {
					entries.push(this.buckets[i][j]);
				}
			}
		}

		return entries;
	}
}

class Node {
	constructor(key, value) {
		this.key = key;
		this.value = value;
	}
}
