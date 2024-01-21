import classe from '@/assets/classe.json'
import { Element, Quantity } from '@/api/type.js'
import ENUM from './enum';

function getClasse(classeName) {
    if (!(classeName in classe)) {
        throw new Error(`Classe '${classeName}' not found in classe`);
    }
    return classe[classeName];
}

function getClasseChoices(classeName) {
    if (!(classeName in classe)) {
        throw new Error(`Classe '${classeName}' not found in classe`);
    }
    const choices = classe[classeName]["choices"];
    return choices;
}

/**
 * Retrieves the life dice for a given class.
 * @param {string} className - The name of the class.
 * @returns {Array<Quantity>} - An array of Quantity objects representing the life dice.
 */
function getLifeDice(classeName) {
    try {
        return Array.of(getClasse(classeName)[ENUM.ATTRIBUTES_KEYS.LIFE_DICE]).map(dv => new Quantity(ENUM.ATTRIBUTES_KEYS.LIFE_DICE, dv)) ;
    } catch (error) {
        return []
    }
}

/**
 * Retrieves the life points of a given class.
 * @param {string} className - The name of the class.
 * @returns {Quantity[]} - An array of Quantity objects representing the life points.
 */
function getLife(classeName) {
    try {
        return Array.of(getClasse(classeName)[ENUM.ATTRIBUTES_KEYS.LIFE]).map(life => new Quantity(ENUM.ATTRIBUTES_KEYS.LIFE, life)) ;
    } catch (error) {
        return [];
    }
}

/**
 * Retrieves the maitrises (proficiencies) for a given class.
 * @param {string} classeName - The name of the class.
 * @returns {Array<Element>} - An array of Element objects representing the maitrises.
 */
function getMaitrises(classeName) {
    try {
        return Object.values(getClasse(classeName)["maitrise"]).map(maitrise => new Element(maitrise)) ;
    } catch (error) {
        return [];
    }
}

/**
 * Retrieves the bonus maitrises for a given class.
 * @param {string} classeName - The name of the class.
 * @returns {Quantity[]} - An array of Quantity objects representing the bonus maitrises.
 */
function getBonusMaitrises(classeName) {
    try {
        return Array.of(getClasse(classeName)[ENUM.ATTRIBUTES_KEYS.BONUS_MAITRISE]).map(bonusMaitrise => new Quantity(ENUM.ATTRIBUTES_KEYS.BONUS_MAITRISE, bonusMaitrise)) ;
    } catch (error) {
        return []
    }
}

/**
 * Retrieves the sauvegarde (saving throw) for a given class.
 * @param {string} classeName - The name of the class.
 * @returns {Element[]} - An array of Element objects representing the sauvegarde.
 */
function getSauvegarde(classeName) {
    try {
        return Object.values(getClasse(classeName)["sauvegarde"]).map(sauvegarde => new Element(sauvegarde)) ;
    } catch (error) {
        return []
    }
}

/**
 * Retrieves the capacities of a given class.
 *
 * @param {string} className - The name of the class.
 * @returns {Element[]} An array of Element objects representing the capacities of the class.
 */
function getCapacities(classeName) {
    try {
        return Object.values(getClasse(classeName)["capacités"]).map(capacity => new Element(capacity)) ;
    } catch (error) {
        return [];
    }
}

/**
 * Retrieves the items for a given class.
 * @param {string} className - The name of the class.
 * @returns {Element[]} An array of Element objects representing the items.
 */
function getItems(classeName) {
    try {
        return Object.values(getClasse(classeName)["équipement"]).map(item => new Element(item)) ; 
    } catch (error) {
        return []
    }
}

export function getClasseChoicesBlankedByClasseId(id) {
    let classe = getClasse(id);
    console.log("getClasseChoicesBlankedByClasseId", classe);
    let blankedChoices = {}
    for (let k in classe.choices) {
        for (let j in classe.choices[k]) {
            blankedChoices[`${k}-${j}`] = []
        }
    }
    console.log("getClasseChoicesBlankedByClasseId", blankedChoices);
    return blankedChoices;
}

export default {
    getClasse,
    getClasseChoices,
    getLifeDice,
    getLife,
    getMaitrises,
    getBonusMaitrises,
    getSauvegarde,
    getCapacities,
    getItems
}
