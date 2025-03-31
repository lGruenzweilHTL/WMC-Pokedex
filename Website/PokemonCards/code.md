Commit 1:

Commit 2:




Commit 3:



Commit: 4
        function calculateRotation(mouseX, mouseY, hoveredIndex) {
        const card = cards[hoveredIndex];
        const cardData = cardPositions[hoveredIndex];

        // Get the center of the card
        const centerX = cardData.cardXStart + cardData.cardWidth / 2;
        const centerY = cardData.cardYStart + cardData.cardHeight / 2;

        // Calculate mouse position relative to the center
        const offsetX = mouseX - centerX;
        const offsetY = mouseY - centerY;

        // Normalize to a range of -1 to 1
        const percentX = offsetX / (cardData.cardWidth / 2);
        const percentY = offsetY / (cardData.cardHeight / 2);

        // Map to rotation range (-15deg to 15deg)
        const rotateY = Math.max(-25, Math.min(25, percentX * 25));
        const rotateX = Math.max(-25, Math.min(25, -percentY * 25)); // Negative for natural movement

        // Apply transformation
        card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }










transition: transform 0.2s ease-out;
        transform-style: preserve-3d;
        will-change: transform;


