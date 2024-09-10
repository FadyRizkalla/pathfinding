const gridContainer = document.getElementById('grid-container');

const rows = 25;
const cols = 25;
let grid = [];
let dragging = false;
let dragTarget = null;
let start = { x: 3, y: 2 };
let end = { x: 1, y: 9 };
let speed=90;

const blocked = new Set();
function createGrid() {
    grid = [];
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    gridContainer.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = i;
            cell.dataset.col = j;

            if (i === start.x && j === start.y) {
                cell.classList.add('start');
                row.push({ element: cell, state: 'start' });
            } else if (i === end.x && j === end.y) {
                cell.classList.add('end');
                row.push({ element: cell, state: 'end' });
            } else {
                row.push({ element: cell, state: 'empty' });
            }

            cell.addEventListener('mousedown', onMouseDown);
            cell.addEventListener('mouseenter', onMouseEnter);
            cell.addEventListener('mouseup', onMouseUp);

            gridContainer.appendChild(cell);
        }
        grid.push(row);
    }
}

function onMouseDown(event) {
    const cell = event.target;
    const x = parseInt(cell.dataset.row);
    const y = parseInt(cell.dataset.col);

    if (grid[x][y].state === 'start') {
        dragging = true;
        dragTarget = 'start';
    } else if (grid[x][y].state === 'end') {
        dragging = true;
        dragTarget = 'end';
    } else {
        toggleWall(x, y);
        dragging = true;
        dragTarget = 'wall';
    }
}

function onMouseEnter(event) {
    if (dragging) {
        const cell = event.target;
        const x = parseInt(cell.dataset.row);
        const y = parseInt(cell.dataset.col);

        if (dragTarget === 'start') {
            updateStartPosition(x, y);
        } else if (dragTarget === 'end') {
            updateEndPosition(x, y);
        } else if (dragTarget === 'wall') {
            if (grid[x][y].state === 'empty') {
                toggleWall(x, y);
            }
        }
    }
}

function onMouseUp() {
    dragging = false;
    dragTarget = null;
}

function toggleWall(x, y) {
    const cell = grid[x][y];
    if (cell.state === 'empty') {
        cell.state = 'wall';
        cell.element.classList.add('wall');
    } else if (cell.state === 'wall') {
        cell.state = 'empty';
        cell.element.classList.remove('wall');
    }
}

function updateStartPosition(x, y) {
    grid[start.x][start.y].element.classList.remove('start');
    grid[start.x][start.y].state = 'empty';

    start = { x, y };
    grid[x][y].element.classList.add('start');
    grid[x][y].state = 'start';
}

function updateEndPosition(x, y) {
    grid[end.x][end.y].element.classList.remove('end');
    grid[end.x][end.y].state = 'empty';

    end = { x, y };
    grid[x][y].element.classList.add('end');
    grid[x][y].state = 'end';
}

function draw() {
    grid.forEach(row => {
        row.forEach(cell => {
            cell.element.className = 'grid-cell';

            if (cell.state === 'start') {
                cell.element.classList.add('start');
            } else if (cell.state === 'end') {
                cell.element.classList.add('end');
            } else if (cell.state === 'wall') {
                cell.element.classList.add('wall');
            } else if (cell.state === 'visited') {
                cell.element.classList.add('visited');
            } else if (cell.state === 'path') {
                cell.element.classList.add('path');
            }
        });
    });
}

async function bfs(grid, start, end) {
    const queue = [start];
    const visited = new Set();
    const parent = new Map();
    const path = [];
    const dirx = [1, 0, -1, 0];
    const diry = [0, 1, 0, -1];

    visited.add(`${start.x},${start.y}`);
    parent.set(`${start.x},${start.y}`, null);

    while (queue.length > 0) {
        const node = queue.shift();

        if (node.x === end.x && node.y === end.y) {
            let pathNode = node;
            while (pathNode) {
                path.push(pathNode);
                pathNode = parent.get(`${pathNode.x},${pathNode.y}`);
            }
            path.reverse();
            for (const p of path) {
                if (grid[p.x][p.y].state !== 'start' && grid[p.x][p.y].state !== 'end') {
                    grid[p.x][p.y].state = 'path';
                    grid[p.x][p.y].element.classList.add('path');  // Update the element's class
                     // Animation delay
                     await delay(speed);
                  //  draw();  // Ensure the grid is redrawn to reflect changes
                }
            }
            draw();
            return;
        }

        for (let i = 0; i < 4; i++) {
            const newX = node.x + dirx[i];
            const newY = node.y + diry[i];
            const newPos = { x: newX, y: newY };

            if (isValidMove(newX, newY, grid, visited)) {
                grid[newX][newY].state = 'visited';
                if(newX==end.x&&newY==end.y){
                   
                }else{
                    grid[newX][newY].element.classList.add('visited');
                }
               
                visited.add(`${newX},${newY}`);
                queue.push(newPos);
                parent.set(`${newX},${newY}`, node);
            }
        }
        await delay(speed);
    }

    console.log('No path found.');
}
//


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isValidMove(x, y, grid, visited) {
    if (x < 0 || y < 0 || x >= rows || y >= cols) return false;
    if (visited.has(`${x},${y}`)) return false;
    if (grid[x][y].state === 'wall') return false;
    return true;
}
async function drawBorder() {
    // Top border
    for (let col = 0; col < cols; col++) {
        grid[0][col].element.classList.add('wall');
        blocked.add(`${col},0`);
        await delay(speed); // Delay for animation
    }

    // Right border
    for (let row = 1; row < rows; row++) {
        grid[row][cols - 1].element.classList.add('wall');
        blocked.add(`${cols - 1},${row}`);
        await delay(speed); // Delay for animation
    }

    // Bottom border
    for (let col = cols - 2; col >= 0; col--) {
        grid[rows - 1][col].element.classList.add('wall');
        blocked.add(`${col},${rows - 1}`);
        await delay(speed); // Delay for animation
    }

    // Left border
    for (let row = rows - 2; row > 0; row--) {
        grid[row][0].element.classList.add('wall');
        blocked.add(`0,${row}`);
        await delay(speed); // Delay for animation
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


document.getElementById('recursiveMaze').addEventListener('click', () => {

    createGrid();
drawBorder();

    //recursiveDivision(grid, 0, 0, rows, cols, blocked, start, end);
});
document.getElementById('bfsAlgorithm').addEventListener('click', async () => {
    await bfs(grid, start, end);
});

createGrid();