export function bfs(grid, start, end, dirx, diry, draw) {
    const queue = [start];
    const visited = new Set();
    const parent = new Map();
    const path = [];

    visited.add(`${start.x},${start.y}`);
    parent.set(`${start.x},${start.y}`, null);

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function animate() {
        while (queue.length > 0) {
            const node = queue.shift();
            console.log(node);
            if (node.x === end.x && node.y === end.y) {
                let pathNode = node;
                console.log("test");
                while (pathNode) {
                    console.log(pathNode);
                    path.push(pathNode);
                    pathNode = parent.get(`${pathNode.x},${pathNode.y}`);
                }
                path.reverse();

                path.forEach(p => {
                    if (grid[p.x][p.y].class !== 'class0' && grid[p.x][p.y].class !== 'class1') {
                        grid[p.x][p.y].class = 'class4';
                    }
                });
                draw();
                return;
            }

            for (let i = 0; i < 4; i++) {
                const newX = node.x + dirx[i];
                const newY = node.y + diry[i];
                const newPos = { x: newX, y: newY };

                if (isValidMove(newX, newY, grid, visited)) {
                    grid[newX][newY].class = 'class5'; // Corrected variable name
                    visited.add(`${newX},${newY}`);
                    queue.push(newPos);
                    parent.set(`${newX},${newY}`, node);
                }
            }

            draw();
            await delay(10); // Adjust the delay as needed for better animation visibility
        }

        console.log("No path found.");
    }

    animate();
}

function isValidMove(x, y, grid, visited) {
    if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) {
        return false;
    }
    if (visited.has(`${x},${y}`)) {
        return false;
    }
    if (grid[x][y].class === 'class3') { // Assuming class3 is an obstacle
        return false;
    }
    return true;
}
