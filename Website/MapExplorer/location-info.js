document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const locationType = urlParams.get('type'); // location-area, location or region
    const location = urlParams.get('name');

    document.title = location;

    // Format location name to api name
    const apiName = nameToApiName(location);

    switch (locationType) {
        case 'location-area':
            await getLocationAreaData(apiName);
            break;
        case 'location':
            await getLocationData(apiName);
            break;
        case 'region':
            await getRegionData(apiName);
            break;
    }
});

async function getLocationAreaData(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/location-area/${name}`);
    const data = await response.json();

    const div = document.createElement('div');
    div.innerText = JSON.stringify(data);
    document.body.appendChild(div);
}
async function getLocationData(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/location/${name}`);
    const data = await response.json();

    const div = document.createElement('div');
    div.innerText = JSON.stringify(data);
    document.body.appendChild(div);
}
async function getRegionData(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/region/${name}`);
    const data = await response.json();

    const div = document.createElement('div');
    div.innerText = JSON.stringify(data);
    document.body.appendChild(div);
}

function nameToApiName(name) {
    return name.toLowerCase().replace(/\s/g, '-');
}