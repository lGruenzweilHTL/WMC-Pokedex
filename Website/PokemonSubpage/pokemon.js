document.addEventListener("DOMContentLoaded", async function() {
    // Get url params
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("pokemon");

    // Get the pokemon data
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    console.log(data);

    // Create the pokemon element
    const name = findEnglishName(data);
    document.title = name;

    const titleElement = document.createElement("h1");
    titleElement.innerHTML = name;
    document.body.appendChild(titleElement);

    const imageElement = document.createElement("img");
    imageElement.src = data.sprites.front_default;
    imageElement.alt = name;
    imageElement.classList.add("float-left");
    document.body.appendChild(imageElement);

    const descriptions = await (await fetch("descriptions.json")).json();
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("description");
    const description = descriptions[parseInt(data.id) - 1];
    descriptionElement.innerHTML = description === undefined ? "No description found." : description;
    document.body.appendChild(descriptionElement);

    const typeElement = document.createElement("p");
    typeElement.classList.add("clearfix");
    typeElement.innerHTML = `Type: ${data.types.map(type => getTypeLink(type.type.name)).join(", ")}`;
    document.body.appendChild(typeElement);

    const specialKinds = await (await fetch("special-kinds.json")).json();
    const kindElement = document.createElement("p");
    kindElement.classList.add("clearfix");
    kindElement.classList.add("kind");
    const kind = specialKinds.find(p => p.pokemon === id);
    const kindText = kind ? kind.kind : "general";
    kindElement.innerHTML = `Kind: ${getKindLink(kindText)}`;
    document.body.appendChild(kindElement);

    buildWeaknessTable(data.types.map(type => type.type.name));

    const brElement = document.createElement("br");
    document.body.appendChild(brElement);

    buildStatsChart(data.stats);
    await buildLocationMap(data.location_area_encounters);
});

function getTypeLink(type) {
    return `<a href="../types.html#${type}">${type}</a>`;
}
function getKindLink(kind) {
    const kindName = kind === "pseudo" ? "Pseudo-Legendary" : kind;
    return `<a href="../KindOfPokemonSubpage/kinds-of-pokemon.html#${kind}">${formatName(kindName)}</a>`;
}

function buildWeaknessTable(types) {
    const resistanceTable = document.createElement("table");
    resistanceTable.classList.add("resistance-table");
    resistanceTable.classList.add("clearfix");

    const resistanceTableHeader = document.createElement("thead");
    resistanceTableHeader.innerHTML = `
        <tr>
            <th colspan="6">Weaknesses</th>
        </tr>
        <tr>
            <th>0x</th>
            <th>1/4x</th>
            <th>1/2x</th>
            <th>1x</th>
            <th>2x</th>
            <th>4x</th>
        </tr>`;

    const resistanceTableBody = document.createElement("tbody");
    // Use the type-calculator.js to get the weaknesses of the pokemon
    const weaknesses = calculateTypeMultiplier(types);
    const row = document.createElement("tr");
    // Group types by multiplier
    const groups = {};
    for (const [type, multiplier] of Object.entries(weaknesses)) {
        if (!groups[multiplier]) {
            groups[multiplier] = [];
        }
        groups[multiplier].push(type);
    }
    // Create the table row
    for (const multiplier of [0, 0.25, 0.5, 1, 2, 4]) {
        const cell = document.createElement("td");
        cell.innerHTML = groups[multiplier] ? groups[multiplier].map(type => getTypeLink(type)).join(", ") : "";
        row.appendChild(cell);
    }

    resistanceTableBody.appendChild(row);
    resistanceTable.appendChild(resistanceTableHeader);
    resistanceTable.appendChild(resistanceTableBody);
    document.body.appendChild(resistanceTable);
}

function buildStatsChart(stats) {
    const statsDiv = document.createElement("div");
    statsDiv.classList.add("stats");

    const header = document.createElement("h2");
    header.innerHTML = "Base Stats";
    statsDiv.appendChild(header);

    const chart = document.createElement("div");
    chart.classList.add("bar-chart");
    for (const stat of stats) {
        const container = document.createElement("div");
        container.classList.add("bar-container");

        const label = document.createElement("div");
        label.classList.add("bar-label");
        label.innerHTML = formatName(stat.stat.name);

        const barElement = document.createElement("div");
        barElement.classList.add("bar");
        barElement.style.width = `${stat.base_stat * 2}px`;
        barElement.innerHTML = stat.base_stat;

        container.appendChild(label);
        container.appendChild(barElement);
        chart.appendChild(container);
    }
    statsDiv.appendChild(chart);
    document.body.appendChild(statsDiv);
}

async function buildLocationMap(encounter_url) {
    // Get encounter data
    const response = await fetch(encounter_url);
    const data = await response.json();
    console.log(data);

    const div = document.createElement("div");
    div.classList.add("locations");

    div.appendChild(document.createElement("h2")).innerHTML = "Locations";

    const list = document.createElement("ul");
    list.classList.add("location-list");
    for (const location of data) {
        const item = document.createElement("li");
        item.innerHTML = `<a class="location-link"
            href="../MapExplorer/location-info.html?type=location-area&name=${location.location_area.name}">
            ${location.location_area.name}</a>`;
        list.appendChild(item);
    }
    div.appendChild(list);
    document.body.appendChild(div);
}

function findEnglishName(data) {
    return data.names.find(name => name.language.name === "en").name;
}
function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}