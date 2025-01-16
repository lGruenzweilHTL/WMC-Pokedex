document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('container');
    const numItems = 300;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/item?limit=${numItems}`);
        const data = await response.json();

        for (const item of data.results) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');

            const description = await getDescriptions(item);
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png" alt="${item.name}">
                </div>
                <div class="item-description">
                    <h2>${formatName(item.name)}</h2>
                    <p>${description}</p>
                </div>`;
            container.appendChild(itemElement);
        }
    } catch (error) {
        console.error('Error fetching items:', error);
    }
});

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

async function getDescriptions(item) {
    const response = await fetch(item.url);
    const data = await response.json();
    return data.effect_entries[0].effect;
}