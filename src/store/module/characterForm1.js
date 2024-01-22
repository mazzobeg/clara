import Cookies from 'js-cookie'

const state = () => {
    let character = Cookies.get('characterForm1') ? JSON.parse(Cookies.get('characterForm1')) : { characterName: '', playerName: '', alignment: '' };
    return {
        characterName : character.characterName,
        playerName: character.playerName,
        alignment: character.alignment,
    };
}

const getters = {
    characterName : (state) => state.characterName,
    playerName : (state) => state.playerName,
    alignment : (state) => state.alignment,
}

const mutations = {
    setCharacterName(state, name) {
        state.characterName = name,
        Cookies.set('characterForm1', JSON.stringify(state));
    },
    setPlayerName(state, name) {
        state.playerName = name,
        Cookies.set('characterForm1', JSON.stringify(state));
    },
    setAlignment(state, alignment) {
        state.alignment = alignment,
        Cookies.set('characterForm1', JSON.stringify(state));
    },
}

export default {
    namespaced: true,
    state,
    getters, 
    mutations
}