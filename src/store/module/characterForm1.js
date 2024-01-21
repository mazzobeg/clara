const state = () => ({
    characterName : 'John Doe'
})

const getters = {
    characterName : (state) => state.characterName
}

const mutations = {
    setCharacterName(state, name) {
        state.characterName = name
    }
}

export default {
    namespaced: true,
    state,
    getters, 
    mutations
}