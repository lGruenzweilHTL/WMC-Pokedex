document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const locationType = urlParams.get('type'); // location-area, location or region
    const location = urlParams.get('name');
    const parent = urlParams.get('parent'); // Optional

    switch (locationType) {
        case 'location-area':
            await getLocationAreaData(location, parent);
            break;
        case 'location':
            await getLocationData(location, parent);
            break;
        case 'region':
            await getRegionData(location);
            break;
    }
});

async function getLocationAreaData(area, location) {
    const response = await fetch(`https://pokeapi.co/api/v2/location-area/${area}`);
    const data = await response.json();

    const div = document.createElement('div');
    div.classList.add('card', 'mt-4');

    const name = findEnglishName(data);
    const locationName = location ? location : data.location.name;
    document.title = name;

    const header = document.createElement('h1');
    header.classList.add('card-header');
    header.innerText = name + " (Area)";
    div.appendChild(header);

    const body = document.createElement('div');
    body.classList.add('card-body');

    const info = document.createElement('p');
    info.classList.add('card-text');
    info.innerHTML = `Location area in <a href="location-info.html?type=location&name=${data.location.name}">${locationName}</a>`;
    body.appendChild(info);

    const encounterHeader = document.createElement('h2');
    encounterHeader.innerText = "Encounters";
    body.appendChild(encounterHeader);

    const encounters = document.createElement('ul');
    encounters.classList.add('list-group', 'list-group-flush');
    for (const encounter of data.pokemon_encounters) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');

        const card = document.createElement('div');
        card.classList.add('mb-2', 'container', 'flex-row', 'd-flex');

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('card', 'card-body', 'col-md-4', 'col-sm-12');
        const link = document.createElement('a');
        link.href = `../PokemonSubpage/pokemon.html?pokemon=${getIdFromUrl(encounter.pokemon.url)}`;
        link.innerText = encounter.pokemon.name;
        link.classList.add('card-title', 'btn', 'btn-primary');
        pokemonCard.appendChild(link);

        const image = document.createElement('img');
        const pokemonId = encounter.pokemon.url.split('/')[6];
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        image.alt = encounter.pokemon.name;
        pokemonCard.appendChild(image);
        card.appendChild(pokemonCard);

        const encounterCard = document.createElement('div');
        encounterCard.classList.add('card', 'card-body', 'col-md-8', 'col-sm-12');

        for (const version of encounter.version_details) {
            const versionName = formatVersionName(version.version.name);
            const versionHeader = document.createElement('a');
            versionHeader.innerText = versionName;
            versionHeader.classList.add('mb-2', 'btn', 'btn-link');
            versionHeader.setAttribute('data-toggle', 'collapse');
            versionHeader.href = `#collapse-${version.version.name}-${pokemonId}`;
            encounterCard.appendChild(versionHeader);

            for (const encounterDetail of version.encounter_details) {
                const encounterText = document.createElement('p');
                encounterText.classList.add('collapse', 'mb-0');
                encounterText.id = `collapse-${version.version.name}-${pokemonId}`;

                const levelString = encounterDetail.min_level === encounterDetail.max_level ? "Level: " + encounterDetail.min_level : `Levels: ${encounterDetail.min_level}-${encounterDetail.max_level}`;
                const conditionString = encounterDetail.condition_values.length > 0 ? `, Conditions: ${encounterDetail.condition_values.map(condition => condition.name).join(', ')}` : '';
                encounterText.innerText = `Method: ${encounterDetail.method.name}, Chance: ${encounterDetail.chance}%, ${levelString}${conditionString}`;
                encounterCard.appendChild(encounterText);
            }
        }
        card.appendChild(encounterCard);
        li.appendChild(card);

        encounters.appendChild(li);
    }
    body.appendChild(encounters);

    div.appendChild(body);
    document.body.appendChild(div);
}

async function getLocationData(location, region) {
    const response = await fetch(`https://pokeapi.co/api/v2/location/${location}`);
    const data = await response.json();

    const div = document.createElement('div');
    div.classList.add('card', 'mt-4');

    const name = findEnglishName(data);
    const regionName = region ? region : data.region.name;
    document.title = name;

    const header = document.createElement('h1');
    header.classList.add('card-header');
    header.innerText = name;
    div.appendChild(header);

    const body = document.createElement('div');
    body.classList.add('card-body');

    const info = document.createElement('p');
    info.classList.add('card-text');
    info.innerHTML = `Location in <a href="map-explorer.html?region=${data.region.name}">${regionName}</a>`;
    body.appendChild(info);

    const areaHeader = document.createElement('h2');
    areaHeader.innerText = "Areas";
    body.appendChild(areaHeader);

    const areas = document.createElement('ul');
    areas.classList.add('list-group', 'list-group-flush');
    for (const area of data.areas) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        const areaName = await fetchAreaEnglishName(area.name);
        li.innerHTML = `<a href="location-info.html?type=location-area&name=${area.name}&parent=${name}">${areaName}</a>`;
        areas.appendChild(li);
    }
    body.appendChild(areas);

    div.appendChild(body);
    document.body.appendChild(div);
}

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