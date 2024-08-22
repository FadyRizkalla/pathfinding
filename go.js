const canvas = document.getElementById("canvas1");
const c = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold rectangle objects
const gridSize = 30;
const grid = [];
let start = null;
let end = null;
let dragging = false;
let dragTarget = null;

// Define colors for each class
const colors = {
    class0: 'rgba(200, 9, 0, 0.8)',  // red
    class1: 'rgba(0, 150, 255, 0.8)',  // blue
    class2: 'rgba(0, 255, 150, 0.8)', // green
    class3: 'rgba(0, 250, 150, 0.8)'  // light green
};

// Array to count occurrences of each type of cell
const counts = [0, 0, 0];

function setup() {
    const rows = Math.floor(canvas.height / gridSize);
    const cols = Math.floor(canvas.width / gridSize);

    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            // Create a rectangle object with initial state 0
            const rectangle = {
                x: i * gridSize,
                y: j * gridSize,
                width: gridSize,
                height: gridSize,
                class: 'class0',  // Start with class0
                state: 0
            };
            grid[i][j] = rectangle;
        }
    }
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas before drawing
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const rect = grid[i][j];
            c.fillStyle = colors[rect.class];  // Use rect.class here
            c.fillRect(rect.x, rect.y, rect.width, rect.height);
            c.strokeRect(rect.x, rect.y, rect.width, rect.height);  // Outline the grid
        }
    }
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = grid[i][j];
            if (mouseX > cell.x && mouseX < cell.x + cell.width &&
                mouseY > cell.y && mouseY < cell.y + cell.height) {
                console.log(`Cell [${i}, ${j}] clicked!`);  // Log the clicked cell

                // Decrement the count for the current state
                counts[cell.state]--;

                // Increment the state and wrap it using modulo
                cell.state = (cell.state + 1) % 4;
                counts[cell.state]++;

                // Update the class based on the state
                cell.class = `class${cell.state}`;

                console.log(cell.class); // Debugging output for the class

                draw();  // Redraw the grid with the updated colors
            }
        }
    }
});

// Initial setup and drawing
setup();
draw();
