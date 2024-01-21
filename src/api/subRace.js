import subRacesDatas from '@/assets/subRace.json'
import ENUM from '@/api/enum.js'
import { Quantity, Element } from '@/api/type.js'

function getSubRace(subRaceName) {
    const subRaces = Object.values(subRacesDatas).map((value) => value).reduce((acc, curr) => {return {...acc, ...curr}}, {});    
    if (!(subRaceName in subRaces)) {
        throw new Error(`SubRace '${subRaceName}' not found in subRace`);
    }
    return subRaces[subRaceName];
}

function getCaracteristics(subRaceName) {
    try {
        return Object.entries(getSubRace(subRaceName)[ENUM.CARACTERISTICS_KEY]).map(([key, value]) => new Quantity(key, value)) ;
    } catch (error) {
        console.error(error.message);
        return []
    }
}

function getSpells(subRaceName) {
    try {
        return Object.values(getSubRace(subRaceName)[ENUM.SPELLS_KEY]).map((value) => new Element(value)) ;
    } catch (error) {
        console.error(error.message);
        return []
    }
}

function getMaitrises(subRaceName) {
    try {
        return Object.values(getSubRace(subRaceName)[ENUM.MAITRISES_KEY]).map((value) => new Element(value)) ;
    } catch (error) {
        console.error(error.message);
        return []
    }
}

function getTraits(subRaceName) {
    try {
        return Object.values(getSubRace(subRaceName)[ENUM.TRAITS_KEY]).map((value) => new Element(value)) ;
    } catch (error) {
        console.error(error.message);
        return []
    }
}   

export default {
    getSubRace,
    getCaracteristics,
    getMaitrises,
    getSpells,
    getTraits
}