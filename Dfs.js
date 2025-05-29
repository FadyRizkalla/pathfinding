// dfs.js
export async function runDFS(grid, start, end, delay, draw, speed) {
    const stack = [start];
    const visited = new Set();
    const parent = new Map();

    visited.add(`${start.x},${start.y}`);
    parent.set(`${start.x},${start.y}`, null);

    const directions = [
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
    ];

    while (stack.length > 0) {
        const node = stack.pop();

        if (node.x === end.x && node.y === end.y) {
            let pathNode = node;
            while (pathNode) {
                const key = `${pathNode.x},${pathNode.y}`;
                if (grid[pathNode.x][pathNode.y].state !== 'start' &&
                    grid[pathNode.x][pathNode.y].state !== 'end') {
                    grid[pathNode.x][pathNode.y].state = 'path';
                    grid[pathNode.x][pathNode.y].element.classList.add('path');
                    await delay(speed);
                }
                pathNode = parent.get(key);
            }
            draw();
            return;
        }

        for (const { dx, dy } of directions) {
            const newX = node.x + dx;
            const newY = node.y + dy;
            const key = `${newX},${newY}`;

            if (
                newX >= 0 && newX < grid.length &&
                newY >= 0 && newY < grid[0].length &&
                grid[newX][newY].state !== 'wall' &&
                !visited.has(key)
            ) {
                visited.add(key);
                parent.set(key, node);
                grid[newX][newY].state = 'visited';
                if (grid[newX][newY].state !== 'end') {
                    grid[newX][newY].element.classList.add('visited');
                }
                stack.push({ x: newX, y: newY });
                await delay(speed);
            }
        }
    }

    console.log("No path found.");
}
