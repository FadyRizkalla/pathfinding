This is a web-based interactive tool for visualizing pathfinding algorithms. The goal is to provide a hands-on learning experience for understanding algorithms like Dijkstra, A*, BFS, and DFS in action.

Features
Algorithms Supported:
Dijkstra's Algorithm
A* Search
Breadth-First Search (BFS)
Depth-First Search (DFS)
Interactive Grid:
Place and move start/end points.
Add or remove obstacles dynamically.
Customize the grid size for testing.
Real-Time Visualization:
Step-by-step exploration of nodes.
Highlights explored paths and shortest routes.
Statistics Panel:
Shows algorithm runtime and path length.
Technologies Used
HTML: Structure of the application.
CSS: Styling and layout.
JavaScript: Algorithm logic and visualization.
Canvas API/SVG: Rendering the grid and animations.
Getting Started
Prerequisites
A modern web browser (e.g., Chrome, Firefox).
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/FadyRizkalla/pathfinding.git
Navigate to the project folder:

bash
Copy code
cd pathfinding
Open index.html in your web browser:

Double-click index.html or right-click and choose Open With > Browser.
Usage
Open the application.
Use the interactive grid to:
Place a start and end point by clicking.
Add or remove obstacles by dragging your mouse.
Select an algorithm from the menu.
Click the "Visualize" button to see the selected algorithm in action.
Modify the grid or algorithm and re-run as needed.
Project Structure
plaintext
Copy code
pathfinding/
├── styles/
│   └── styles.css       # Styling for the project
├── scripts/
│   └── main.js          # Algorithm logic and interactivity
├── index.html           # Main HTML file
├── README.md            # Project documentation
└── LICENSE              # License information
Planned Features
Weighted Grids: Allow cells to have different movement costs.
Algorithm Comparison Mode: Visualize two algorithms side-by-side.
Performance Metrics: Show time and space complexity.
Dark Mode: Provide a customizable theme for better usability.
Contributing
Contributions are welcome! To suggest changes or add new features:

Fork the repository.
Create a new branch for your changes.
Submit a pull request for review.
License
This project is licensed under the MIT License.


