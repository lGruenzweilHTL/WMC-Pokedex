document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('container');
    const numCategories = 30;

    const response = await fetch('https://pokeapi.co/api/v2/item-category?limit=' + numCategories);
    const data = await response.json();

    for (const cat of data.results) {
        const catResponse = await fetch(cat.url);
        const catData = await catResponse.json();

        const categoryElement = document.createElement('h1');
        categoryElement.innerHTML = getEnglishName(catData);
        container.appendChild(categoryElement);
        container.appendChild(document.createElement('br'));

        for (const item of catData.items) {
            const itemResponse = await fetch(item.url);
            const itemData = await itemResponse.json();

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

            container.appendChild(itemElement);
    }
}
});

function getEnglishName(categoryData) {
    return categoryData.names.find(name => name.language.name === 'en').name;
}

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

async function getDescriptions(data) {
    const entry = data.effect_entries.find(entry => entry.language.name === 'en');

    // If no english entry is found, return a default message
    if (!entry) {
        return 'No description available';
    }

    const description = entry.effect;
    return description.length > 200 ? entry.short_effect : description;
}