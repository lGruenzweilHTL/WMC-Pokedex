document.addEventListener('keydown', function (event) {
    const focusableElements = document.querySelectorAll('.focusable');
    let currentIndex = Array.prototype.indexOf.call(focusableElements, document.activeElement);

    switch (event.key) {
        case 'ArrowUp':
            if (currentIndex > 1) {
                focusableElements[currentIndex - 2].focus();
            }
            break;
        case 'ArrowDown':
            if (currentIndex < focusableElements.length - 2) {
                focusableElements[currentIndex + 2].focus();
            }
            break;
        case 'ArrowLeft':
            if (currentIndex > 0) {
                focusableElements[currentIndex - 1].focus();
            }
            break;
        case 'ArrowRight':
            if (currentIndex < focusableElements.length - 1) {
                focusableElements[currentIndex + 1].focus();
            }
            break;
        case 'Enter':
            if (currentIndex !== -1) {
                focusableElements[currentIndex].click();
            }
            break;
        default:
            // Focus on the first element
            focusableElements[0].focus();
            break;
    }
});