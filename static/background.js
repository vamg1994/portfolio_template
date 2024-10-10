document.addEventListener('DOMContentLoaded', () => {
    // Canvas setup
    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');

    // Set canvas size and update on window resize
    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Neural network configuration
    const numNodes = 100;
    const connectionDistance = 150;
    const nodes = createNodes(numNodes, canvas.width, canvas.height);

    // Animation loop
    function animate() {
        clearCanvas(ctx, canvas.width, canvas.height);
        drawStars(ctx, canvas.width, canvas.height);
        updateAndDrawNodes(ctx, nodes, canvas.width, canvas.height);
        drawConnections(ctx, nodes, connectionDistance);
        requestAnimationFrame(animate);
    }

    animate();
});

// Create initial nodes
function createNodes(numNodes, width, height) {
    return Array.from({ length: numNodes }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() * 2 - 1) * 0.5,
        vy: (Math.random() * 2 - 1) * 0.5
    }));
}

// Clear canvas with a semi-transparent background
function clearCanvas(ctx, width, height) {
    ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
    ctx.fillRect(0, 0, width, height);
}

// Draw background stars
function drawStars(ctx, width, height) {
    for (let i = 0; i < 200; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
        ctx.beginPath();
        ctx.arc(
            Math.random() * width,
            Math.random() * height,
            Math.random() * 1.5,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

// Update node positions and draw them
function updateAndDrawNodes(ctx, nodes, width, height) {
    nodes.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
        ctx.fill();
    });
}

// Draw connections between nearby nodes
function drawConnections(ctx, nodes, connectionDistance) {
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)';
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
}
