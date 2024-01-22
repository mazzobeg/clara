import { PROTOTYPE as PROTOTYPE_RACES } from "@/api/models/race.js";
import { PROTOTYPE as PROTOTYPE_CLASSES } from "@/api/models/class.js";

import { Choices, Race, Class } from "@/api/typeNew";
import { MODE } from "@/store/module/utils";

import Cookies from 'js-cookie'

const state = () => {
    let form2 = Cookies.get('characterForm2') ? JSON.parse(Cookies.get('characterForm2')) : { raceState: { key: 'default', choices: {} }, classState: { key: 'default', choices: [] } };
    return {
        raceState : form2.raceState,
        classState : form2.classState,
    };
}

const getters = {
    raceState : (state) => state.raceState,
    classState : (state) => state.classState,
}

const mutations = {
    setRaceStateKey: (state, key) => {
        state.raceState.key = key;
        Cookies.set('characterForm2', JSON.stringify(state));
    },
    setRaceStateChoices: (state, choices) => {
        state.raceState.choices = choices;
        Cookies.set('characterForm2', JSON.stringify(state));
    },
    setClassStateKey: (state, key) => {
        state.classState.key = key;
        Cookies.set('characterForm2', JSON.stringify(state));
    },
    setClassStateChoices: (state, choices) => {
        state.classState.choices = choices;
        Cookies.set('characterForm2', JSON.stringify(state));
    },
}

const actions = {
    updateRace: (context, newKey) => {
        /* COPY INST : Adapt following part */
        const PROTOTYPE = PROTOTYPE_RACES
        const preKey = context.getters['raceState'].key
        const rootSetKey = 'setRaceStateKey'
        const rootUpdateChoices = 'updateRaceChoices'
        
        const preP = PROTOTYPE.find(bg => bg.key === preKey)
        const newP = PROTOTYPE.find(bg => bg.key === newKey)

        /* COPY INST : Change class */
        preP instanceof Race ? preP.digest(context, MODE.SUB) : null
        newP instanceof Race ? newP.digest(context, MODE.ADD) : null
        context.commit(rootSetKey, newKey);
        
        if (newKey != 'default') {
            const blankedChoices = newP.choices.getBlanked()
            context.dispatch(rootUpdateChoices, blankedChoices)
        } else {
            context.dispatch(rootUpdateChoices, {})
        }
    },
    updateRaceChoices : (context, newC) => {
        /* COPY INST : Adapt following part */
        const rootGetState = 'raceState'
        const rootSetChoice = 'setRaceStateChoices'

        const preC = context.getters[rootGetState].choices
        preC instanceof Choices ? preC.digest(context, MODE.SUB) : null
        newC instanceof Choices ? newC.digest(context, MODE.ADD) : null
        context.commit(rootSetChoice, newC);
    },
    updateClass: (context, newKey) => {
        /* COPY INST : Adapt following part */
        const PROTOTYPE = PROTOTYPE_CLASSES
        const preKey = context.getters['classState'].key
        const rootSetKey = 'setClassStateKey'
        const rootUpdateChoices = 'updateClassChoices'
        
        const preP = PROTOTYPE.find(bg => bg.key === preKey)
        const newP = PROTOTYPE.find(bg => bg.key === newKey)

        /* COPY INST : Change class */
        preP instanceof Class ? preP.digest(context, MODE.SUB) : null
        newP instanceof Class ? newP.digest(context, MODE.ADD) : null
        context.commit(rootSetKey, newKey);
        
        if (newKey != 'default') {
            const blankedChoices = newP.choices.getBlanked()
            context.dispatch(rootUpdateChoices, blankedChoices)
        } else {
            context.dispatch(rootUpdateChoices, {})
        }
    },
    updateClassChoices: (context, newC) => {
        /* COPY INST : Adapt following part */
        const rootGetState = 'classState'
        const rootSetChoice = 'setClassStateChoices'

        const preC = context.getters[rootGetState].choices
        preC instanceof Choices ? preC.digest(context, MODE.SUB) : null
        newC instanceof Choices ? newC.digest(context, MODE.ADD) : null
        context.commit(rootSetChoice, newC);
    },        
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}