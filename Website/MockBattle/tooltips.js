const tooltipElement = document.getElementById('tooltip');
const titleElement = tooltipElement.children[0];
const contentElement = tooltipElement.children[1];

function showTooltip(title, content) {
    tooltipElement.style.display = 'block';
    titleElement.innerText = title;
    contentElement.innerText = content;
}

function hideTooltip() {
    tooltipElement.style.display = 'none';
}