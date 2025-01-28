function calculateHp(pokemon) {
    // Hp = 2 * Level + 10 + Base
    return 2 * pokemon.level + 10 + pokemon.stats.hp;
}

/*
Whether a move scores a critical hit is determined by comparing a 1-byte random number (0 to 255) against a 1-byte threshold value (also 0 to 255).
If the random number is strictly less than the threshold, the Pokémon scores a critical hit.

If the threshold would exceed 255, it instead becomes 255. Consequently, the maximum possible chance of landing a critical hit is 255/256.
(If the generated random number is 255, that number can never be less than the threshold, regardless of the value of the threshold.)

In the Generation I core series games, the threshold is normally equal to half the user's base Speed.
 */
function isCritical(baseSpeed) {
    const threshold = Math.min(baseSpeed / 2, 255);
    const random = Math.floor(Math.random() * 256);
    return random < threshold;
}

function typeEffectiveness(moveType, targetType) {
    const effectiveness = calculateTypeMultiplier([targetType]);
    return effectiveness[moveType];
}

/*
Level is the level of the attacking Pokémon.
Critical is 2 for a critical hit, and 1 otherwise.
A is the effective Attack stat of the attacking Pokémon if the used move is a physical move, or the effective Special stat of the attacking Pokémon if the used move is a special move (for a critical hit, all modifiers are ignored, and the unmodified Attack or Special is used instead). If either this or D are greater than 255, both are divided by 4 and rounded down.
D is the effective Defense stat of the target if the used move is a physical move, or the effective Special stat of the target if the used move is an other special move (for a critical hit, all modifiers are ignored, and the unmodified Defense or Special is used instead). If the move is physical and the target has Reflect up, or if the move is special and the target has Light Screen up, this value is doubled (unless it is a critical hit). If the move is Explosion or Selfdestruct, this value is halved (rounded down, with a minimum of 1). If either this or A are greater than 255, both are divided by 4 and rounded down. Unlike future Generations, if this is 0, the division is not made equal to 0; rather, the game will try to divide by 0 and softlock, hanging indefinitely until it is turned off.
Power is the power of the used move.
STAB is the same-type attack bonus. This is equal to 1.5 if the move's type matches any of the user's types, and 1 if otherwise. Internally, it is recognized as an addition of the damage calculated thus far divided by 2, rounded down, then added to the damage calculated thus far.
Type1 is the type effectiveness of the used move against the target's type that comes first in the type matchup table, or only type if it only has one type. This can be 0.5 (not very effective), 1 (normally effective), 2 (super effective).
Type2 is the type effectiveness of the used move against the target's type that comes second in the type matchup table. This can be 0.5 (not very effective), 1 (normally effective), 2 (super effective). If the target only has one type, Type2 is 1. If this would result in 0 damage, the calculation ends here and the move is stated to have missed, even if it would've hit.
random is realized as a multiplication by a random uniformly distributed integer between 217 and 255 (inclusive), followed by an integer division by 255. If the calculated damage thus far is 1, random is always 1.
 */
function calculateDamage(level, critical, power, a, d, stab, type1, type2) {
    const calc1 = (2 * level * critical / 5) + 2
    const calc2 = calc1 * power * a / d
    const calc3 = calc2 / 50 + 2
    const random = Math.floor(Math.random() * (255 - 217 + 1) + 217) / 255;
    const calc4 = calc3 * stab * type1 * type2 * random;

    return Math.floor(calc4);
}