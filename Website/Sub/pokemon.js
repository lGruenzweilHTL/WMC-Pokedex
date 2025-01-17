document.addEventListener("DOMContentLoaded", async function() {
    // Get url params
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get("pokemon");

    // Get the pokemon data
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();

    // Create the pokemon element
    document.title = formatName(pokemonName);

    document.createElement("h1").innerHTML = formatName(pokemonName);

    const imageElement = document.createElement("img");
    imageElement.src = data.sprites.front_default;
    imageElement.classList.add("float-left");

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("description");
    descriptionElement.innerHTML = "No description found"; // TODO

    const typeElement = document.createElement("p");
    typeElement.classList.add("clearfix");
    typeElement.innerHTML = `Type: ${data.types.map(type => getTypeLink(type)).join(", ")}`;

    const kindElement = document.createElement("p");
    kindElement.classList.add("clearfix");
    kindElement.classList.add("kind");
    kindElement.innerHTML = `Kind: ${formatName(data.species.name)}`; // TODO

    buildWeaknessTable(data.types);

    document.createElement("br");

    buildStatsChart(data.stats);
    buildLocationList();
});

function getTypeLink(type) {
    return `<a href="../types.html#${formatName(type)}">${type}</a>`;
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
}

function buildLocationList(encounters, fileDirectory, drawingPath, locationCache) {
    let locationString = '';

    if (encounters.length === 0 || Object.keys(locationCache).length === 0) return '<p>None</p>';

    // Group by region
    const groupedLocations = encounters
        .filter(area => area.versions.some(version => versionFilter.includes(version)))
        .map(area => {
            const region = Object.entries(locationCache).find(([key, value]) => value.some(name => area.name.startsWith(name))) || [null, null];
            const location = region[1]?.filter(name => area.name.startsWith(name)).reduce((a, b) => a.length > b.length ? a : b, '');
            return { region: region[0], encounter: area.name, location };
        })
        .reduce((acc, { region, encounter, location }) => {
            if (!acc[region]) acc[region] = [];
            acc[region].push({ encounter, location });
            return acc;
        }, {});

    if (Object.keys(groupedLocations).length === 0) return '<p>None</p>';

    const relativePath = getRelativePath(fileDirectory, drawingPath);

    const backupLocations = [];
    for (const [region, locations] of Object.entries(groupedLocations)) {
        // Add region name
        let regionExists = false;
        if (region) {
            const regionPath = `${relativePath}/Regions/${region}.png`;
            regionExists = fileExists(`${drawingPath}/Regions/${region}.png`);
            if (regionExists) {
                locationString += `<div class="image-container"><img src="${regionPath}" alt="${region}"/>`;
            }
        }

        for (const { encounter, location } of locations) {
            // Try to find area drawing
            if (!regionExists) {
                backupLocations.push(encounter);
                continue;
            }

            const areaPath = `${drawingPath}/Areas/${encounter}.png`;
            const areaExists = fileExists(areaPath);
            if (areaExists) {
                const path = `${relativePath}/Areas/${encounter}.png`;
                locationString += `<img src="${path}" alt="${encounter}"/>`;
                continue;
            }

            // Fallback: Try to find location drawing
            const locationPath = `./Images/Locations/${location}.png`;
            const locationExists = fileExists(locationPath);
            if (locationExists) {
                const path = `${relativePath}/Locations/${location}.png`;
                locationString += `<img src="${path}" alt="${location}"/>`;
                continue;
            }

            // Fallback: Add to list (<ul class="location-list">)
            backupLocations.push(encounter);
        }

        if (regionExists) locationString += '</div>';
    }

    locationString += '<ul class="location-list">';
    for (const backupLocation of backupLocations) {
        locationString += `<li>${backupLocation}</li>`;
    }
    locationString += '</ul>';

    return locationString;
}

function fileExists(path) {
    // Implement this function to check if a file exists at the given path
    // This is a placeholder implementation
    return true;
}

function getRelativePath(fileDirectory, drawingPath) {
    // Implement this function to get the relative path
    // This is a placeholder implementation
    return './relative/path';
}