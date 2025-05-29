
# 🧭 Pathfinding Visualizer

A fully interactive web-based visualization tool for popular pathfinding and maze generation algorithms. Built using vanilla JavaScript, HTML, and CSS — no frameworks!

## 🔍 Features

- ✅ Depth-First Search (DFS)
- ✅ Breadth-First Search (BFS)
- ✅ A* Search Algorithm
- ✅ Greedy DFS
- ✅ Recursive Division Maze Generation
- 🖱 Drag-and-drop Start and End nodes
- 🧱 Wall drawing with mouse
- 🎞️ Animated visualization with adjustable speed
- 🔁 Reset and replay support

---

## 🚀 Demo

[![Watch the Demo](https://img.youtube.com/vi/d0BtZuR7I1g/0.jpg)](https://www.youtube.com/watch?v=d0BtZuR7I1g)

📺 Click the image above to watch the demo on YouTube.

---

## 📸 Screenshots

### DFS in Action
![DFS](screenshots/DFS.gif)

### A* Search
![BFS](screenshots/BFS.png)

### Maze Generation
![Maze](screenshots/Recursive_Division.png)

---

## 🧪 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/pathfinding-visualizer.git
cd pathfinding-visualizer

# Run a local server
python -m http.server

Then open in your browser:
http://localhost:8000/index.html

📂 Project Structure
| File         | Description                          |
| ------------ | ------------------------------------ |
| `index.html` | Main UI structure                    |
| `go.js`      | Grid creation, DOM events            |
| `dfs.js`     | Depth-First Search                   |
| `bfs.js`     | Breadth-First Search                 |
| `maze.js`    | Recursive Division Maze              |
| `style.css`  | CSS styles for layout and animations |
