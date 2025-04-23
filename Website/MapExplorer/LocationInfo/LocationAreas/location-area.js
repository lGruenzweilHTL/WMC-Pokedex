document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('name');
    const parent = urlParams.get('parent'); // Optional

    await getLocationAreaData(location, parent);
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
    info.innerHTML = `Location area in <a href="../Locations/location.html?name=${data.location.name}">${locationName}</a>`;
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
        link.href = `../../../PokemonSubpage/pokemon.html?pokemon=${getIdFromUrl(encounter.pokemon.url)}`;
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

    document.body.innerHTML = '';
    document.body.appendChild(div);
}