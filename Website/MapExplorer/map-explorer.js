document.addEventListener("DOMContentLoaded", async function () {
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

    const image = document.getElementById("region-image");
    image.src = `../Images/Locations/Regions/${region.toLowerCase()}.png`;
    image.alt = "Map of " + region;

    const map = document.createElement('map');
    map.name = 'image-map';

    kantoData.cities.forEach(city => {
        const area = document.createElement('area');
        area.shape = 'rect';
        area.coords = city.coords.join(',');
        area.href = `location-info.html?type=location&name=${city.url}`;
        area.alt = city.name;
        area.setAttribute("data-name", city.name);
        area.setAttribute("data-preview", city.image);
        area.setAttribute("data-description", "This is a city");
        map.appendChild(area);
    });
    kantoData.routes.forEach(route => {
        const area = document.createElement('area');
        area.shape = 'rect';
        area.coords = route.coords.join(',');
        area.href = `location-info.html?type=location&name=${route.url}`;
        area.alt = route.name;
        area.setAttribute("data-name", route.name);
        area.setAttribute("data-preview", route.image);
        area.setAttribute("data-description", "This is a route");
        map.appendChild(area);
    });

    document.body.appendChild(map);
});

const kantoData = {
    routes: [
        {
            name: "Route 1",
            url: "kanto-route-1",
            coords: [166, 488, 220, 600],
            image: "../Images/Locations/Kanto/Routes/1.jpeg"
        },
        {
            name: "Route 2",
            url: "kanto-route-2",
            coords: [166, 430, 218, 216],
            image: "../Images/Locations/Kanto/Routes/2.jpeg"
        },
        {
            name: "Route 3",
            url: "kanto-route-3",
            coords: [220, 216, 380, 162],
            image: "../Images/Locations/Kanto/Routes/3.jpeg"
        },
        {
            name: "Route 3",
            url: "kanto-route-3",
            coords: [328, 160, 393, 108],
            image: "../Images/Locations/Kanto/Routes/3.jpeg"
        },
        {
            name: "Route 4",
            url: "kanto-route-4",
            coords: [425, 160, 598, 108],
            image: "../Images/Locations/Kanto/Routes/4.jpeg"
        },
        {
            name: "Route 5",
            url: "kanto-route-5",
            coords: [600, 162, 650, 268],
            image: "../Images/Locations/Kanto/Routes/5.jpeg"
        },
        {
            name: "Route 6",
            url: "kanto-route-6",
            coords: [600, 324, 650, 486],
            image: "../Images/Locations/Kanto/Routes/6.jpeg"
        },
        {
            name: "Route 7",
            url: "kanto-route-7",
            coords: [490, 324, 598, 270],
            image: "../Images/Locations/Kanto/Routes/7.jpeg"
        },
        {
            name: "Route 8",
            url: "kanto-route-8",
            coords: [653, 323, 814, 271],
            image: "../Images/Locations/Kanto/Routes/8.jpeg"
        },
        {
            name: "Route 9",
            url: "kanto-route-9",
            coords: [653, 162, 870, 110],
            image: "../Images/Locations/Kanto/Routes/9.jpeg"
        },
        {
            name: "Route 10",
            url: "kanto-route-10",
            coords: [815, 200, 870, 270],
            image: "../Images/Locations/Kanto/Routes/10.jpeg"
        },
        {
            name: "Route 11",
            url: "kanto-route-11",
            coords: [653, 540, 813, 487],
            image: "../Images/Locations/Kanto/Routes/11.jpeg"
        },
        {
            name: "Route 12",
            url: "kanto-route-12",
            coords: [814, 325, 867, 595],
            image: "../Images/Locations/Kanto/Routes/12.jpeg"
        },
        {
            name: "Route 13",
            url: "kanto-route-13",
            coords: [653, 595, 867, 650],
            image: "../Images/Locations/Kanto/Routes/13.jpeg"
        },
        {
            name: "Route 14",
            url: "kanto-route-14",
            coords: [705, 650, 650, 702],
            image: "../Images/Locations/Kanto/Routes/14.jpeg"
        },
        {
            name: "Route 15",
            url: "kanto-route-15",
            coords: [545, 755, 706, 702],
            image: "../Images/Locations/Kanto/Routes/15.jpeg"
        },
        {
            name: "Route 16",
            url: "kanto-route-16",
            coords: [273, 273, 434, 324],
            image: "../Images/Locations/Kanto/Routes/16.jpeg"
        },
        {
            name: "Route 17",
            url: "kanto-route-17",
            coords: [273, 323, 325, 712],
            image: "../Images/Locations/Kanto/Routes/17.jpeg"
        },
        {
            name: "Route 18",
            url: "kanto-route-18",
            coords: [490, 756, 274, 704],
            image: "../Images/Locations/Kanto/Routes/18.jpeg"
        },
        {
            name: "Route 19",
            url: "kanto-route-19",
            coords: [490, 757, 542, 811],
            image: "../Images/Locations/Kanto/Routes/19.jpeg"
        },
        {
            name: "Route 20",
            url: "kanto-route-20",
            coords: [220, 812, 545, 853],
            image: "../Images/Locations/Kanto/Routes/20.jpeg"
        },
        {
            name: "Route 21",
            url: "kanto-route-21",
            coords: [166, 650, 218, 811],
            image: "../Images/Locations/Kanto/Routes/21.jpeg"
        },
        {
            name: "Route 22",
            url: "kanto-route-22",
            coords: [58, 483, 165, 432],
            image: "../Images/Locations/Kanto/Routes/22.jpeg"
        },
        {
            name: "Route 23",
            url: "kanto-route-23",
            coords: [110, 430, 58, 165],
            image: "../Images/Locations/Kanto/Routes/23.jpeg"
        },
        {
            name: "Route 24",
            url: "kanto-route-24",
            coords: [598, 107, 652, 55],
            image: "../Images/Locations/Kanto/Routes/24.jpeg"
        },
        {
            name: "Route 25",
            url: "kanto-route-25",
            coords: [598, 0, 760, 53],
            image: "../Images/Locations/Kanto/Routes/25.jpeg"
        }
    ],
    cities: [
        {
            name: "Indigo Plateau",
            url: "indigo-plateau",
            coords: [57, 108, 110, 162],
            image: "../Images/Locations/Kanto/indigo.jpeg"
        },
        {
            name: "Pewter City",
            url: "pewter-city",
            coords: [165, 165, 220, 220],
            image: "../Images/Locations/Kanto/pewter.jpeg"
        },
        {
            name: "Viridian City",
            url: "viridian-city",
            coords: [166, 433, 220, 487],
            image: "../Images/Locations/Kanto/viridian.jpeg"
        },
        {
            name: "Pallet Town",
            url: "pallet-town",
            coords: [166, 600, 220, 650],
            image: "../Images/Locations/Kanto/pallet.jpeg"
        },
        {
            name: "Cinnabar Island",
            url: "cinnabar-island",
            coords: [166, 813, 220, 863],
            image: "../Images/Locations/Kanto/cinnabar.jpeg"
        },
        {
            name: "Cerulean City",
            url: "cerulean-city",
            coords: [595, 110, 650, 163],
            image: "../Images/Locations/Kanto/cerulean.jpeg"
        },
        {
            name: "Saffron City",
            url: "saffron-city",
            coords: [595, 270, 650, 324],
            image: "../Images/Locations/Kanto/saffron.jpeg"
        },
        {
            name: "Vermilion City",
            url: "vermilion-city",
            coords: [595, 488, 650, 540],
            image: "../Images/Locations/Kanto/vermilion.jpeg"
        },
        {
            name: "Lavender Town",
            url: "lavender-town",
            coords: [815, 270, 870, 324],
            image: "../Images/Locations/Kanto/lavender.jpeg"
        },
        {
            name: "Celadon City",
            url: "celadon-city",
            coords: [437, 270, 490, 324],
            image: "../Images/Locations/Kanto/celadon.jpeg"
        },
        {
            name: "Fuchsia City",
            url: "fuchsia-city",
            coords: [490, 705, 543, 757],
            image: "../Images/Locations/Kanto/fuchsia.jpeg"
        },
        {
            name: "Victory Road",
            url: "kanto-victory-road-1",
            coords: [71, 230, 97, 256],
            image: "../Images/Locations/Kanto/victory-road.jpeg"
        },
        {
            name: "Viridian Forest",
            url: "viridian-forest",
            coords: [180, 230, 204, 255],
            image: "../Images/Locations/Kanto/viridian-forest.jpeg"
        },
        {
            name: "Mt. Moon",
            url: "mt-moon",
            coords: [395, 123, 420, 150],
            image: "../Images/Locations/Kanto/mt-moon.jpeg"
        },
        {
            name: "Rock Tunnel",
            url: "rock-tunnel",
            coords: [830, 175, 853, 201],
            image: "../Images/Locations/Kanto/rock-tunnel.jpeg"
        },
        {
            name: "Seafoam Islands",
            url: "seafoam-islands",
            coords: [342, 827, 367, 850],
            image: "../Images/Locations/Kanto/seafoam.png"
        }
    ]
}