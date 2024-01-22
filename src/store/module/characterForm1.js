const state = () => ({
    characterName : 'John Doe',
    playerName : 'John Doe',
})

const getters = {
    characterName : (state) => state.characterName,
    playerName : (state) => state.playerName
}

const mutations = {
    setCharacterName(state, name) {
        state.characterName = name
    },
    setPlayerName(state, name) {
        state.playerName = name
    }
}

export default {
    namespaced: true,
    state,
    getters, 
    mutations
}