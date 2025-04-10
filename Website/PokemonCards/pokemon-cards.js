window.addEventListener("load", () => {
    const cardPositions = [];
    const holoCards = [0, 1, 2, 3, 10, 11, 12, 13, 14, 15]
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
                console.log(hoveredIndex);
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

    function calculateRotation(mouseX, mouseY, hoveredIndex) {
        let curCardIsHolo = false;
        holoCards.forEach(holoCard => {
            if(holoCard === hoveredIndex)
            {
                curCardIsHolo = true;
            }
        });
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
        console.log(curCardIsHolo);
        if (curCardIsHolo) {
            const shine = card.querySelector(".holoOverlay");
            const shineX = ((mouseX - cardData.cardXStart) / cardData.cardWidth) * 100;
            const shineY = ((mouseY - cardData.cardYStart) / cardData.cardHeight) * 100;
            
            shine.style.background = `
                radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.35), transparent 80%),
                repeating-conic-gradient(from 0deg,
                    rgba(255, 255, 255, 0.1) 0deg 10deg,
                    rgba(255, 255, 255, 0.2) 10deg 20deg
                )
            `;
        }
        
    }
    cards.forEach((card, index) => {
        if (holoCards.includes(index)) {
            const shine = document.createElement("div");
            shine.classList.add("holoOverlay");
            
            
        }
    });
    
});

