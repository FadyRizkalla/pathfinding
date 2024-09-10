function bfs(grid, start, end) {
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
            path.forEach(p => {
                if (grid[p.x][p.y].state !== 'start' && grid[p.x][p.y].state !== 'end') {
                    grid[p.x][p.y].state = 'path';
                    draw();
                    setTimeout(speed);
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
                grid[newX][newY].state = 'visited';
                visited.add(`${newX},${newY}`);
                queue.push(newPos);
                parent.set(`${newX},${newY}`, node);
            }
        }
        draw();
    }

    console.log('No path found.');
}
