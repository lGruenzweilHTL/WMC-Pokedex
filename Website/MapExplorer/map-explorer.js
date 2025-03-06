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

    image.addEventListener('load', () => {
        const imgWidth = image.width;
        const imgHeight = image.height;

        locations[region.toLowerCase()].forEach(city => {
            const area = document.createElement('area');
            area.shape = 'rect';
            area.coords = city.coords.map((coord, index) => {
                return index % 2 === 0 ? (coord / 100) * imgWidth : (coord / 100) * imgHeight;
            }).join(',');
            area.href = `location-info.html?type=location&name=${city.url}`;
            area.alt = city.name;
            area.setAttribute("data-name", city.name);
            area.setAttribute("data-preview", city.image);
            area.setAttribute("data-old-img", city.map_image);
            area.setAttribute("data-description", city.description);
            map.appendChild(area);
        });

        document.body.appendChild(map);

        const areas = document.querySelectorAll('area');
        const infoBox = document.getElementById('info-box');
        const card = document.getElementById('info-card');
        const preview = document.getElementById('preview-image');
        const oldPreview = document.getElementById('old_preview');
        const locationName = document.getElementById('location-name');
        const locationDescription = document.getElementById('location-description');

        areas.forEach(area => {
            area.addEventListener('mouseover', function (event) {
                infoBox.textContent = event.target.getAttribute('data-name');
                infoBox.style.display = 'block';
                infoBox.style.left = `${event.pageX + 10}px`;
                infoBox.style.top = `${event.pageY + 10}px`;

                card.style.display = 'block';
                preview.src = event.target.getAttribute('data-preview');
                oldPreview.src = event.target.getAttribute('data-old-img');
                locationName.textContent = event.target.getAttribute('data-name');
                locationDescription.textContent = event.target.getAttribute('data-description');
            });

            area.addEventListener('mouseout', function () {
                infoBox.style.display = 'none';
                card.style.display = 'none';
            });

            area.addEventListener('click', function (event) {
                document.location = area.href;
            });
        });
    });
});

/*
    {
        name: "",
        url: "",
        coords: [],
        image: "",
        map_image: "",
        description: ""
    },
 */

