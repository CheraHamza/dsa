function merge(listOne, listTwo) {
	let i = 0,
		j = 0;

	let resultList = [];

	while (i < listOne.length && j < listTwo.length) {
		if (listOne[i] < listTwo[j]) {
			resultList.push(listOne[i++]);
		} else {
			resultList.push(listTwo[j++]);
		}
	}
	for (; i < listOne.length; i++) {
		resultList.push(listOne[i]);
	}

	for (; j < listTwo.length; j++) {
		resultList.push(listTwo[j]);
	}

	return resultList;
}

function mergeSort(list) {
	if (list.length < 2) {
		return list;
	} else {
		const halfPoint = Math.floor(list.length / 2);

		let leftHalf = list.slice(0, halfPoint);
		let rightHalf = list.slice(halfPoint);

		return merge(mergeSort(leftHalf), mergeSort(rightHalf));
	}
}

