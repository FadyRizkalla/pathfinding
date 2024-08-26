// main.js

import { bfs } from './bfs.js';

const canvas = document.getElementById("canvas1");
const c = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 1000;
canvas.height = 1000;

// Grid and cell size
const cellSize = 30;
const grid = [];

// Start and end points
let start = null;
let end = null;

// Dragging state
let dragging = false;
let dragTarget = null;
const dirx = [0, 0, 1, -1];
const diry = [1, -1, 0, 0];

// Define colors for each class
const colors = {
    class0: 'rgba(0, 255, 0, 0.8)',    // green (start)
    class1: 'rgba(255, 0, 0, 0.8)',    // red (end)
    class2: 'rgba(255, 255, 255, 0.8)', // white (regular cell)
    class3: 'rgba(0, 0, 0, 0.8)',       // black (obstacle)
    class4: 'rgba(0, 0, 255, 0.8)',     // blue (path)
    class5: 'rgba(128, 0, 128, 0.8)'    // purple (animated or considered cell)
};

// Setup the grid
function setup() {
    const rows = Math.floor(canvas.height / cellSize);
    const cols = Math.floor(canvas.width / cellSize);

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = {
                x: j * cellSize,  // Correct x position (column)
                y: i * cellSize,  // Correct y position (row)
                width: cellSize,
                height: cellSize,
                class: 'class2',  // Start as a regular cell
            };
        }
    }
}

// Get grid indices from pixel coordinates
function get_index(x, y) {
    return {
        x: Math.floor(x / cellSize),
        y: Math.floor(y / cellSize)
    };
}

// Draw the grid
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas before drawing
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const rect = grid[i][j];
            c.fillStyle = colors[rect.class];
            c.fillRect(rect.x, rect.y, rect.width, rect.height);
            c.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }
    }
}

// Handle mouse events
canvas.addEventListener('mousedown', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const pos = get_index(mouseX, mouseY);
    const cell = grid[pos.y][pos.x]; // Correctly use y for row and x for column

    if (start && pos.x === start.x && pos.y === start.y) {
        dragging = true;
        dragTarget = 'start';
    } else if (end && pos.x === end.x && pos.y === end.y) {
        dragging = true;
        dragTarget = 'end';
    } else {
        if (!start) {
            start = pos;
            cell.class = 'class0';  // Mark as start cell (green)
        } else if (!end) {
            end = pos;
            cell.class = 'class1';  // Mark as end cell (red)
        } else {
            cell.class = cell.class === 'class3' ? 'class2' : 'class3';  
        }
    }

    draw();  // Redraw the grid with updated state
});

canvas.addEventListener('mousemove', function(event) {
    if (dragging) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const pos = get_index(mouseX, mouseY);
        const cell = grid[pos.y][pos.x]; // Correctly use y for row and x for column

        if (dragTarget === 'start') {
            if (start) {
                grid[start.y][start.x].class = 'class2';  // Reset previous start cell
            }
            start = pos;
            cell.class = 'class0';  // Mark as start cell (green)
        } else if (dragTarget === 'end') {
            if (end) {
                grid[end.y][end.x].class = 'class2';  // Reset previous end cell
            }
            end = pos;
            cell.class = 'class1';  // Mark as end cell (red)
        } else {
            cell.class = 'class3';  // Mark as obstacle (black)
        }
        draw();  // Redraw the grid with updated state
    }
});

canvas.addEventListener('mouseup', function() {
    dragging = false;
    dragTarget = null;
});

// Find and draw the path using BFS
function findpath() {
    if (!start || !end) {
        console.log("Start or end point is not set.");
        return;
    }

    // Clear previous path
    grid.forEach(row => row.forEach(cell => {
        if (cell.class === 'class4') {
            cell.class = 'class2'; // Reset path cells to regular cells
        }
    }));
 
    bfs(grid, start, end, dirx, diry, draw);
}

// Set up and draw the initial grid
setup();
draw();

// Add event listener to the button
document.getElementById('findPathButton').addEventListener('click', findpath);
