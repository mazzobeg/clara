const CARACTERISTICS_KEY = "abilities"
const ATTRIBUTES_KEY = "attributes"
const SUB_RACE_KEY = "subRace"
const SKILLS_KEY = "skills"
const TRAITS_KEY = "features"
const LANGUAGES_KEY = "languages"
const SPELLS_KEY = "spells"
const MAITRISES_KEY = "masterings"
const ITEMS_KEY = "items"
const SAVE_KEY = "saves"

const ATTRIBUTES_KEYS = {
    CA : "ca",
    INIT : "init",
    SPEED : "speed",
    LIFE : "life",
    TEMP_LIFE : "tempLife",
    LIFE_DICE : "hitDice",
    BONUS_MAITRISE : "masteringBonus",
}

const CARACTERISTICS = {
    FOR : "str",
    DEX : "dex",
    CON : "con",
    INT : "int",
    SAG : "wis",
    CHA : "cha",
}
const ATTRIBUTES = {
    CA : "ca",
    INIT : "init",
    SPEED : "speed",
    LIFE : "life",
    TEMP_LIFE : "tempLife",
    HIT_DICE : "hitDice",
}


const SKILLS  = {
    ACROBATICS : "acrobatics",
    ANIMAL_HANDLING : "animal_handling",
    ARCANA : "arcana",
    ATHLETICS : "athletics",
    DECEPTION : "deception",
    HISTORY : "history",
    INSIGHT : "insight",
    INTIMIDATION : "intimidation",
    INVESTIGATION : "investigation",
    MEDICINE : "medicine",
    NATURE : "nature",
    PERCEPTION : "perception",
    PERFORMANCE : "performance",
    PERSUASION : "persuasion",
    RELIGION : "religion",
    SLEIGHT_OF_HAND : "sleight_of_hand",
    STEALTH : "stealth",
    SURVIVAL : "survival"  
}

const SKILLS_ABILITIES = {
    [SKILLS.ACROBATICS] : "dex",
    [SKILLS.ANIMAL_HANDLING] : "wis",
    [SKILLS.ARCANA] : "int",
    [SKILLS.ATHLETICS] : "str",
    [SKILLS.DECEPTION] : "cha",
    [SKILLS.HISTORY] : "int",
    [SKILLS.INSIGHT] : "wis",
    [SKILLS.INTIMIDATION] : "cha",
    [SKILLS.INVESTIGATION] : "int",
    [SKILLS.MEDICINE] : "wis",
    [SKILLS.NATURE] : "int",
    [SKILLS.PERCEPTION] : "wis",
    [SKILLS.PERFORMANCE] : "cha",
    [SKILLS.PERSUASION] : "cha",
    [SKILLS.RELIGION] : "int",
    [SKILLS.SLEIGHT_OF_HAND] : "dex",
    [SKILLS.STEALTH] : "dex",
    [SKILLS.SURVIVAL] : "wis"
}

export default {
    CARACTERISTICS_KEY,
    ATTRIBUTES_KEY,
    CARACTERISTICS,
    ATTRIBUTES,
    SUB_RACE_KEY,
    SKILLS_KEY,
    ATTRIBUTES_KEYS,
    TRAITS_KEY,
    LANGUAGES_KEY,
    SPELLS_KEY,
    MAITRISES_KEY,
    ITEMS_KEY,
    SAVE_KEY,
    SKILLS,
    SKILLS_ABILITIES
}