document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const gameStatus = document.getElementById("gameStatus");
    const resetButton = document.getElementById("resetButton");
    const playAgainstAIButton = document.getElementById("playAgainstAIButton");
    
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    let playAgainstAI = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (board[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            gameStatus.textContent = `${currentPlayer} has won!`;
            gameActive = false;
            return;
        }

        if (board.every(cell => cell !== "")) {
            gameStatus.textContent = `Game ended in a draw!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        gameStatus.textContent = `It's ${currentPlayer}'s turn`;

        if (playAgainstAI && currentPlayer === "O") {
            aiMove();
        }
    };

    const checkWin = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const resetGame = () => {
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        gameStatus.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
    };

    const aiMove = () => {
        let availableCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
        let randomCellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomCellIndex] = "O";
        cells[randomCellIndex].textContent = "O";
        currentPlayer = "X";
        gameStatus.textContent = `It's ${currentPlayer}'s turn`;
        if (checkWin()) {
            gameStatus.textContent = `O has won!`;
            gameActive = false;
        }
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    playAgainstAIButton.addEventListener("click", () => {
        playAgainstAI = !playAgainstAI;
        resetGame();
        playAgainstAIButton.textContent = playAgainstAI ? "Play Against Human" : "Play Against AI";
    });

    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
});
