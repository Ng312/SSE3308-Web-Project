document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'trail';

    const offsetX = (Math.random() - 0.5) * 10;
    const offsetY = (Math.random() - 0.5) * 10;

    trail.style.top = `${e.clientY + offsetY}px`;
    trail.style.left = `${e.clientX + offsetX}px`;

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 1000);
});
