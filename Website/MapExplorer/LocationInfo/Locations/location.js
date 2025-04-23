document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('name');
    const parent = urlParams.get('parent'); // Optional

    await getLocationData(location, parent);
});

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
    info.innerHTML = `Location in <a href="../../map-explorer.html?region=${data.region.name}">${regionName}</a>`;
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
        li.innerHTML = `<a href="../LocationAreas/location-area.html?name=${area.name}&parent=${name}">${areaName}</a>`;
        areas.appendChild(li);
    }
    body.appendChild(areas);

    div.appendChild(body);
    document.body.innerHTML = '';
    document.body.appendChild(div);
}