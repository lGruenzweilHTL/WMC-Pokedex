document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('container');
    const numItems = 274; // Stop right before the plates

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/item?limit=${numItems}`);
        const data = await response.json();

        const categories = {};

        for (const item of data.results) {
            const itemData = await (await fetch(item.url)).json();
            const category = itemData.category.name;

            if (!categories[category]) {
                categories[category] = [];
            }

            const description = await getDescriptions(itemData);
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png" alt="${item.name}">
                </div>
                <div class="item-description">
                    <h2>${formatName(item.name)}</h2>
                    <p>${description}</p>
                </div>`;
            categories[category].push(itemElement);
        }

        for (const [category, items] of Object.entries(categories)) {
            const categoryElement = document.createElement('h1');
            categoryElement.innerHTML = formatName(category);
            container.appendChild(categoryElement);
            container.appendChild(document.createElement('br'));

            items.forEach(itemElement => {
                container.appendChild(itemElement);
            });
        }
    } catch (error) {
        console.error('Error fetching items:', error);
    }
});

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

async function getDescriptions(data) {
    const length = data.effect_entries[0].effect.length;
    return length > 200 ? data.effect_entries[0].short_effect : data.effect_entries[0].effect;
}