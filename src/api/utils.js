import ENUM from '@/api/enum'

function getSkillValueNominal(abilityValue) {
    const cModifier = Math.floor((abilityValue - 10) / 2)
    return cModifier
}

function getSkillValueMaitrise(abilityValue, bonusMaitrise) {
    const cModifier = Math.floor((abilityValue - 10) / 2)
    return cModifier + bonusMaitrise
}

function getSkillValueExpert(abilityValue, bonusMaitrise) {
    const cModifier = Math.floor((abilityValue - 10) / 2)
    return  cModifier + 2 * bonusMaitrise
}

function getSkillValue(abilityKey, abilitiesMap, bonusMaitrise, skillValue) {
    const abilityValue = abilitiesMap[abilityKey]
    if (skillValue === 1) {
        return getSkillValueMaitrise(abilityValue, bonusMaitrise)
    } else if (skillValue === 2) {
        return getSkillValueExpert(abilityValue, bonusMaitrise)
    } else {
        return getSkillValueNominal(abilityValue)
    }
}

export function getSkillLabels(skillsMap, abilitiesMap, bonusMaitrise) {
    let skillsLabel = {}
    for (let key in skillsMap) {
        const abilityKey = ENUM.SKILLS_ABILITIES[key]
        const skillValue = getSkillValue(abilityKey, abilitiesMap, bonusMaitrise, skillsMap[key])
        if (skillsMap[key] == 1)
            skillsLabel[key] = `☆ (${skillValue})`
        else if (skillsMap[key] == 2)
            skillsLabel[key] = `★ (${skillValue})`
        else if (skillsMap[key] > 2)
            skillsLabel[key] = `⍟ (${skillValue})`
        else
            skillsLabel[key] = `(${skillValue})`
    }
    return skillsLabel;
}