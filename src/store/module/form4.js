import { PROTOTYPE } from '@/api/models/background'
import { MODE } from './utils'
import { Background, Choices } from '@/api/typeNew'

import Cookies from 'js-cookie'

const state = () => {
    let characterForm4 = Cookies.get('characterForm4') ? JSON.parse(Cookies.get('characterForm4')) : {
        historicChoices: {
            name: 'default',
            choices: {}
        }
    }
    return {
        historicChoices: characterForm4.historicChoices
    }
} 

const getters = {
    historicChoices: (state) => state.historicChoices,
    choices: (state) => state.historicChoices.choices,
    name: (state) => state.historicChoices.name,
}

const mutations = {
    setHistoricChoicesName: (state, name) => {
        state.historicChoices.name = name;
        Cookies.set('characterForm4', JSON.stringify(state));
    },
    setHistoricChoicesChoice: (state, historicChoices) => {
        state.historicChoices.choices = historicChoices;
        Cookies.set('characterForm4', JSON.stringify(state));
    },
}

const actions = {
    updateHistoric: (context, background) => {
        const bgProto = PROTOTYPE
        const preBg = bgProto.find(bg => bg.key === context.getters['name'])
        console.log("UPDATEHISTORIC", preBg);
        const bg = bgProto.find(bg => bg.key === background)
        preBg instanceof Background ? preBg.digest(context, MODE.SUB) : null
        bg instanceof Background ? bg.digest(context, MODE.ADD) : null
        context.commit('setHistoricChoicesName', background);
        console.log(background);
        if (background != 'default') {
            const blankedChoices = bg.choices.getBlanked()
            context.dispatch('updateHistoricChoices', blankedChoices)
        } else {
            context.dispatch('updateHistoricChoices', {})
        }
    },
    updateHistoricChoices: (context, choices) => {
        context.getters['choices'] instanceof Choices ? context.getters['choices'].digest(context, MODE.SUB) : null
        choices instanceof Choices ? choices.digest(context, MODE.ADD) : null
        context.commit('setHistoricChoicesChoice', choices);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}