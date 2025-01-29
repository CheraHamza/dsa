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
	let visitedMoves = [];
	let track = [];
	let arrived = false;

	const firstTrace = {
		pos: startingSquare,
		predecessors: [],
	};

	track.push(firstTrace);

	while (!arrived) {
		let currPos = queue[0];

		if (currPos[0] == destSquare[0] && currPos[1] == destSquare[1]) {
			arrived = true;
		} else {
			visitedMoves.push(currPos);
			queue.shift();

			for (const move of getPossibleMoves(currPos[0], currPos[1])) {
				let visited = false;
				for (const visitedMove of visitedMoves) {
					if (move[0] == visitedMove[0] && move[1] == visitedMove[1]) {
						visited = true;
					}
				}
				if (!visited) {
					queue.push(move);
					const getPredecessors = () => {
						let predecessors = [];
						for (const trace of track) {
							const square = trace.pos;
							if (square[0] == currPos[0] && square[1] == currPos[1]) {
								for (const move of trace.predecessors) {
									predecessors.push(move);
								}
								predecessors.push(currPos);
							}
						}
						return predecessors;
					};
					let tracked = false;
					for (const trace of track) {
						if (trace.pos[0] == move[0] && trace.pos[1] == move[1]) {
							tracked = true;
						}
					}
					if (!tracked) {
						let newTrace = {
							pos: move,
							predecessors: getPredecessors(),
						};

						track.push(newTrace);
					}
				}
			}
		}
	}

	let numberOfMoves = 0;
	let shortestPath = [];

	for (const trace of track) {
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