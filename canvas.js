const COLORS = ["rgb(214, 0, 255)", "rgb(0, 255, 159)", "rgb(0, 184, 255)"]
let cells = []
let size = 10;

function drawGrid(n) {
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
    cells = [];
    for (let i = 0; i < n; i++) {
        const row = document.createElement("div")
        const tmp = [];
        row.classList.add("row")
        canvas.appendChild(row)
        for (let j = 0; j < n; j++) {
            const cell = document.createElement("div")
            cell.classList.add("cell")
            cell.dataset.row = i.toString();
            cell.dataset.col = j.toString();
            cell.addEventListener('contextmenu', (e)=> {
                e.preventDefault();
                cell.innerHTML = cell.innerHTML === "x" ? "" : "x" ;
            })
            row.appendChild(cell)
            tmp.push(cell)
        }
        cells.push(tmp)
    }
}

function setFirstRowColors() {
    for (let i = 0; i < cells.length; i++) {
        cells[0][i].style.backgroundColor = getRandomColor();
    }
}

function rotateColor(cell) {
    switch (cell.style.backgroundColor) {
        case COLORS[0]:
            cell.style.backgroundColor = COLORS[1];
            break;
        case COLORS[1]:
            cell.style.backgroundColor = COLORS[2];
            break;
        default:
            cell.style.backgroundColor = COLORS[0];
    }
}

function addEventListeners() {
    console.log(cells)
    for (const cell of cells[0]) {
        cell.addEventListener('click', () => {
            rotateColor(cell);
            colorGrid(false);
        })
    }
}

function updateCellAt(i, j) {
    const cell = cells[i][j];
    const colorAbove = cells[i - 1][j].style.backgroundColor;
    const colorRight = cells[i - 1][j + 1].style.backgroundColor;
    cell.style.backgroundColor = getCellColor(colorAbove, colorRight);
}

function colorGrid() {
    for (let i = 1; i < cells.length; i++) {
        for (let j = 0; j < cells.length - i; j++) {
            updateCellAt(i, j);
        }
    }
}

function getCellColor(color1, color2) {
    if (color1 === color2) {
        return color1
    } else if (color1 !== COLORS[0] && color2 !== COLORS[0]) {
        return COLORS[0]
    } else if (color1 !== COLORS[1] && color2 !== COLORS[1]) {
        return COLORS[1]
    } else if (color1 !== COLORS[2] && color2 !== COLORS[2]) {
        return COLORS[2]
    }
}

function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function init() {
    newGrid();
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener('click', newGrid);
}

function newGrid() {
    size = document.getElementById("gridSize").value;
    drawGrid(size);
    setFirstRowColors();
    addEventListeners();
    colorGrid();
}

init();
