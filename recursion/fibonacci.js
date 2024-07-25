function fibs(number) {
	let counter = 0;
	let fibSequence = [];

	while (counter < number) {
		if (fibSequence.length < 2) {
			fibSequence.push(counter);
		} else {
			fibSequence[counter] =
				fibSequence[counter - 1] + fibSequence[counter - 2];
		}
		counter++;
	}

	return fibSequence;
}

function fibsRec(length) {
    if (length === 1) {
        return [0];
    } else if (length === 2) {
        return [0, 1];
    } else {

        const fibs = fibsRec(length - 1);

        const nextFib = fibs[fibs.length - 1] + fibs[fibs.length - 2];

        fibs.push(nextFib);
        return fibs;
    }
}

