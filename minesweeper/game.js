// Global Variables
let board = [];
let bombs = 0;
let cells;
const size = 7;

const clearStyle =
    "width: 40px;" +
    "height: 40px;" +
    "border: 1px solid #9b9b9b;" +
    "background-color: white;" +
    "display: inline-block;" +
    "font-size: 20px;" +
    "line-height: 40px;" +
    "text-align: center;" +
    "cursor: crosshair;"


// Game Board Setup
function setupGame() {
    board = [];
    for (let i = 0; i < size; i++) {
        let boardRow = [];
        for (let j = 0; j < size; j++) {
            boardRow.push(0)
        }
        board.push(boardRow);
        console.log(board)
    }
    let bombCount = 0;
    // Расстановка мин по полю
    while (bombCount < size * 4 + 1) {
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);

        if (board[row][col] === 0) {
            board[row][col] = 1;
            bombCount++;
        }
    }

    // Игровое поле
    let html = '<table>';
    for (let i = 0; i < size; i++) {
        html += "<tr>";
        for (let j = 0; j < size; j++) {
            html += '<td class="cell" onclick="cellClicked(' + i + ',' + j + ')"></td>';
        }
        html += "</tr>";
    }
    html += "</table>";
    document.getElementById("game-board").innerHTML = html;

    // Setting up the cells array
    cells = document.querySelectorAll(".cell");
}

// Cell Clicked Event Handler
function cellClicked(row, col) {
    if (!cells[row * size + col].classList.contains('checked')) {
        cells[row * size + col].classList.add('checked');
        // Проверка на наличие бомбы в нажатой клетке
        if (board[row][col] === 1) {
            cells[row * size + col].innerHTML = "*";
            cells[row * size + col].style.backgroundColor = "#f00";

            // Показать все бомбы
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (board[i][j] === 1) {
                        cells[i * size + j].innerHTML = "*";
                        cells[i * size + j].style.backgroundColor = "#f00";
                        cells[i * size + j].style.cursor = "default"
                    }
                }
            }
        } else {
            // Проверка соседних клеток на число бомб
            let count = 0;
            let rowStart = row - 1 < 0 ? 0 : row - 1;
            let rowEnd = row + 1 > size - 1 ? size - 1 : row + 1;
            let colStart = col - 1 < 0 ? 0 : col - 1;
            let colEnd = col + 1 > size - 1 ? size - 1 : col + 1;
            for (let i = rowStart; i <= rowEnd; i++) {
                for (let j = colStart; j <= colEnd; j++) {
                    if (board[i][j] === 1) {
                        count++;
                    }
                }
            }
            cells[row * size + col].innerHTML = count > 0 ? String(count) : "";
        }
    } else {
        cells[row * size + col].addEventListener('mousedown', (event) => {
            rowStart = row - 1 < 0 ? 0 : row - 1;
            rowEnd = row + 1 > size - 1 ? size - 1 : row + 1;
            colStart = col - 1 < 0 ? 0 : col - 1;
            colEnd = col + 1 > size - 1 ? size - 1 : col + 1;
            for (let i = rowStart; i <= rowEnd; i++) {
                for (let j = colStart; j <= colEnd; j++) {
                    if (cells[i * size + j].innerHTML == "") {
                        cells[i * size + j].classList.add("cellCheck");
                    }
                }
            }

        });
        cells[row * size + col].addEventListener('mouseup', (event) => {
            rowStart = row - 1 < 0 ? 0 : row - 1;
            rowEnd = row + 1 > size - 1 ? size - 1 : row + 1;
            colStart = col - 1 < 0 ? 0 : col - 1;
            colEnd = col + 1 > size - 1 ? size - 1 : col + 1;
            for (let i = rowStart; i <= rowEnd; i++) {
                for (let j = colStart; j <= colEnd; j++) {
                    if (cells[i * size + j].innerHTML == "") {
                        cells[i * size + j].classList.remove("cellCheck")
                    }
                }
            }

        });
    }


}

setupGame();

function restartGame() {
    document.getElementById("game-board").innerHTML = "";
    let board = [];
    let bombs = 0;
    let cells;
    const size = 7;
    setupGame();
}
