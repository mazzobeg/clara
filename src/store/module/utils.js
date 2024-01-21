import ENUM from '@/api/enum'
import { Element, Quantity } from '@/api/type'
/* eslint-disable no-unused-vars */
import { Choices } from '@/api/typeNew'

export function converter(choices) {
    const convertedValues = {
        [ENUM.LANGUAGES_KEY]: Element,
        [ENUM.ITEMS_KEY]: Element,
        [ENUM.SKILLS_KEY]: Element,
        [ENUM.SPELLS_KEY]: Element,
        [ENUM.TRAITS_KEY]: Element,
    }
    const convetedChoices = {}
    for (let choice in choices) {
        choices[choice].forEach(value => {
            const associatedClass = convertedValues[choice.split('-')[0]]
            if (!convetedChoices[choice]) {
                convetedChoices[choice] = []
            }
            if (associatedClass === Element) {
                convetedChoices[choice].push(new Element(value))
            } else if (associatedClass === Quantity) {
                convetedChoices[choice].push(new Quantity(value, 1))
            }
        })
    }
    return convetedChoices;
}

export const MODE = {
    ADD: "add", SUB: "sub"
}

/**
 * 
 * @param {*} context 
 * @param {Choices} convertedChoices 
 * @param {*} mode 
 */
export function applyChoices(context, convertedChoices, mode) {
    // for (let choice in convertedChoices) {
    //     if (convertedChoices[choice].length > 0) {
    //         if (convertedChoices[choice][0] instanceof Element) {
    //             let storeRoot;
    //             if (mode === MODE.SUB) {    
    //                 storeRoot = 'characterState/subElements'
    //             } else if (mode === MODE.ADD) {
    //                 storeRoot = 'characterState/addElements'
    //             }
    //             context.commit(storeRoot, 
    //             {property: choice.split('-')[0], items: convertedChoices[choice]}, 
    //             {root: true})
    //         } else if (convertedChoices[choice][0] instanceof Quantity) {
    //             let storeRoot;
    //             if (mode === MODE.SUB) {    
    //                 storeRoot = 'characterState/subQuantities'
    //             } else if (mode === MODE.ADD) {
    //                 storeRoot = 'characterState/addQuantities'
    //             }
    //             context.commit(storeRoot, 
    //             {property: choice.split('-')[0], items: convertedChoices[choice]}, 
    //             {root: true})
    //         }   
    //     }
    // }

    for (let choice in convertedChoices) {
        convertedChoices[choice].forEach(value => {
            if (value.values.length > 0) {
                if (value.values[0] instanceof Element) {
                    let storeRoot;
                    if (mode === MODE.SUB) {
                        storeRoot = 'characterState/subElements'
                    } else if (mode === MODE.ADD) {
                        storeRoot = 'characterState/addElements'
                    }
                    context.commit(storeRoot,
                        { property: choice, items: convertedChoices[choice] },
                        { root: true })
                } else if (value.values[0] instanceof Quantity) {
                    let storeRoot;
                    if (mode === MODE.SUB) {
                        storeRoot = 'characterState/subQuantities'
                    } else if (mode === MODE.ADD) {
                        storeRoot = 'characterState/addQuantities'
                    }
                    context.commit(storeRoot,
                        { property: choice, items: convertedChoices[choice] },
                        { root: true })
                }
            }
        })
    }
}
