document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('typeForm');
    const addTypeButton = document.getElementById('addType');

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
    newTypeField.classList.add('form-row', 'align-items-center', 'mb-1');
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

    Object.entries(effectiveness).forEach(([type, multiplier], index) => {
        const row = document.createElement('tr');
        row.style.animationDelay = `${index * 0.1}s`; // Dynamically set delay
        row.innerHTML = `
            <td>${type}</td>
            <td>${multiplier}</td>
        `;
        table.appendChild(row);
    });
}