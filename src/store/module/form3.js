import {Form3, Quantity} from '@/api/typeNew';
import ENUM from '@/api/enum';

import Cookies from 'js-cookie'

const state = () => {
    let form3 = Cookies.get('characterForm3') ? JSON.parse(Cookies.get('characterForm3')) : new Form3('', []);
    return {
        'form3' : form3,
    };
}

const getters = {
    form3: (state) => state.form3,
}

const mutations = {
    setForm3: (state, form3) => {
        state.form3 = form3;
        Cookies.set('characterForm3', JSON.stringify(state.form3));
    },
}

const actions = {
    updateForm3: (context, form3) => {
        // remove previous quantities from chararacterState
        const preForm3 = context.getters['form3'];
        console.log("updateForm3", preForm3, form3);

        const preResults = {
            property : ENUM.CARACTERISTICS_KEY,
            items : Object.entries(preForm3.results).map(([key,value]) => new Quantity(key, value))
        }
        context.commit('characterState/subQuantities', preResults, { root: true });
        // add new quantities to characterState
        const newResults = {
            property : ENUM.CARACTERISTICS_KEY,
            items : Object.entries(form3.results).map(([key,value]) => new Quantity(key, value))
        }
        context.commit('characterState/addQuantities', newResults, { root: true });
        context.commit('setForm3', form3);
        console.log("updateForm3", newResults, preResults);

    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}