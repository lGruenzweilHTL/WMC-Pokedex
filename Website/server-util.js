const baseUrl = 'http://localhost:3000';

async function fetchJson(url) {
    const response = await fetch(url);
    return response.json();
}

async function fetchBattlePokemon() {
    return fetchJson(`${baseUrl}/pokemon/`);
}

async function fetchMoves() {
    return fetchJson(`${baseUrl}/moves/`);
}

async function fetchItems() {
    return fetchJson(`${baseUrl}/items/`);
}

async function fetchDescriptions() {
    return fetchJson(`${baseUrl}/descriptions/`);
}