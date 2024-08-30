const gridContainer = document.getElementById('grid-container');
const rows = 20;
const cols = 20;
let grid = [];
let dragging = false;
let dragTarget = null;
const start = { x: 1, y: 2 };
const end = { x: 1, y: 9 };

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
                row.push({ 'element': cell, 'state': 'start' });
            } else if (i === end.x && j === end.y) {
                cell.classList.add('end');
                row.push({ 'element': cell, 'state': 'end' });
            } else {
                row.push({ 'element': cell, 'state': 'empty' });
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
        }else if(dragTarget=='wall'){
           if(grid[x][y].state=='empty'){
            toggleWall(x,y);
           }
        }
    }
}

function onMouseUp(event) {
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
    // Clear previous start position
    grid[start.x][start.y].element.classList.remove('start');
    grid[start.x][start.y].state = 'empty';

    // Update to new position
    start.x = x;
    start.y = y;
    grid[x][y].element.classList.add('start');
    grid[x][y].state = 'start';
}

function updateEndPosition(x, y) {
    // Clear previous end position
    grid[end.x][end.y].element.classList.remove('end');
    grid[end.x][end.y].state = 'empty';

    // Update to new position
    end.x = x;
    end.y = y;
    grid[x][y].element.classList.add('end');
    grid[x][y].state = 'end';
}
function draw() {
    // Iterate over each row in the grid
    grid.forEach(row => {
        // Iterate over each cell in the row
        row.forEach(cell => {
            // Remove all previously applied classes to reset the cell's visual state
            cell.element.className = 'grid-cell';

            // Apply the appropriate class based on the cell's current state
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

createGrid();

// Add event listeners for your buttons to trigger different algorithms
document.getElementById('bfsButton').addEventListener('click', () => {
    bfs(grid, start, end, dirx, diry, draw);
});

document.getElementById('resetButton').addEventListener('click', () => {
    createGrid();
});
