async function getRegionData(region) {
    const response = await fetch(`https://pokeapi.co/api/v2/region/${region}`);
    const data = await response.json();

    const div = document.createElement('div');
    div.classList.add('alert', 'alert-info');
    div.innerText = JSON.stringify(data, null, 2);
    document.body.appendChild(div);
}

function getIdFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
}

async function fetchAreaEnglishName(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/location-area/${name}`);
    const data = await response.json();
    return findEnglishName(data);
}

function findEnglishName(data) {
    if (data.names.length === 0) {
        return data.name;
    }
    return data.names.find(name => name.language.name === 'en').name;
}

function formatVersionName(name) {
    const specialNames = {
        'firered': 'FireRed',
        'leafgreen': 'LeafGreen',
        'heartgold': 'HeartGold',
        'soulsilver': 'SoulSilver',
        'letsgo-pikachu': 'Let\'s Go, Pikachu!',
        'letsgo-eevee': 'Let\'s Go, Eevee!'
    }
    if (specialNames[name]) {
        return specialNames[name];
    }
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}