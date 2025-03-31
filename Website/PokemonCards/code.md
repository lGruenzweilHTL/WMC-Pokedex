Commit 1:

Commit 2:

cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        
        cardPositions.push({
            cardIndex: index,
            cardXStart: rect.left + window.scrollX,  
            cardYStart: rect.top + window.scrollY,   
            cardXEnd: rect.right + window.scrollX,   
            cardYEnd: rect.bottom + window.scrollY,  
            cardWidth: rect.width,  
            cardHeight: rect.height 
        });

        // Add event listeners
        card.addEventListener("mousemove", (event) => {
            const mouseX = event.clientX + window.scrollX;
            const mouseY = event.clientY + window.scrollY;

            let hoveredIndex = checkIndexOfCard(mouseX, mouseY);
            if (hoveredIndex !== null) {
                calculateRotation(mouseX, mouseY, hoveredIndex);
            }
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        });
    });


Commit 3:
function checkIndexOfCard(mouseX, mouseY) {
        for (let i = 0; i < cardPositions.length; i++) {
            let card = cardPositions[i];
            if (
                mouseX >= card.cardXStart &&
                mouseX <= card.cardXEnd &&
                mouseY >= card.cardYStart &&
                mouseY <= card.cardYEnd
            ) {
                return card.cardIndex;
            }
        }
        return null;
    }


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


