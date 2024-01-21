import race_lvl1 from '@/assets/race_lvl1.json'
import ENUM from '@/api/enum.js'
import { Quantity, Element } from '@/api/type.js'
import { Race } from '@/api/typeNew.js'
import racesDatas from '@/assets/races.json'

function getRace(raceName) {
    if (!(raceName in race_lvl1)) {
        throw new Error(`Race '${raceName}' not found in race`);
    }
    return race_lvl1[raceName];
}

function getRaceChoices(raceName) {
    try {
        console.log("getRaceChoices",raceName);
        if (!(raceName in race_lvl1)) {
            throw new Error(`Race '${raceName}' not found in race`);
        }
        console.log("getRaceChoices", race_lvl1[raceName]);
        if('choices' in race_lvl1[raceName]) {
            console.log(race_lvl1[raceName]['choices']);
            return race_lvl1[raceName]['choices']
        } else {
            console.log("not choices");
            return {}
        }
    } catch (error) {
        return []
    }
}

function getCaracteristics(raceName) {
    try {
        return Object.entries(getRace(raceName)[ENUM.CARACTERISTICS_KEY]).map(([key, value]) => new Quantity(key, value)) ;
    } catch (error) {
        console.error(error.message); 
        return []
    }
}

function getAttributes(raceName) {
    try {
        return Object.entries(getRace(raceName)[ENUM.ATTRIBUTES_KEY]).map(([key, value]) => new Quantity(key, value)) ;
    } catch (error) {
        console.error(error.message); 
        return []
    }
}

function getSkills(raceName) {
    try {
        return Object.entries(getRace(raceName)[ENUM.SKILLS_KEY]).map(([key, value]) => new Quantity(key, value)) ;
    } catch (error) {
        console.error(error.message); 
        return []
    }
}

function getTraits(raceName) {
    try {
        return Object.values(getRace(raceName)[ENUM.TRAITS_KEY]).map(trait => new Element(trait)) ;
    } catch (error) {
        console.error(error.message); 
        return []
    }
}

function getLanguages(raceName) {
    try {
        return Object.values(getRace(raceName)[ENUM.LANGUAGES_KEY]).map(language => new Element(language)) ;
    } catch (error) {
        console.error(error.message); 
        return []
    }
}

export function getRaceChoicesBlankedByRaceId(id) {
    let race = getRace(id);
    console.log("getRaceChoicesBlankedByRaceId", race);
    let blankedChoices = {}
    for (let k in race.choices) {
        for (let j in race.choices[k]) {
            blankedChoices[`${k}-${j}`] = []
        }
    }
    console.log("getRaceChoicesBlankedByRaceId", blankedChoices);
    return blankedChoices;
}

export default {
    getRace,
    getRaceChoices,
    getCaracteristics,
    getAttributes,
    getSkills,
    getTraits,
    getLanguages,
}

export const RACES_PROTOTYPE = Race.fromJson(racesDatas);