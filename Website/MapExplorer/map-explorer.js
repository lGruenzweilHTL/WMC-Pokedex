document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const region = urlParams.get('region');

    document.title = `Explore ${region}`;

    // TEMP
    if (region !== 'kanto') {
        const h = document.createElement('h1')
        h.innerText = "Region not found";
        document.body.appendChild(h);
        return;
    }

    const image = document.createElement('img');
    image.src = `../Images/Locations/Regions/${region.toLowerCase()}.png`;
    image.useMap = '#image-map';
    image.alt = "Map of " + region;
    document.body.appendChild(image);

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
    kantoData.routes.forEach(route => {
        const area = document.createElement('area');
        area.shape = 'rect';
        area.coords = route.coords.join(',');
        area.href = `location-info.html?type=location&name=${route.url}`;
        area.alt = route.name;
        area.setAttribute("data-info", route.name);
        map.appendChild(area);
    });

    document.body.appendChild(map);
});

const kantoData = {
    routes: [
        {
            name: "Route 1",
            url: "kanto-route-1",
            coords: [166, 488, 220, 600]
        },
        {
            name: "Route 2",
            url: "kanto-route-2",
            coords: [166, 430, 218, 216]
        },
        {
            name: "Route 3",
            url: "kanto-route-3",
            coords: [220, 216, 380, 162]
        },
        {
            name: "Route 3",
            url: "kanto-route-3",
            coords: [328, 160, 393, 108]
        },
        {
            name: "Route 4",
            url: "kanto-route-4",
            coords: [425, 160, 598, 108]
        },
        {
            name: "Route 5",
            url: "kanto-route-5",
            coords: [600, 162, 650, 268]
        },
        {
            name: "Route 6",
            url: "kanto-route-6",
            coords: [600, 324, 650, 486]
        },
        {
            name: "Route 7",
            url: "kanto-route-7",
            coords: [490, 324, 598, 270]
        },
        {
            name: "Route 8",
            url: "kanto-route-8",
            coords: [653, 323, 814, 271]
        },
        {
            name: "Route 9",
            url: "kanto-route-9",
            coords: [653, 162, 870, 110]
        },
        {
            name: "Route 10",
            url: "kanto-route-10",
            coords: [815, 200, 870, 270]
        },
        {
            name: "Route 11",
            url: "kanto-route-11",
            coords: [653, 540, 813, 487]
        },
        {
            name: "Route 12",
            url: "kanto-route-12",
            coords: [814, 325, 867, 595]
        },
        {
            name: "Route 13",
            url: "kanto-route-13",
            coords: [653, 595, 867, 650]
        },
        {
            name: "Route 14",
            url: "kanto-route-14",
            coords: [705, 650, 650, 702]
        },
        {
            name: "Route 15",
            url: "kanto-route-15",
            coords: [545, 755, 706, 702]
        },
        {
            name: "Route 16",
            url: "kanto-route-16",
            coords: [273, 273, 434, 324]
        },
        {
            name: "Route 17",
            url: "kanto-route-17",
            coords: [273, 323, 325, 712]
        },
        {
            name: "Route 18",
            url: "kanto-route-18",
            coords: [490, 756, 274, 704]
        },
        {
            name: "Route 19",
            url: "kanto-route-19",
            coords: [490, 757, 542, 811]
        },
        {
            name: "Route 20",
            url: "kanto-route-20",
            coords: [220, 812, 545, 853]
        },
        {
            name: "Route 21",
            url: "kanto-route-21",
            coords: [166, 650, 218, 811]
        },
        {
            name: "Route 22",
            url: "kanto-route-22",
            coords: [58, 483, 165, 432]
        },
        {
            name: "Route 23",
            url: "kanto-route-23",
            coords: [110, 430, 58, 165]
        },
        {
            name: "Route 24",
            url: "kanto-route-24",
            coords: [598, 107, 652, 55]
        },
        {
            name: "Route 25",
            url: "kanto-route-25",
            coords: [598, 0, 760, 53]
        }
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
            name: "Vermilion City",
            url: "vermilion-city",
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
            name: "Fuchsia City",
            url: "fuchsia-city",
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