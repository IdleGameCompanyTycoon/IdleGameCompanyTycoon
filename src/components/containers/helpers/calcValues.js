export const midOfMinMax = (min, max) => {
    return (min + (Math.random() * (max - min)));
}

// Calculates new skill values with a maximum of 1
export const calcNewSkill = (multiplier, rawSkills) => {
    const skills = Object.assign({}, rawSkills);
    for (let skill in skills) {
        if (typeof skill === 'number') {
            skills[skill] += ((1-skills[skill]) * multiplier);
        } else {
            skills[skill] = calcNewSkill(multiplier, skills[skill]);
        }
    }

    return skills
} 