let arr = [[], [], [], [], [], [], [], [], []]
let board = [[], [], [], [], [], [], [], [], []]

for (let i = 0; i < 9; i++) {
	for (let j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j)

	}
}

function FillBoard(board) {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	let xhrRequest = new XMLHttpRequest()
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	xhrRequest.send()
	xhrRequest.onload = function () {
		let response = JSON.parse(this.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}

}

SolvePuzzle.onclick = () => {
	sudokuSolver(board, 0, 0, 9)
};

function sudokuSolver(board, i, j, n) {
	if (i == n) {
		FillBoard(board)
		return true
	}

	if (j == n) {
		return sudokuSolver(board, i + 1, 0, n)
	}

	if (board[i][j] != 0)
		return sudokuSolver(board, i, j + 1, n)

	for (let num = 1; num <= 9; num++) {
		if (isValid(board, i, j, num, n)) {
			board[i][j] = num
			let subAns = sudokuSolver(board, i, j + 1, n)
			if (subAns) {
				return true
			}
			board[i][j] = 0

		}
	}
	return false

}

function isValid(board, i, j, num, n) {
	for (let x = 0; x < n; x++) {
		if (board[x][j] == num || board[i][x] == num) {
			return false
		}
	}
	let root_n = Math.sqrt(n)
	let start_i = i - i % root_n
	let start_j = j - j % root_n

	for (let x = start_i; x < start_i + root_n; x++) {
		for (let y = start_j; y < start_j + root_n; y++) {
			if (board[x][y] == num)
				return false
		}
	}
	return true
}

