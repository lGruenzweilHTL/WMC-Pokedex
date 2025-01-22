document.addEventListener("DOMContentLoaded", async function() {
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
    info.innerText = "Location area in " + locationName;
    body.appendChild(info);

    const encounterHeader = document.createElement('h2');
    encounterHeader.innerText = "Encounters";
    body.appendChild(encounterHeader);

    const encounters = document.createElement('ul');
    encounters.classList.add('list-group', 'list-group-flush');
    for (const encounter of data.pokemon_encounters) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');

        const text = document.createElement('a');
        text.classList.add('btn', 'btn-primary');
        text.setAttribute('data-toggle', 'collapse');
        text.href = `#collapse-${encounter.pokemon.name}`;
        text.innerText = encounter.pokemon.name;
        li.appendChild(text);

        const collapse = document.createElement('div');
        collapse.classList.add('collapse', 'mt-3');
        collapse.id = `collapse-${encounter.pokemon.name}`;
        const card = document.createElement('div');
        card.classList.add('card', 'card-body');

        for (const version of encounter.version_details) {
            const versionName = await fetchVersionEnglishName(version.version.name);
            const versionHeader = document.createElement('h4');
            versionHeader.innerText = versionName;
            card.appendChild(versionHeader);

            for (const encounterDetail of version.encounter_details) {
                const encounterText = document.createElement('p');
                encounterText.innerText = `Method: ${encounterDetail.method.name}, Chance: ${encounterDetail.chance}%`;
                card.appendChild(encounterText);
            }
        }
        collapse.appendChild(card);
        li.appendChild(collapse);

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
    info.innerText = "Location in " + regionName;
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

async function fetchAreaEnglishName(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/location-area/${name}`);
    const data = await response.json();
    return findEnglishName(data);
}
async function fetchVersionEnglishName(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/version/${name}`);
    const data = await response.json();
    return findEnglishName(data);
}

function findEnglishName(data) {
    return data.names.find(name => name.language.name === 'en').name;
}