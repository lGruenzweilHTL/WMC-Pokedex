document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const region = urlParams.get('region');

    document.title = `Explore ${region}`;

    const validRegions = ["kanto", "johto"];

    if (!validRegions.includes(region)) {
        const h = document.createElement('h1');
        h.innerText = "Region not found";
        document.body.appendChild(h);
        return;
    }

    const image = document.getElementById("region-image");
    image.src = `../Images/Locations/Regions/${region.toLowerCase()}.png`;
    image.alt = "Map of " + region;

    const map = document.createElement('map');
    map.name = 'image-map';

    locations[region.toLowerCase()].forEach(city => {
        const area = document.createElement('area');
        area.shape = 'rect';
        area.coords = city.coords.join(',');
        area.href = `location-info.html?type=location&name=${city.url}`;
        area.alt = city.name;
        area.setAttribute("data-name", city.name);
        area.setAttribute("data-preview", city.image);
        area.setAttribute("data-old-img", city.old_image);
        area.setAttribute("data-description", city.description);
        map.appendChild(area);
    });

    document.body.appendChild(map);
});

/*
    {
        name: "",
        url: "",
        coords: [],
        image: "",
        old_image: "",
        description: ""
    },
 */

const locations = {


    "kanto": [
        {
            name: "Route 1",
            url: "kanto-route-1",
            coords: [186, 488, 240, 600],
            image: "../Images/Locations/Kanto/Routes/1.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/1.jpeg",
            description: "The first route connecting Pallet Town to Viridian City."
        },
        {
            name: "Route 2",
            url: "kanto-route-2",
            coords: [186, 430, 238, 216],
            image: "../Images/Locations/Kanto/Routes/2.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/2.jpeg",
            description: "A route that leads from Viridian City to Pewter City."
        },
        {
            name: "Route 3",
            url: "kanto-route-3",
            coords: [240, 216, 400, 162],
            image: "../Images/Locations/Kanto/Routes/3.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/3.jpeg",
            description: "A mountainous route leading to Mt. Moon."
        },
        {
            name: "Route 4",
            url: "kanto-route-4",
            coords: [445, 160, 618, 108],
            image: "../Images/Locations/Kanto/Routes/4.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/4.jpeg",
            description: "A route that connects Mt. Moon to Cerulean City."
        },
        {
            name: "Route 5",
            url: "kanto-route-5",
            coords: [620, 162, 670, 268],
            image: "../Images/Locations/Kanto/Routes/5.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/5.jpeg",
            description: "A route that connects Cerulean City to Saffron City."
        },
        {
            name: "Route 6",
            url: "kanto-route-6",
            coords: [620, 324, 670, 486],
            image: "../Images/Locations/Kanto/Routes/6.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/6.jpeg",
            description: "A route that connects Saffron City to Vermilion City."
        },
        {
            name: "Route 7",
            url: "kanto-route-7",
            coords: [510, 324, 618, 270],
            image: "../Images/Locations/Kanto/Routes/7.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/7.jpeg",
            description: "A short route connecting Celadon City to Saffron City."
        },
        {
            name: "Route 8",
            url: "kanto-route-8",
            coords: [673, 323, 834, 271],
            image: "../Images/Locations/Kanto/Routes/8.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/8.jpeg",
            description: "A route that connects Saffron City to Lavender Town."
        },
        {
            name: "Route 9",
            url: "kanto-route-9",
            coords: [673, 162, 890, 110],
            image: "../Images/Locations/Kanto/Routes/9.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/9.jpeg",
            description: "A route that leads from Cerulean City to Rock Tunnel."
        },
        {
            name: "Route 10",
            url: "kanto-route-10",
            coords: [835, 200, 890, 270],
            image: "../Images/Locations/Kanto/Routes/10.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/10.jpeg",
            description: "A route that connects Rock Tunnel to Lavender Town."
        },
        {
            name: "Route 11",
            url: "kanto-route-11",
            coords: [673, 540, 833, 487],
            image: "../Images/Locations/Kanto/Routes/11.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/11.jpeg",
            description: "A route that connects Vermilion City to Route 12."
        },
        {
            name: "Route 12",
            url: "kanto-route-12",
            coords: [834, 325, 887, 595],
            image: "../Images/Locations/Kanto/Routes/12.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/12.jpeg",
            description: "A long route that runs along the coast from Lavender Town to Route 13."
        },
        {
            name: "Route 13",
            url: "kanto-route-13",
            coords: [673, 595, 887, 650],
            image: "../Images/Locations/Kanto/Routes/13.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/13.jpeg",
            description: "A route that connects Route 12 to Route 14."
        },
        {
            name: "Route 14",
            url: "kanto-route-14",
            coords: [725, 650, 670, 702],
            image: "../Images/Locations/Kanto/Routes/14.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/14.jpeg",
            description: "A route that connects Route 13 to Route 15."
        },
        {
            name: "Route 15",
            url: "kanto-route-15",
            coords: [565, 755, 726, 702],
            image: "../Images/Locations/Kanto/Routes/15.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/15.jpeg",
            description: "A route that connects Route 14 to Fuchsia City."
        },
        {
            name: "Route 16",
            url: "kanto-route-16",
            coords: [293, 273, 454, 324],
            image: "../Images/Locations/Kanto/Routes/16.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/16.jpeg",
            description: "A route that connects Celadon City to Route 17."
        },
        {
            name: "Route 17",
            url: "kanto-route-17",
            coords: [293, 323, 345, 712],
            image: "../Images/Locations/Kanto/Routes/17.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/17.jpeg",
            description: "A long cycling road that connects Route 16 to Route 18."
        },
        {
            name: "Route 18",
            url: "kanto-route-18",
            coords: [510, 756, 294, 704],
            image: "../Images/Locations/Kanto/Routes/18.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/18.jpeg",
            description: "A route that connects Route 17 to Fuchsia City."
        },
        {
            name: "Route 19",
            url: "kanto-route-19",
            coords: [510, 757, 562, 811],
            image: "../Images/Locations/Kanto/Routes/19.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/19.jpeg",
            description: "A water route that connects Fuchsia City to Route 20."
        },
        {
            name: "Route 20",
            url: "kanto-route-20",
            coords: [240, 812, 565, 853],
            image: "../Images/Locations/Kanto/Routes/20.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/20.jpeg",
            description: "A water route that connects Route 19 to Cinnabar Island."
        },
        {
            name: "Route 21",
            url: "kanto-route-21",
            coords: [186, 650, 238, 811],
            image: "../Images/Locations/Kanto/Routes/21.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/21.jpeg",
            description: "A water route that connects Pallet Town to Cinnabar Island."
        },
        {
            name: "Route 22",
            url: "kanto-route-22",
            coords: [78, 483, 185, 432],
            image: "../Images/Locations/Kanto/Routes/22.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/22.jpeg",
            description: "A route that connects Viridian City to the Pokémon League."
        },
        {
            name: "Route 23",
            url: "kanto-route-23",
            coords: [130, 430, 78, 165],
            image: "../Images/Locations/Kanto/Routes/23.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/23.jpeg",
            description: "A route that leads to Victory Road and the Pokémon League."
        },
        {
            name: "Route 24",
            url: "kanto-route-24",
            coords: [618, 107, 672, 55],
            image: "../Images/Locations/Kanto/Routes/24.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/24.jpeg",
            description: "A route that connects Cerulean City to Route 25."
        },
        {
            name: "Route 25",
            url: "kanto-route-25",
            coords: [618, 0, 780, 53],
            image: "../Images/Locations/Kanto/Routes/25.jpeg",
            old_image: "../Images/Locations/Kanto/Old/Routes/25.jpeg",
            description: "A route that leads to Bill's house."
        },
        {
            name: "Indigo Plateau",
            url: "indigo-plateau",
            coords: [77, 108, 130, 162],
            image: "../Images/Locations/Kanto/indigo.jpeg",
            old_image: "../Images/Locations/Kanto/Old/indigo.jpeg",
            description: "The location of the Pokémon League."
        },
        {
            name: "Pewter City",
            url: "pewter-city",
            coords: [185, 165, 240, 220],
            image: "../Images/Locations/Kanto/pewter.jpeg",
            old_image: "../Images/Locations/Kanto/Old/pewter.jpeg",
            description: "A city known for its rock-type Pokémon gym."
        },
        {
            name: "Viridian City",
            url: "viridian-city",
            coords: [186, 433, 240, 487],
            image: "../Images/Locations/Kanto/viridian.jpeg",
            old_image: "../Images/Locations/Kanto/Old/viridian.jpeg",
            description: "A city with the final gym of the Kanto region."
        },
        {
            name: "Pallet Town",
            url: "pallet-town",
            coords: [186, 600, 240, 650],
            image: "../Images/Locations/Kanto/pallet.jpeg",
            old_image: "../Images/Locations/Kanto/Old/pallet.jpeg",
            description: "The hometown of the protagonist."
        },
        {
            name: "Cinnabar Island",
            url: "cinnabar-island",
            coords: [186, 813, 240, 863],
            image: "../Images/Locations/Kanto/cinnabar.jpeg",
            old_image: "../Images/Locations/Kanto/Old/cinnabar.jpeg",
            description: "An island with a fire-type Pokémon gym."
        },
        {
            name: "Cerulean City",
            url: "cerulean-city",
            coords: [615, 110, 670, 163],
            image: "../Images/Locations/Kanto/cerulean.jpeg",
            old_image: "../Images/Locations/Kanto/Old/cerulean.jpeg",
            description: "A city known for its water-type Pokémon gym."
        },
        {
            name: "Saffron City",
            url: "saffron-city",
            coords: [615, 270, 670, 324],
            image: "../Images/Locations/Kanto/saffron.jpeg",
            old_image: "../Images/Locations/Kanto/Old/saffron.jpeg",
            description: "A bustling city with a psychic-type Pokémon gym."
        },
        {
            name: "Vermilion City",
            url: "vermilion-city",
            coords: [615, 488, 670, 540],
            image: "../Images/Locations/Kanto/vermilion.jpeg",
            old_image: "../Images/Locations/Kanto/Old/vermilion.jpeg",
            description: "A port city with an electric-type Pokémon gym."
        },
        {
            name: "Lavender Town",
            url: "lavender-town",
            coords: [835, 270, 890, 324],
            image: "../Images/Locations/Kanto/lavender.jpeg",
            old_image: "../Images/Locations/Kanto/Old/lavender.jpeg",
            description: "A town with a dark history that is home to the famous Pokémon Tower."
        },
        {
            name: "Celadon City",
            url: "celadon-city",
            coords: [457, 270, 510, 324],
            image: "../Images/Locations/Kanto/celadon.jpeg",
            old_image: "../Images/Locations/Kanto/Old/celadon.jpeg",
            description: "A large city with a grass-type Pokémon gym."
        },
        {
            name: "Fuchsia City",
            url: "fuchsia-city",
            coords: [510, 705, 563, 757],
            image: "../Images/Locations/Kanto/fuchsia.jpeg",
            old_image: "../Images/Locations/Kanto/Old/fuchsia.jpeg",
            description: "A city known for its poison-type Pokémon gym."
        },
        {
            name: "Victory Road",
            url: "kanto-victory-road-1",
            coords: [91, 230, 117, 256],
            image: "../Images/Locations/Kanto/victory-road.jpeg",
            old_image: "../Images/Locations/Kanto/Old/victory-road.jpeg",
            description: "A challenging cave leading to the Pokémon League."
        },
        {
            name: "Viridian Forest",
            url: "viridian-forest",
            coords: [200, 230, 224, 255],
            image: "../Images/Locations/Kanto/viridian-forest.jpeg",
            old_image: "../Images/Locations/Kanto/Old/viridian-forest.jpeg",
            description: "A dense forest filled with bug-type Pokémon."
        },
        {
            name: "Mt. Moon",
            url: "mt-moon",
            coords: [415, 123, 440, 150],
            image: "../Images/Locations/Kanto/mt-moon.jpeg",
            old_image: "../Images/Locations/Kanto/Old/mt-moon.jpeg",
            description: "A mountain known for its moon stones and Clefairy."
        },
        {
            name: "Rock Tunnel",
            url: "rock-tunnel",
            coords: [850, 175, 873, 201],
            image: "../Images/Locations/Kanto/rock-tunnel.jpeg",
            old_image: "../Images/Locations/Kanto/Old/rock-tunnel.jpeg",
            description: "A dark tunnel that requires flash to navigate."
        },
        {
            name: "Seafoam Islands",
            url: "seafoam-islands",
            coords: [362, 827, 387, 850],
            image: "../Images/Locations/Kanto/seafoam.png",
            old_image: "../Images/Locations/Kanto/Old/seafoam.png",
            description: "A pair of islands known for their icy caverns."
        }
    ],
    "johto": [
        {
            name: "",
            url: "blackthorn-city",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "burned-tower",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "cherrygrove-city",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "cianwood-city",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "dark-cave",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "dragons-den",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "ecruteak-city",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "ice-path",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "ilex-forest",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "lage-of-rage",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "mt-mortar",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "mt-silver",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "national-park",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "new-bark-town",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "olivine-city",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-29",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-30",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-31",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-32",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-33",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-34",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-35",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-36",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },

        {
            name: "",
            url: "johto-route-37",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },

        {
            name: "",
            url: "johto-route-38",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },

        {
            name: "",
            url: "johto-route-39",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-sea-route-40",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-sea-route-41",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-42",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-43",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-44",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-45",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-46",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-47",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-route-48",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "ruins-of-alph",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "slowpoke-well",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "sprout-tower",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "bell-tower",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "tohjo-falls",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "union-cave",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "violet-city",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "whirl-islands",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "azalea-town",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "goldenrod-city",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "mahogany-town",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "johto-lighthouse",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "team-rocket-hq",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "goldenrod-tunnel",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        },
        {
            name: "",
            url: "radio-tower",
            coords: [],
            image: "",
            old_image: "",
            description: ""
        }
    ]
};