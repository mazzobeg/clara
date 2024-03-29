/* eslint-disable no-unused-vars */
import {Element, Quantity} from "@/api/type.js"
import ENUM from "@/api/enum.js";

import Cookies from 'js-cookie'

const state = () => {  
    let characterState = Cookies.get('characterState') ? JSON.parse(Cookies.get('characterState')) : {
        [ENUM.CARACTERISTICS_KEY] : {
            [ENUM.CARACTERISTICS.FOR]: 0,
            [ENUM.CARACTERISTICS.DEX] : 0,
            [ENUM.CARACTERISTICS.CON] : 0,
            [ENUM.CARACTERISTICS.INT] : 0,
            [ENUM.CARACTERISTICS.SAG] : 0,
            [ENUM.CARACTERISTICS.CHA] : 0
        },
        [ENUM.SKILLS_KEY] : {
            [ENUM.SKILLS.ACROBATICS] : 0,
            [ENUM.SKILLS.ANIMAL_HANDLING] : 0,
            [ENUM.SKILLS.ARCANA] : 0,
            [ENUM.SKILLS.ATHLETICS] : 0,
            [ENUM.SKILLS.DECEPTION] : 0,
            [ENUM.SKILLS.HISTORY] : 0,
            [ENUM.SKILLS.INSIGHT] : 0,
            [ENUM.SKILLS.INTIMIDATION] : 0,
            [ENUM.SKILLS.INVESTIGATION] : 0,
            [ENUM.SKILLS.MEDICINE] : 0,
            [ENUM.SKILLS.NATURE] : 0,
            [ENUM.SKILLS.PERCEPTION] : 0,
            [ENUM.SKILLS.PERFORMANCE] : 0,
            [ENUM.SKILLS.PERSUASION] : 0,
            [ENUM.SKILLS.RELIGION] : 0,
            [ENUM.SKILLS.SLEIGHT_OF_HAND] : 0,
            [ENUM.SKILLS.STEALTH] : 0,
            [ENUM.SKILLS.SURVIVAL] : 0,
        },
        [ENUM.ATTRIBUTES_KEY] : {
            [ENUM.ATTRIBUTES_KEYS.CA] : 0,
            [ENUM.ATTRIBUTES_KEYS.INIT]: 0,
            [ENUM.ATTRIBUTES_KEYS.SPEED] : 0,
            [ENUM.ATTRIBUTES_KEYS.LIFE] : 0,
            [ENUM.ATTRIBUTES_KEYS.TEMP_LIFE] : 0,
            [ENUM.ATTRIBUTES_KEYS.LIFE_DICE] : 0,
            [ENUM.ATTRIBUTES_KEYS.BONUS_MAITRISE] : 0,
        },
        [ENUM.ITEMS_KEY] : [],
        [ENUM.SPELLS_KEY] : [],
        [ENUM.TRAITS_KEY] : [],
        [ENUM.MAITRISES_KEY] : [],
        [ENUM.SAVE_KEY] : [],
        [ENUM.LANGUAGES_KEY] : [],
        "sub_class" : [],
        "step" : 0
    };
    return characterState;
}

const getters = {
    state : (state) => state,
    caracteristics : (state) => state[ENUM.CARACTERISTICS_KEY],
    skills : (state) => state[ENUM.SKILLS_KEY],
    attributs : (state) => state[ENUM.ATTRIBUTES_KEY],
    items : (state) => state.items,
    spells : (state) => state.spells,
    capacities : (state) => state[ENUM.TRAITS_KEY],
    maitrises : (state) => state.maitrises,
    sauvegardes : (state) => state.sauvegardes,
    languages : (state) => state.languages,
    step : (state) => state.step,
}

const mutations = {
    /**
     * @param {Quantity[]} quantities
     */
    addQuantities(state, payload) {
        if (!(payload.property in state)) {
            console.error(payload.property, "not in state");
            return;
        }
        console.log("addQuantities", payload.property, payload.items);
        payload.items.forEach(quantity => {
            state[payload.property][quantity.name] += quantity.quantity
        })
        Cookies.set('characterState', JSON.stringify(state));
    },
    /**
     * @param {Quantity[]} quantities
     */
    subQuantities(state, payload) {
        if (!(payload.property in state)) {
            console.error(payload.property, "not in state");
            return;
        }
        console.log("subQuantities", payload.property, payload.items);
        payload.items.forEach(quantity => {
            state[payload.property][quantity.name] -= quantity.quantity
        })
        Cookies.set('characterState', JSON.stringify(state));
    },
    /**
     * @param {Element[]} elements
     */
    addElements(state, payload) {
        if (!(payload.property in state)) {
            console.error(payload.property, "not in state");
            return;
        }
        if (!Array.isArray(state[payload.property])) {
            console.error(payload.property, "is not an array");
            return;
        }
        console.log("addElements", payload.property, payload.items);
        payload.items.forEach(element => {
            state[payload.property].push(element.name)
        })
        Cookies.set('characterState', JSON.stringify(state));
    },
    /**
     * @param {Element[]} elements
     */
    subElements(state, payload) {
        if (!(payload.property in state)) {
            console.error(payload.property, "not in state");
            return;
        }
        if (!Array.isArray(state[payload.property])) {
            console.error(payload.property, "is not an array");
            return;
        }
        payload.items.forEach(element => {
            state[payload.property].splice(state[payload.property].indexOf(element.name), 1)
        })
        Cookies.set('characterState', JSON.stringify(state));
    },
    setStep(state, step) {
        state.step = step;
        Cookies.set('characterState', JSON.stringify(state));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations, 
}