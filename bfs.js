// bfs.js

export function bfs(grid, start, end, dirx, diry, draw) {
    const queue = [{ x: start.x, y: start.y }];
    const visited = new Set();
    const parent = new Map();
    const path = [];
    
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
            path.forEach(p => {
                if (grid[p.x][p.y].state !== 'start' && grid[p.x][p.y].state !== 'end') {
                    grid[p.x][p.y].element.classList.add('path'); // Use CSS class for path
                    grid[p.x][p.y].state = 'path';
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
                grid[newX][newY].element.classList.add('visited'); // Use CSS class for visited nodes
                grid[newX][newY].state = 'visited';
                visited.add(`${newX},${newY}`);
                queue.push(newPos);
                parent.set(`${newX},${newY}`, node);
            }
        }
        setTimeout(draw, 50); // Adjust the timeout for animation
    }

    console.log("No path found.");
}

function isValidMove(x, y, grid, visited) {
    if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) {
        return false;
    }
    if (visited.has(`${x},${y}`)) {
        return false;
    }
    if (grid[x][y].state === 'wall') { // Assuming 'wall' is the state for obstacles
        return false;
    }
    return true;
}
