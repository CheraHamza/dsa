function getPossibleMoves(x, y) {
	if (x >= 0 && x < 8 && y >= 0 && y < 8) {
		return [
			[x + 1, y + 2],
			[x + 1, y - 2],
			[x + 2, y + 1],
			[x + 2, y - 1],
			[x - 1, y + 2],
			[x - 1, y - 2],
			[x - 2, y + 1],
			[x - 2, y - 1],
		].filter(
			(move) => move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8
		);
	} else {
		throw new Error("Initial position is unvalid");
	}
}

function knightMoves(startingSquare, destSquare) {
	let queue = [startingSquare];
	let visitedSquares = [];
	let predecessorMap = [];
	let arrived = false;

	const initialPositionTrace = {
		pos: startingSquare,
		predecessors: [],
	};

	predecessorMap.push(initialPositionTrace);

	while (!arrived) {
		let currSquare = queue[0];

		if (currSquare[0] == destSquare[0] && currSquare[1] == destSquare[1]) {
			arrived = true;
		} else {
			visitedSquares.push(currSquare);
			queue.shift();

			for (const possibleSquare of getPossibleMoves(
				currSquare[0],
				currSquare[1]
			)) {
				let visited = false;
				for (const visitedSquare of visitedSquares) {
					if (
						possibleSquare[0] == visitedSquare[0] &&
						possibleSquare[1] == visitedSquare[1]
					) {
						visited = true;
					}
				}
				if (!visited) {
					queue.push(possibleSquare);
					const getPredecessors = () => {
						let predecessors = [];
						for (const trace of predecessorMap) {
							const square = trace.pos;
							if (square[0] == currSquare[0] && square[1] == currSquare[1]) {
								for (const predecessor of trace.predecessors) {
									predecessors.push(predecessor);
								}
								predecessors.push(currSquare);
							}
						}
						return predecessors;
					};
					let tracked = false;
					for (const trace of predecessorMap) {
						if (
							trace.pos[0] == possibleSquare[0] &&
							trace.pos[1] == possibleSquare[1]
						) {
							tracked = true;
						}
					}
					if (!tracked) {
						let newTrace = {
							pos: possibleSquare,
							predecessors: getPredecessors(),
						};

						predecessorMap.push(newTrace);
					}
				}
			}
		}
	}

	let numberOfMoves = 0;
	let shortestPath = [];

	for (const trace of predecessorMap) {
		let square = trace.pos;
		if (square[0] == destSquare[0] && square[1] == destSquare[1]) {
			shortestPath = trace.predecessors;
			shortestPath.push(trace.pos);
			numberOfMoves = shortestPath.length - 1;
		}
	}

	console.log("You made it in", numberOfMoves, "moves! Here's your path:");
	for (const square of shortestPath) {
		console.log(square);
	}
}

knightMoves([3, 3], [4, 3]); // test results
