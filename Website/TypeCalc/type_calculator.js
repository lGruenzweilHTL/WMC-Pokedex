document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const addTypeButton = document.getElementById('addType');
    const typeContainer = document.getElementById('typeContainer');

    addTypeButton.addEventListener('click', function(event) {
        event.preventDefault();
        addTypeField();
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const types = Array.from(document.querySelectorAll('.type-select')).map(select => select.value);
        calculateTypeEffectiveness(types);
    });
});

function addTypeField() {
    const typeContainer = document.getElementById('typeContainer');
    const newTypeField = document.createElement('div');
    newTypeField.classList.add('form-row', 'align-items-center', 'mb-2');
    newTypeField.innerHTML = `
        <div class="col-auto">
            <label for="type" class="col-form-label">Type:</label>
        </div>
        <div class="col-auto">
            <select name="type" class="form-control type-select">
                <option value="normal">Normal</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="electric">Electric</option>
                <option value="grass">Grass</option>
                <option value="ice">Ice</option>
                <option value="fighting">Fighting</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="flying">Flying</option>
                <option value="psychic">Psychic</option>
                <option value="bug">Bug</option>
                <option value="rock">Rock</option>
                <option value="ghost">Ghost</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="steel">Steel</option>
                <option value="fairy">Fairy</option>
            </select>
        </div>
        <div class="col-auto">
            <button class="btn btn-danger removeType">Remove</button>
        </div>
    `;
    typeContainer.appendChild(newTypeField);

    newTypeField.querySelector('.removeType').addEventListener('click', function(event) {
        event.preventDefault();
        newTypeField.remove();
    });
}

function calculateTypeEffectiveness(types) {
    const effectiveness = calculateTypeMultiplier(types);
    const table = document.getElementById('typeEffectiveness');
    table.innerHTML = '';

    Object.entries(effectiveness).forEach(([type, multiplier]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${type}</td>
            <td>${multiplier}</td>
        `;
        table.appendChild(row);
    });
}

// Define type effectiveness (outer object: defender, inner object: attacker)
const TypeWeaknesses = {
    normal: { fighting: 2, ghost: 0 },
    fire: { fire: 0.5, water: 2, grass: 0.5, ice: 0.5, ground: 2, bug: 0.5, rock: 2, steel: 0.5, fairy: 0.5 },
    water: { fire: 0.5, water: 0.5, electric: 2, grass: 2, ice: 0.5, steel: 0.5 },
    electric: { electric: 0.5, ground: 2, flying: 0.5, steel: 0.5 },
    grass: { fire: 2, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, poison: 2, ground: 0.5, flying: 2, bug: 2 },
    ice: { fire: 2, ice: 0.5, fighting: 2, rock: 2, steel: 2 },
    fighting: { flying: 2, psychic: 2, bug: 0.5, rock: 0.5, dark: 0.5, fairy: 2 },
    poison: { grass: 0.5, fighting: 0.5, poison: 0.5, ground: 2, psychic: 2, bug: 0.5, fairy: 0.5 },
    ground: { water: 2, grass: 2, ice: 2, poison: 0.5, rock: 0.5, electric: 0 },
    flying: { electric: 2, grass: 0.5, fighting: 0.5, bug: 0.5, rock: 2, ice: 2, ground: 0 },
    psychic: { fighting: 0.5, psychic: 0.5, bug: 2, ghost: 2, dark: 2 },
    bug: { fire: 2, grass: 0.5, fighting: 0.5, ground: 0.5, flying: 2, rock: 2 },
    rock: { normal: 0.5, fire: 0.5, water: 2, grass: 2, fighting: 2, poison: 0.5, ground: 2, flying: 0.5, steel: 2 },
    ghost: { normal: 0, fighting: 0, poison: 0.5, bug: 0.5, ghost: 2, dark: 2 },
    dragon: { fire: 0.5, water: 0.5, grass: 0.5, electric: 0.5, ice: 2, dragon: 2, fairy: 2 },
    dark: { fighting: 2, psychic: 0, bug: 2, ghost: 0.5, dark: 0.5, fairy: 2 },
    steel: { normal: 0.5, fire: 2, grass: 0.5, ice: 0.5, fighting: 2, poison: 0, ground: 2, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, dragon: 0.5, steel: 0.5, fairy: 0.5 },
    fairy: { fighting: 0.5, poison: 2, bug: 0.5, dragon: 0, dark: 0.5, steel: 2 }
};

// Calculate resistances/weaknesses
function calculateTypeMultiplier(types) {
    const effectiveness = {};

    types.forEach(type => {
        Object.entries(TypeWeaknesses[type]).forEach(([targetType, multiplier]) => {
            if (effectiveness[targetType] === undefined) {
                effectiveness[targetType] = multiplier;
            } else {
                effectiveness[targetType] *= multiplier;
            }
        });
    });

    // Ensure all types have at least a neutral effectiveness
    Object.keys(TypeWeaknesses).forEach(type => {
        if (effectiveness[type] === undefined) {
            effectiveness[type] = 1;
        }
    });

    return effectiveness;
}