function sumRange(n) {
	if (n == 1) {
		return n;
	} else {
		return n + sumRange(n - 1);
	}
}

function power(x, n) {
	if (n == 0) {
		return 1;
	} else {
		return x * power(x, n - 1);
	}
}

function factorial(n) {
	if (n == 1) {
		return 1;
	} else {
		return n * factorial(n - 1);
	}
}

function all(array, callback) {
	if (array.length == 0) return true;

	if (callback(array[0])) {
		array.shift();
		return all(array, callback);
	} else {
		return false;
	}
}

let allAreIntegers = all([1, 0, 43, 4, 55, 1], (n) => {
	return Number.isInteger(n);
});

function productOfArray(array) {
	if (array.length == 0) return 0;

	if (array.length == 1) {
		return array[0];
	} else {
		return array.shift() * productOfArray(array);
	}
}

function contains(object, searchValue) {
	if (typeof object != "object" || object == null) {
		return object == searchValue;
	}

	for (let value of Object.values(object)) {
		if (contains(value, searchValue)) {
			return true;
		}
	}
	return false;
}

let object = {
	data: {
		name: {
			thing: {
				moreThings: {
					secret: "hamzaisthebfest",
					something: "hohdo",
				},
			},
		},
		trick: "hamzajisthebest",
	},
	data2: {
		name: "hoho",
	},
};

function totalIntegers(array) {
	if (array.length == 0) return 0;

	let total = 0;
	let firstElement = array.shift();

	if (Array.isArray(firstElement)) {
		total += totalIntegers(firstElement);
	} else if (Number.isInteger(firstElement)) {
		total += 1;
	}

	return total + totalIntegers(array);
}

function sumSquares(list) {
	if (list.length == 0) return 0;

	let sum = 0;
	let firstElement = list.shift();

	if (Array.isArray(firstElement)) {
		sum += sumSquares(firstElement);
	} else if (!isNaN(firstElement)) {
		sum += firstElement * firstElement;
	}

	return sum + sumSquares(list);
}

function replicate(n, times) {
	if (times < 1) {
		return [];
	}

	return [n].concat(replicate(n, times - 1));
}

function fibs(n) {
	let array = [];
	let counter = 0;

	while (counter < n) {
		if (counter < 2) {
			array.push(counter);
		} else {
			array.push(array[counter - 1] + array[counter - 2]);
		}
		counter++;
	}

	return array;
}

function fibsRec(n) {
	if (n == 1) {
		return [0];
	}
	if (n == 2) {
		return [0, 1];
	} else {
		const fibs = fibsRec(n - 1);
		fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
		return fibs;
	}
}

function mergeSort(array) {
	if (array.length < 2) return array;
	else {
		let mid = array.length / 2;
		let leftHalf = array.slice(0, mid);
		let rightHalf = array.slice(mid, array.length);

		return merge(mergeSort(leftHalf), mergeSort(rightHalf));
	}
}

function merge(firstHalf, secondHalf) {
	let array = [];
	let i = 0;
	let j = 0;

	while (i < firstHalf.length || j < secondHalf.length) {
		if (firstHalf[i] < secondHalf[j] || j >= secondHalf.length) {
			array.push(firstHalf[i]);
			i++;
		} else {
			array.push(secondHalf[j]);
			j++;
		}
	}
	return array;
}

console.log(sumRange(3));
console.log(power(5, 5));
console.log(factorial(5));
console.log(allAreIntegers);
console.log(productOfArray([1, 2, 3, 10]));
console.log(contains(object, "hoho"));
console.log(totalIntegers([[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]]));
console.log(sumSquares([[1, 2], 3]));
console.log(replicate(5, 5));
console.log(fibsRec(8));
console.log(merge([5, 6, 7], [1, 2, 3]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1, 4]));
