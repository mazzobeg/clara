const state = () => ({
    characterName : '',
    playerName : '',
    alignment : '',
})

const getters = {
    characterName : (state) => state.characterName,
    playerName : (state) => state.playerName,
    alignment : (state) => state.alignment,
}

const mutations = {
    setCharacterName(state, name) {
        state.characterName = name
    },
    setPlayerName(state, name) {
        state.playerName = name
    },
    setAlignment(state, alignment) {
        state.alignment = alignment
    },
}

export default {
    namespaced: true,
    state,
    getters, 
    mutations
}