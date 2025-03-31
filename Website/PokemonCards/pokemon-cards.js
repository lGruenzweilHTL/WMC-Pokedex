window.addEventListener("load", () => {
    const cardPositions = [];
    const cards = document.querySelectorAll(".card1");

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

    

    
});
