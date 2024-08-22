const canvas = document.getElementById("canvas1");
const c = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fill the background with a semi-transparent blue rectangle

// Array to hold rectangle objects
const rectangles = [];


// Define colors for each class
const colors = {
    class1: 'rgba(200, 9, 0, 0.8)',  // red
    class2: 'rgba(0, 150, 255, 0.8)',  // blue
    class3: 'rgba(0, 255, 150, 0.8)'  // green
};

// Create a grid of rectangles
for (let j = 30; j < 300; j += 33) {
    for (let i = 150; i < 300; i += 33) {
        const rectClass = 'class1';  // Set the class for the rectangle
        
        // Create a rectangle object
        const rectangle = {
            x: i,
            y: j,
            width: 30,
            height: 30,
            class: rectClass  // Use rectClass here
        };
        
        // Add the rectangle object to the array
        rectangles.push(rectangle);
    }
}

// Function to draw the rectangles on the canvas
function draw() {
    rectangles.forEach(rect => {
        c.fillStyle = colors[rect.class];  // Use rect.class here
        c.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
}
for(let i=0;i<19;i++){
    rectangles[i].class='class2';
    draw();
}
rectangles[0].class='class1';
// Call the draw function to render the rectangles
draw();
