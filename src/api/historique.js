import datas from '@/assets/historique.json'
import datas2 from '@/assets/historique2.json'

import { Background } from '@/api/typeNew.js'

export function getHistoriques() {
    return datas;
}

function getHistoriqueById(id) {
    return getHistoriques()[id];
}

export function getHistoriqueChoicesById(id) {
    return getHistoriqueById(id).choices;
}

export function getHistoriqueIdByName(name) {
    let historique = Object.entries(getHistoriques()).find(historique => {
        return historique[1].name == name
    })
    return historique[0]
}

export function getHistoriqueChoicesBlankedByHistoriqueId(id) {
    let historique = getHistoriqueById(id);
    let blankedChoices = {}
    for (let k in historique.choices) {
        for (let j in historique.choices[k]) {
            blankedChoices[`${k}-${j}`] = []
        }
    }
    return blankedChoices;
}

export const BACKGROUND_PROTOTYPE = Background.fromJson(datas2);