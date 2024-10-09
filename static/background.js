document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Configuración de la red neuronal
    const nodes = [];
    const numNodes = 100;
    const connectionDistance = 150;

    // Crear nodos
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() * 2 - 1) * 0.5, // Reducido a la mitad
            vy: (Math.random() * 2 - 1) * 0.5  // Reducido a la mitad
        });
    }

    // Función para dibujar estrellas de fondo
    function drawStars() {
        for (let i = 0; i < 200; i++) {
            ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.random() + ')';
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawStars();

        // Actualizar y dibujar nodos
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Rebote en los bordes
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
            ctx.fill();
        });

        // Dibujar conexiones
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)';
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let dx = nodes[i].x - nodes[j].x;
                let dy = nodes[i].y - nodes[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
});