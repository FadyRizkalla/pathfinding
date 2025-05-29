const gridContainer = document.getElementById('grid-container');
const cellSize=30;

const cols = Math.floor(window.innerWidth / cellSize);
const rows = Math.floor(window.innerHeight / cellSize);
import { runDFS } from './Dfs.js';

let grid = [];
let dragging = false;
let dragTarget = null;
let start = { x: 3, y: 2 };
let end = { x: 1, y: 9 };
let speed=30;

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

async function recursiveDivision(x, y, x1, y1, depth = 0) {
    if (x1 - x <= 1 || y1 - y <= 1) return;  // Base case: Stop if area is too small to divide

    // Calculate height and width
    let height = x1 - x;
    let width = y1 - y;
    console.log(depth);
    if (height > width) {
        // Step 1: Select a random row for the horizontal wall (within the current bounds)
        let row = Math.floor(Math.random() * (x1 - x - 1)) + x + 1;

        // Step 2: Place the horizontal wall, leaving a random gap (a passage)
        let gap = Math.floor(Math.random() * (y1 - y)) + y;

        let ok = true;
        for (let i = y; i < y1; i++) {
            if (blocked.has(`${row},${i}`)) {
                ok = false;
                break;
            }
        }

        if (ok) {
            for (let i = y; i < y1; i++) {
                if (i !== gap) { // Leave a gap at the randomly chosen position
                    grid[row][i].element.classList.add('wall');
                    grid[row][i].state = 'wall';  // Mark it as a wall in the grid state
                   // Add to blocked set
                    await delay(speed);  // Animate the wall drawing
                }
            }
    
            // Step 3: Recursively divide the upper and lower parts
            blocked.add(`${row},${gap}`);
            await recursiveDivision(x, y, row - 1, y1, depth + 1);  // Upper part
            await recursiveDivision(row + 1, y, x1, y1, depth + 1);  // Lower part
        } else {
            await recursiveDivision(x, y, x1, y1, depth); // Reattempt division without resetting depth
        }
    } else {
        // Step 1: Select a random column for the vertical wall (within the current bounds)
        let col = Math.floor(Math.random() * (y1 - y - 1)) + y + 1;

        // Step 2: Place the vertical wall, leaving a random gap (a passage)
        let gap = Math.floor(Math.random() * (x1 - x)) + x;

        let ok = true;
        for (let i = x; i < x1; i++) {
            if (blocked.has(`${i},${col}`)) {
                ok = false;
                break;
            }
        }

        if (ok) {
            for (let i = x; i < x1; i++) {
                if (i !== gap) { // Leave a gap at the randomly chosen position
                    grid[i][col].element.classList.add('wall');
                    grid[i][col].state = 'wall';  // Mark it as a wall in the grid state
                    // Add to blocked set
                    await delay(speed);  // Animate the wall drawing
                }
            }
            blocked.add(`${gap},${col}`);

            // Step 3: Recursively divide the left and right parts
            await recursiveDivision(x, y, x1, col - 1, depth + 1);  // Left part
            await recursiveDivision(x, col + 1, x1, y1, depth + 1);  // Right part
        } else {
            await recursiveDivision(x, y, x1, y1, depth); // Reattempt division without resetting depth
        }
    }
}


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
        grid[0][col].state='wall';
       
        await delay(speed); // Delay for animation
    }

    // Right border
    for (let row = 1; row < rows; row++) {
        grid[row][cols - 1].element.classList.add('wall');
        grid[row][cols - 1].state='wall';
      
        await delay(speed); // Delay for animation
    }

    // Bottom border
    for (let col = cols - 2; col >= 0; col--) {
        grid[rows - 1][col].element.classList.add('wall');
        grid[rows - 1][col].state='wall';
      
        await delay(speed); // Delay for animation
    }

    // Left border
    for (let row = rows - 2; row > 0; row--) {
        grid[row][0].element.classList.add('wall');
        grid[row][0].state='wall';
       
        await delay(speed); // Delay for animation
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


document.getElementById('recursiveMaze').addEventListener('click', async() => {
    blocked.add(`${start.x},${end.y}`);
    blocked.add(`${end.x},${end.y}`);
    createGrid();
    await drawBorder();

   await recursiveDivision( 1, 1, rows-1, cols-1);
});
document.getElementById('bfsAlgorithm').addEventListener('click', async () => {
    await bfs(grid, start, end);
});
document.getElementById('dfsAlgorithm').addEventListener('click', async () => {
    await runDFS(grid, start, end, delay, draw, speed);
});


createGrid();