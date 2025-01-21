document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const region = urlParams.get('region');

    document.title = `Explore ${region}`;

    const image = document.createElement('img');
    image.src = `../Images/Locations/Regions/${region.toLowerCase()}.png`;
    document.body.appendChild(image);

    if (region !== 'kanto') {
        return;
    }

    const map = document.createElement('map');
    map.name = 'image-map';

    kantoData.cities.forEach(city => {
        const area = document.createElement('area');
        area.shape = 'rect';
        area.coords = city.coords.join(',');
        area.href = `location-info.html?type=location&name=${city.url}`;
        area.alt = city.name;
        area.setAttribute("data-info", city.name);
        map.appendChild(area);
    });

    document.body.appendChild(map);
});

const kantoData = {
    routes: [

    ],
    cities: [
        {
            name: "Indigo Plateau",
            url: "indigo-plateau",
            coords: [57, 108, 110, 162]
        },
        {
            name: "Pewter City",
            url: "pewter-city",
            coords: [165, 165, 220, 220]
        },
        {
            name: "Viridian City",
            url: "viridian-city",
            coords: [166, 433, 220, 487]
        },
        {
            name: "Pallet Town",
            url: "pallet-town",
            coords: [166, 600, 220, 650]
        },
        {
            name: "Cinnabar Island",
            url: "cinnabar-island",
            coords: [166, 813, 220, 863]
        },
        {
            name: "Cerulean City",
            url: "cerulean-city",
            coords: [595, 110, 650, 163]
        },
        {
            name: "Saffron City",
            url: "saffron-city",
            coords: [595, 270, 650, 324]
        },
        {
            name: "Vermillion City",
            url: "vermillion-city",
            coords: [595, 488, 650, 540]
        },
        {
            name: "Lavender Town",
            url: "lavender-town",
            coords: [815, 270, 870, 324]
        },
        {
            name: "Celadon City",
            url: "celadon-city",
            coords: [437, 270, 490, 324]
        },
        {
            name: "Fuschia City",
            url: "fuschia-city",
            coords: [490, 705, 543, 757]
        },
        {
            name: "Victory Road",
            url: "victory-road",
            coords: [71, 230, 97, 256]
        },
        {
            name: "Viridian Forest",
            url: "viridian-forest",
            coords: [180, 230, 204, 255]
        },
        {
            name: "Mt. Moon",
            url: "mt-moon",
            coords: [395, 123, 420, 150]
        },
        {
            name: "Rock Tunnel",
            url: "rock-tunnel",
            coords: [830, 175, 853, 201]
        },
        {
            name: "Seafoam Islands",
            url: "seafoam-islands",
            coords: [342, 827, 367, 850]
        }
    ]
}