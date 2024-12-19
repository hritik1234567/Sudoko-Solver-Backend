
    const isValid = (board, i, j, num) => {
        // Check row
        for (let p = 0; p < 9; p++) {
            if (board[i][p] === num) return false;
        }
        // Check column
        for (let p = 0; p < 9; p++) {
            if (board[p][j] === num) return false;
        }
        // Check subgrid (3x3)
        const a = Math.floor(i / 3) * 3;
        const b = Math.floor(j / 3) * 3;
        for (let p = 0; p < 3; p++) {
            for (let q = 0; q < 3; q++) {
                if (board[a + p][b + q] === num) return false;
            }
        }
        return true;
    };

    const solve = (board) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '') {
                    for (let num = 1; num <= 9; num++) {
                        const charNum = num.toString();
                        if (isValid(board, i, j, charNum)) {
                            board[i][j] = charNum; // Place number
                            //console.log("I am running");
                            if (solve(board)) return true; // Continue solving
                            board[i][j] = ''; // Backtrack if needed
                        }
                    }
                    return false; // No valid number found
                }
            }
        }
        return true; // Solved
    };

     // Mutate the board in place

     //const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const sudokoController = async(req, res) => {
    const board = req.body.grid; // 9x9 matrix from frontend
    // Validate grid structure and values
    if (!board || board.length !== 9 || board.some(row => row.length !== 9)) {
        return res.status(400).json({ error: 'Invalid board format, must be a 9x9 matrix' });
    }

    // Ensure the board contains valid Sudoku characters (1-9, or empty cells '.')
    if (board.some(row => row.some(cell => !['', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(cell)))) {
        return res.status(400).json({ error: 'Board contains invalid characters, only digits (1-9) or "" allowed' });
    }

    try {
        const clonedBoard = board.map(row => row.slice()); // Deep copy to avoid mutating the original input

        solve(board); // Directly modifies clonedBoard
        //await delay(2000)
        // Log the solved board
        return res.json({ solvedBoard: board }); // Return the modified (solved) board
    } catch (error) {
        console.error("Error solving Sudoku:", error);
        return res.status(500).json({ error: 'Error solving Sudoku' });
    }
};

module.exports = {
    sudokoController
};