const locations = {
    "kanto": [
        {
            name: "Indigo Plateau",
            url: "indigo-plateau",
            coords: [5.95, 11.50, 11.70, 17.25],
            image: "../Images/Locations/Kanto/indigo.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/indigo.jpeg",
            description: "The location of the Pokémon League."
        },
        {
            name: "Pewter City",
            url: "pewter-city",
            coords: [17.85, 17.65, 23.60, 23.00],
            image: "../Images/Locations/Kanto/pewter.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/pewter.jpeg",
            description: "A city known for its rock-type Pokémon gym."
        },
        {
            name: "Viridian City",
            url: "viridian-city",
            coords: [17.85, 46.80, 23.60, 52.75],
            image: "../Images/Locations/Kanto/viridian.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/viridian.jpeg",
            description: "A city with the final gym of the Kanto region."
        },
        {
            name: "Pallet Town",
            url: "pallet-town",
            coords: [17.65, 64.65, 23.60, 70.20],
            image: "../Images/Locations/Kanto/pallet.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/pallet.jpeg",
            description: "The hometown of the protagonist."
        },
        {
            name: "Cinnabar Island",
            url: "cinnabar-island",
            coords: [17.65, 88.47, 23.40, 93.82],
            image: "../Images/Locations/Kanto/cinnabar.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/cinnabar.jpeg",
            description: "An island with a fire-type Pokémon gym."
        },
        {
            name: "Cerulean City",
            url: "cerulean-city",
            coords: [64.84, 11.53, 70.79, 17.28],
            image: "../Images/Locations/Kanto/cerulean.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/cerulean.jpeg",
            description: "A city known for its water-type Pokémon gym."
        },
        {
            name: "Saffron City",
            url: "saffron-city",
            coords: [64.84, 29.18, 70.79, 35.13],
            image: "../Images/Locations/Kanto/saffron.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/saffron.jpeg",
            description: "A bustling city with a psychic-type Pokémon gym."
        },
        {
            name: "Vermilion City",
            url: "vermilion-city",
            coords: [64.84, 52.58, 70.40, 58.53],
            image: "../Images/Locations/Kanto/vermilion.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/vermilion.jpeg",
            description: "A port city with an electric-type Pokémon gym."
        },
        {
            name: "Lavender Town",
            url: "lavender-town",
            coords: [88.64, 29.18, 94.19, 34.73],
            image: "../Images/Locations/Kanto/lavender.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/lavender.jpeg",
            description: "A town with a dark history that is home to the famous Pokémon Tower."
        },
        {
            name: "Celadon City",
            url: "celadon-city",
            coords: [47.20, 29.18, 52.95, 35.13],
            image: "../Images/Locations/Kanto/celadon.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/celadon.jpeg",
            description: "A large city with a grass-type Pokémon gym."
        },
        {
            name: "Fuchsia City",
            url: "fuchsia-city",
            coords: [53.34, 76.57, 58.70, 82.32],
            image: "../Images/Locations/Kanto/fuchsia.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/fuchsia.jpeg",
            description: "A city known for its poison-type Pokémon gym."
        },
        {
            name: "Victory Road",
            url: "kanto-victory-road-1",
            coords: [6.94, 24.82, 10.71, 27.99],
            image: "../Images/Locations/Kanto/victory-road.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/victory-road.jpeg",
            description: "A challenging cave leading to the Pokémon League."
        },
        {
            name: "Viridian Forest",
            url: "viridian-forest",
            coords: [18.84, 24.82, 22.41, 28.19],
            image: "../Images/Locations/Kanto/viridian-forest.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/viridian-forest.jpeg",
            description: "A dense forest filled with bug-type Pokémon."
        },
        {
            name: "Mt. Moon",
            url: "mt-moon",
            coords: [42.63, 16.49, 45.81, 12.92],
            image: "../Images/Locations/Kanto/mt-moon.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/mt-moon.jpeg",
            description: "A mountain known for its moon stones and Clefairy."
        },
        {
            name: "Rock Tunnel",
            url: "rock-tunnel",
            coords: [89.43, 18.87, 93.00, 22.24],
            image: "../Images/Locations/Kanto/rock-tunnel.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/rock-tunnel.jpeg",
            description: "A dark tunnel that requires flash to navigate."
        },
        {
            name: "Seafoam Islands",
            url: "seafoam-islands",
            coords: [35.50, 88.27, 41.05, 94.02],
            image: "../Images/Locations/Kanto/seafoam.png",
            map_image: "../Images/Locations/Kanto/Maps/seafoam.png",
            description: "A pair of islands known for their icy caverns."
        },
        {
            name: "Route 1",
            url: "kanto-route-1",
            coords: [17.85, 64.48, 23.60, 52.78],
            image: "../Images/Locations/Kanto/Routes/1.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/1.jpeg",
            description: "The first route connecting Pallet Town to Viridian City."
        },
        {
            name: "Route 2",
            url: "kanto-route-2",
            coords: [17.85, 47.03, 23.40, 23.43],
            image: "../Images/Locations/Kanto/Routes/2.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/2.jpeg",
            description: "A route that leads from Viridian City to Pewter City."
        },
        {
            name: "Route 3",
            url: "kanto-route-3",
            coords: [23.60, 23.23, 42.24, 11.73],
            image: "../Images/Locations/Kanto/Routes/3.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/3.jpeg",
            description: "A mountainous route leading to Mt. Moon."
        },
        {
            name: "Route 4",
            url: "kanto-route-4",
            coords: [46.20, 17.28, 64.65, 11.73],
            image: "../Images/Locations/Kanto/Routes/4.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/4.jpeg",
            description: "A route that connects Mt. Moon to Cerulean City."
        },
        {
            name: "Route 5",
            url: "kanto-route-5",
            coords: [64.84, 17.88, 70.59, 29.18],
            image: "../Images/Locations/Kanto/Routes/5.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/5.jpeg",
            description: "A route that connects Cerulean City to Saffron City."
        },
        {
            name: "Route 6",
            url: "kanto-route-6",
            coords: [64.84, 35.13, 70.59, 52.97],
            image: "../Images/Locations/Kanto/Routes/6.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/6.jpeg",
            description: "A route that connects Saffron City to Vermilion City."
        },
        {
            name: "Route 7",
            url: "kanto-route-7",
            coords: [64.65, 29.38, 53.14, 35.13],
            image: "../Images/Locations/Kanto/Routes/7.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/7.jpeg",
            description: "A short route connecting Celadon City to Saffron City."
        },
        {
            name: "Route 8",
            url: "kanto-route-8",
            coords: [70.79, 35.13, 88.24, 29.58],
            image: "../Images/Locations/Kanto/Routes/8.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/8.jpeg",
            description: "A route that connects Saffron City to Lavender Town."
        },
        {
            name: "Route 9",
            url: "kanto-route-9",
            coords: [70.79, 11.70, 94.19, 18.44],
            image: "../Images/Locations/Kanto/Routes/9.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/9.jpeg",
            description: "A route that leads from Cerulean City to Rock Tunnel."
        },
        {
            name: "Route 10",
            url: "kanto-route-10",
            coords: [88.44, 22.41, 94.19, 29.35],
            image: "../Images/Locations/Kanto/Routes/10.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/10.jpeg",
            description: "A route that connects Rock Tunnel to Lavender Town."
        },
        {
            name: "Route 11",
            url: "kanto-route-11",
            coords: [70.79, 58.50, 88.24, 52.95],
            image: "../Images/Locations/Kanto/Routes/11.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/11.jpeg",
            description: "A route that connects Vermilion City to Route 12."
        },
        {
            name: "Route 12",
            url: "kanto-route-12",
            coords: [88.44, 35.30, 94.19, 64.65],
            image: "../Images/Locations/Kanto/Routes/12.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/12.jpeg",
            description: "A long route that runs along the coast from Lavender Town to Route 13."
        },
        {
            name: "Route 13",
            url: "kanto-route-13",
            coords: [94.19, 70.20, 76.74, 64.84],
            image: "../Images/Locations/Kanto/Routes/13.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/13.jpeg",
            description: "A route that connects Route 12 to Route 14."
        },
        {
            name: "Route 14",
            url: "kanto-route-14",
            coords: [70.99, 65.04, 76.35, 76.35],
            image: "../Images/Locations/Kanto/Routes/14.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/14.jpeg",
            description: "A route that connects Route 13 to Route 15."
        },
        {
            name: "Route 15",
            url: "kanto-route-15",
            coords: [59.09, 81.90, 76.54, 76.74],
            image: "../Images/Locations/Kanto/Routes/15.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/15.jpeg",
            description: "A route that connects Route 14 to Fuchsia City."
        },
        {
            name: "Route 16",
            url: "kanto-route-16",
            coords: [29.55, 29.18, 47.20, 35.13],
            image: "../Images/Locations/Kanto/Routes/16.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/16.jpeg",
            description: "A route that connects Celadon City to Route 17."
        },
        {
            name: "Route 17",
            url: "kanto-route-17",
            coords: [29.55, 35.33, 35.89, 76.57],
            image: "../Images/Locations/Kanto/Routes/17.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/17.jpeg",
            description: "A long cycling road that connects Route 16 to Route 18."
        },
        {
            name: "Route 18",
            url: "kanto-route-18",
            coords: [52.95, 76.77, 30.34, 82.32],
            image: "../Images/Locations/Kanto/Routes/18.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/18.jpeg",
            description: "A route that connects Route 17 to Fuchsia City."
        },
        {
            name: "Route 19",
            url: "kanto-route-19",
            coords: [53.34, 82.32, 58.90, 88.07],
            image: "../Images/Locations/Kanto/Routes/19.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/19.jpeg",
            description: "A water route that connects Fuchsia City to Route 20."
        },
        {
            name: "Route 20",
            url: "kanto-route-20",
            coords: [23.60, 94.02, 58.90, 88.27],
            image: "../Images/Locations/Kanto/Routes/20.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/20.jpeg",
            description: "A water route that connects Route 19 to Cinnabar Island."
        },
        {
            name: "Route 21",
            url: "kanto-route-21",
            coords: [17.85, 88.10, 23.40, 70.45],
            image: "../Images/Locations/Kanto/Routes/21.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/21.jpeg",
            description: "A water route that connects Pallet Town to Cinnabar Island."
        },
        {
            name: "Route 22",
            url: "kanto-route-22",
            coords: [6.15, 52.58, 17.85, 46.83],
            image: "../Images/Locations/Kanto/Routes/22.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/22.jpeg",
            description: "A route that connects Viridian City to the Pokémon League."
        },
        {
            name: "Route 23",
            url: "kanto-route-23",
            coords: [11.70, 46.63, 5.95, 17.68],
            image: "../Images/Locations/Kanto/Routes/23.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/23.jpeg",
            description: "A route that leads to Victory Road and the Pokémon League."
        },
        {
            name: "Route 24",
            url: "kanto-route-24",
            coords: [65.04, 11.30, 70.79, 5.75],
            image: "../Images/Locations/Kanto/Routes/24.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/24.jpeg",
            description: "A route that connects Cerulean City to Route 25."
        },
        {
            name: "Route 25",
            url: "kanto-route-25",
            coords: [64.84, 0.20, 82.29, 5.75],
            image: "../Images/Locations/Kanto/Routes/25.jpeg",
            map_image: "../Images/Locations/Kanto/Maps/Routes/25.jpeg",
            description: "A route that leads to Bill's house."
        }
    ],
    "johto": [
        {
            name: "Blackthorn City",
            url: "blackthorn-city",
            coords: [78.92, 25.55, 84.28, 32.07],
            image: "../Images/Locations/Johto/blackthorn.jpeg",
            map_image: "",
            description: "A city known for its Dragon-type Pokémon gym."
        },
        {
            name: "Burned Tower",
            url: "burned-tower",
            coords: [42.44, 27.12, 44.02, 30.51],
            image: "../Images/Locations/Johto/burned-tower.jpeg",
            map_image: "",
            description: "A tower that was destroyed by a mysterious fire."
        },
        {
            name: "Cherrygrove City",
            url: "cherrygrove-city",
            coords: [65.84, 69.88, 70.79, 76.14],
            image: "../Images/Locations/Johto/cherrygrove.jpeg",
            map_image: "",
            description: "A small city by the sea."
        },
        {
            name: "Cianwood City",
            url: "cianwood-city",
            coords: [10.71, 65.71, 15.67, 71.96],
            image: "../Images/Locations/Johto/cianwood.jpeg",
            map_image: "",
            description: "A city located on a secluded island."
        },
        {
            name: "Dark Cave",
            url: "dark-cave",
            coords: [66.23, 35.98, 79.72, 56.32],
            image: "../Images/Locations/Johto/dark-cave.jpeg",
            map_image: "",
            description: "A pitch-black cave that requires Flash to navigate."
        },
        {
            name: "Ecruteak City",
            url: "ecruteak-city",
            coords: [44.02, 25.81, 49.18, 32.33],
            image: "../Images/Locations/Johto/ecruteak.jpeg",
            map_image: "",
            description: "A historical city with two ancient towers."
        },
        {
            name: "Ice Path",
            url: "ice-path",
            coords: [73.17, 25.55, 77.93, 32.33],
            image: "../Images/Locations/Johto/ice-path.jpeg",
            map_image: "",
            description: "A frozen cave that connects Mahogany Town to Blackthorn City."
        },
        {
            name: "Ilex Forest",
            url: "ilex-forest",
            coords: [36.09, 87.09, 41.44, 93.34],
            image: "../Images/Locations/Johto/ilex-forest.jpeg",
            map_image: "",
            description: "A dense forest that is home to many Bug-type Pokémon."
        },
        {
            name: "Lake of Rage",
            url: "lake-of-rage",
            coords: [60.08, 4.69, 65.44, 10.43],
            image: "../Images/Locations/Johto/lake-of-rage.jpeg",
            map_image: "",
            description: "A lake where a red Gyarados can be found."
        },
        {
            name: "Mt. Mortar",
            url: "mt-mortar",
            coords: [52.55, 26.07, 57.11, 32.33],
            image: "../Images/Locations/Johto/mt-mortar.jpeg",
            map_image: "",
            description: "A large mountain with many hidden areas."
        },
        {
            name: "Mt. Silver",
            url: "mt-silver",
            coords: [92.01, 49.02, 97.17, 55.28],
            image: "../Images/Locations/Johto/mt-silver.jpeg",
            map_image: "",
            description: "A dangerous mountain that is home to powerful Pokémon."
        },
        {
            name: "National Park",
            url: "national-park",
            coords: [17.76, 41.31, 22.36, 46.85],
            image: "../Images/Locations/Johto/national-park.jpeg",
            map_image: "",
            description: "A beautiful park where Bug Catching Contests are held."
        },
        {
            name: "New Bark Town",
            url: "new-bark-town",
            coords: [82.51, 69.52, 87.49, 76.07],
            image: "../Images/Locations/Johto/new-bark.jpeg",
            map_image: "",
            description: "A small town where the protagonist begins their journey."
        },
        {
            name: "Olivine City",
            url: "olivine-city",
            coords: [24.39, 46.45, 29.75, 53.49],
            image: "../Images/Locations/Johto/olivine.jpeg",
            map_image: "",
            description: "A port city with a Steel-type Pokémon gym."
        },
        {
            name: "Ruins of Alph",
            url: "ruins-of-alph",
            coords: [49.58, 54.61, 54.14, 60.34],
            image: "../Images/Locations/Johto/ruins-of-alph.jpeg",
            map_image: "",
            description: "Ancient ruins that are home to the mysterious Unown."
        },
        {
            name: "Slowpoke Well",
            url: "slowpoke-well",
            coords: [48.19, 87.98, 49.58, 91.63],
            image: "../Images/Locations/Johto/slowpoke-well.jpeg",
            map_image: "",
            description: "A well where Slowpoke are found."
        },
        {
            name: "Sprout Tower",
            url: "sprout-tower",
            coords: [59.69, 45.48, 60.88, 49.13],
            image: "../Images/Locations/Johto/sprout-tower.jpeg",
            map_image: "",
            description: "A tower in Violet City where monks train with Bellsprout."
        },
        {
            name: "Union Cave",
            url: "union-cave",
            coords: [54.73, 86.94, 59.29, 92.67],
            image: "../Images/Locations/Johto/union-cave.jpeg",
            map_image: "",
            description: "A cave that connects Route 32 to Azalea Town."
        },
        {
            name: "Violet City",
            url: "violet-city",
            coords: [54.53, 43.92, 59.49, 50.43],
            image: "../Images/Locations/Johto/violet.jpeg",
            map_image: "",
            description: "A city with a Flying-type Pokémon gym."
        },
        {
            name: "Whirl Islands",
            url: "whirl-islands",
            coords: [21.42, 65.82, 25.78, 71.55],
            image: "../Images/Locations/Johto/whirl-islands.jpeg",
            map_image: "",
            description: "A group of islands where Lugia is said to reside."
        },
        {
            name: "Azalea Town",
            url: "azalea-town",
            coords: [43.23, 86.42, 47.99, 92.93],
            image: "../Images/Locations/Johto/azalea.jpeg",
            map_image: "",
            description: "A town known for its Bug-type Pokémon gym."
        },
        {
            name: "Goldenrod City",
            url: "goldenrod-city",
            coords: [36.69, 65.82, 41.44, 72.08],
            image: "../Images/Locations/Johto/goldenrod.jpeg",
            map_image: "",
            description: "A large city with a Normal-type Pokémon gym."
        },
        {
            name: "Mahogany Town",
            url: "mahogany-town",
            coords: [60.28, 25.66, 65.24, 32.44],
            image: "../Images/Locations/Johto/mahogany.jpeg",
            map_image: "",
            description: "A town known for its Ice-type Pokémon gym."
        },
        {
            name: "Lighthouse",
            url: "johto-lighthouse",
            coords: [25.58, 46.26, 28.36, 43.92],
            image: "../Images/Locations/Johto/lighthouse.jpeg",
            map_image: "",
            description: "A lighthouse in Olivine City that guides ships."
        },
        {
            name: "Route 29",
            url: "johto-route-29",
            coords: [70.79, 74.35, 82.29, 70.96],
            image: "",
            map_image: "",
            description: "The first route connecting New Bark Town to Cherrygrove City."
        },
        {
            name: "Route 30",
            url: "johto-route-30",
            coords: [66.83, 50.62, 69.41, 69.13],
            image: "",
            map_image: "",
            description: "A route that leads from Cherrygrove City to Route 31."
        },
        {
            name: "Route 31",
            url: "johto-route-31",
            coords: [59.72, 49.37, 65.85, 45.59],
            image: "",
            map_image: "",
            description: "A route that connects Route 30 to Violet City."
        },
        {
            name: "Route 32",
            url: "johto-route-32",
            coords: [55.72, 51.25, 58.30, 86.71],
            image: "",
            map_image: "",
            description: "A route that leads from Violet City to Union Cave."
        },
        {
            name: "Route 33",
            url: "johto-route-33",
            coords: [48.19, 87.76, 54.93, 91.41],
            image: "",
            map_image: "",
            description: "A short route connecting Union Cave to Azalea Town."
        },
        {
            name: "Route 34",
            url: "johto-route-34",
            coords: [37.68, 72.37, 40.25, 86.71],
            image: "",
            map_image: "",
            description: "A route that connects Goldenrod City to Ilex Forest."
        },
        {
            name: "Route 35",
            url: "johto-route-35",
            coords: [37.48, 50.47, 40.25, 65.07],
            image: "",
            map_image: "",
            description: "A route that leads from Goldenrod City to National Park."
        },
        {
            name: "Route 36",
            url: "johto-route-36",
            coords: [41.64, 48.91, 54.33, 45.52],
            image: "",
            map_image: "",
            description: "A route that connects National Park to Ecruteak City."
        },
        {
            name: "Route 37",
            url: "johto-route-37",
            coords: [45.61, 45.26, 47.99, 32.48],
            image: "",
            map_image: "",
            description: "A short route that leads to Ecruteak City."
        },
        {
            name: "Route 38",
            url: "johto-route-38",
            coords: [25.78, 27.53, 44.02, 30.39],
            image: "",
            map_image: "",
            description: "A route that connects Ecruteak City to Route 39."
        },
        {
            name: "Route 39",
            url: "johto-route-39",
            coords: [25.58, 46.30, 27.96, 30.66],
            image: "",
            map_image: "",
            description: "A route that leads from Route 38 to Olivine City."
        },
        {
            name: "Sea Route 40",
            url: "johto-sea-route-40",
            coords: [22.21, 65.85, 24.19, 48.12],
            image: "",
            map_image: "",
            description: "A sea route that connects Olivine City to Route 41."
        },
        {
            name: "Sea Route 41",
            url: "johto-sea-route-41",
            coords: [15.67, 70.55, 21.02, 67.16],
            image: "",
            map_image: "",
            description: "A sea route that leads from Route 40 to Cianwood City."
        },
        {
            name: "Route 42",
            url: "johto-route-42",
            coords: [49.38, 30.36, 59.89, 27.23],
            image: "",
            map_image: "",
            description: "A route that connects Ecruteak City to Mahogany Town."
        },
        {
            name: "Route 43",
            url: "johto-route-43",
            coords: [61.47, 25.14, 64.05, 10.80],
            image: "",
            map_image: "",
            description: "A route that leads from Mahogany Town to the Lake of Rage."
        },
        {
            name: "Route 44",
            url: "johto-route-44",
            coords: [65.44, 30.36, 78.73, 27.23],
            image: "",
            map_image: "",
            description: "A route that connects Mahogany Town to the Ice Path."
        },
        {
            name: "Route 45",
            url: "johto-route-45",
            coords: [80.31, 32.44, 82.69, 60.34],
            image: "",
            map_image: "",
            description: "A route that leads from Blackthorn City to Route 46."
        },
        {
            name: "Route 46",
            url: "johto-route-46",
            coords: [75.16, 70.77, 77.93, 61.91],
            image: "",
            map_image: "",
            description: "A route that connects Route 45 to Route 29."
        },
        {
            name: "Route 47",
            url: "johto-route-47",
            coords: [0.99, 75.20, 14.08, 72.60],
            image: "",
            map_image: "",
            description: "A route that leads from Cianwood City to Route 48."
        },
        {
            name: "Route 48",
            url: "johto-route-48",
            coords: [0.99, 61.39, 3.37, 72.08],
            image: "",
            map_image: "",
            description: "A route that connects Route 47 to the Safari Zone."
        }
    ]
};