export async function runDFS(grid, start, end, delay, draw, speed) {
    const stack = [start];
    const visited = new Set();
    const parent = new Map();

    
    parent.set(`${start.x},${start.y}`, null);

    const directions = [
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
    ];

    while (stack.length > 0) {
        const node = stack.pop();
        const key = `${node.x},${node.y}`;

        if (visited.has(key)) continue;
        visited.add(key);

        // 👇 VISUAL UPDATE MUST HAPPEN BEFORE delay
        if (grid[node.x][node.y].state !== 'start' && grid[node.x][node.y].state !== 'end') {
            grid[node.x][node.y].state = 'visited';
            grid[node.x][node.y].element.classList.add('visited');
            await delay(speed);  // 👈 Required to show updates
        }

        if (node.x === end.x && node.y === end.y) {
            // Backtrack and build path
            let pathNode = node;
            while (pathNode) {
                const pathKey = `${pathNode.x},${pathNode.y}`;
                if (grid[pathNode.x][pathNode.y].state !== 'start' &&
                    grid[pathNode.x][pathNode.y].state !== 'end') {
                    grid[pathNode.x][pathNode.y].state = 'path';
                    grid[pathNode.x][pathNode.y].element.classList.add('path');
                    await delay(speed);
                }
                pathNode = parent.get(pathKey);
            }
            draw();
            return;
        }

        for (const { dx, dy } of directions) {
            const newX = node.x + dx;
            const newY = node.y + dy;
            const newKey = `${newX},${newY}`;

            if (
                newX >= 0 && newX < grid.length &&
                newY >= 0 && newY < grid[0].length &&
                grid[newX][newY].state !== 'wall' &&
                !visited.has(newKey)
            ) {
                parent.set(newKey, node);
                stack.push({ x: newX, y: newY });
            }
        }
    }

    console.log("No path found.");
}
