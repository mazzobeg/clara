const state = () => ({  
    choices : {
    }
})

const getters = {
    choices: (state) => state.choices,
}

const mutations = {
    setChoices: (state, choices) => {
        console.log("Mutation setChoices");
        state.choices = choices;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}