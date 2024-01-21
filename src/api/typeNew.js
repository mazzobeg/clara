import { MODE } from '@/store/module/utils.js'

export class Element {
    constructor(name) {
        this.name = name;
    }
}

export class Quantity {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

export class Choice {
    constructor(id, values, number) {
        this.id = id;
        this.values = values;
        this.number = number;
    }
}

export class Choices {
    /**
     * 
     * @param {Choice[]} skills 
     * @param {Choice[]} items 
     * @param {Choice[]} subClass 
     * @param {Choice[]} languages 
     */
    constructor(skills, items, subClass, languages, subRace) {
        this.skills = skills;
        this.items = items;
        this.subClass = subClass;
        this.languages = languages;
        this.subRace = subRace;
    }

    getBlanked() {
        return new Choices(
            this.skills.map(s => new Choice(s.id, [], s.number)),
            this.items.map(s => new Choice(s.id, [], s.number)),
            this.subClass.map(s => new Choice(s.id, [], s.number)),
            this.languages.map(s => new Choice(s.id, [], s.number)),
            this.subRace.map(s => new Choice(s.id, [], s.number))
        );
    }

    digest(context, mode) {
        for (let p in this) {
            for (let sp in this[p]) {
                const values = this[p][sp].values
                if (values.length > 0 && values[0] instanceof Element) {
                    if (mode === MODE.ADD)
                        context.commit('characterState/addElements', { property: p, items: values }, { root: true })
                    else if (mode === MODE.SUB)
                        context.commit('characterState/subElements', { property: p, items: values }, { root: true })
                }
                if (values.length > 0 && values[0] instanceof Quantity) {
                    if (mode === MODE.ADD)
                        context.commit('characterState/addQuantities', { property: p, items: values }, { root: true })
                    else if (mode === MODE.SUB)
                        context.commit('characterState/subQuantities', { property: p, items: values }, { root: true })
                }
                if (values.length > 0 && values[0] instanceof MetaChoice) {
                    if (mode === MODE.ADD)
                        values.forEach(v => v.digest(context, MODE.ADD))
                    else if (mode === MODE.SUB)
                        values.forEach(v => v.digest(context, MODE.SUB))
                }
            }
        }
    }

    static fromJson(json) {
        const skills = 'skills' in json ? json.skills.map(s => new Choice(s.id, s.values.map(v => new Quantity(v.name, v.quantity)), s.number)) : []
        const items = 'items' in json ? json.items.map(s => new Choice(s.id, s.values.map(v => new Element(v.name)), s.number)) : []
        const subClass = 'subClass' in json ? json.subClass.map(s => new Choice(s.id, s.values.map(v => new Element(v.name)), s.number)) : []
        const languages = 'languages' in json ? json.languages.map(s => new Choice(s.id, s.values.map(v => new Element(v.name)), s.number)) : []
        const subRace = 'subRace' in json ? json.subRace.map(s => new Choice(s.id, s.values.map(v => SubRace.fromJson(v)), s.number)) : []
        return new Choices(
            skills, items, subClass, languages, subRace
        );
    }
}

// const digestMetachoice = (context, metachoice, mode) => {
//     for (let p in metachoice) {
//         if (metachoice[p] instanceof Element) {
//             if (mode === MODE.ADD) 
//                 context.commit('characterState/addElements', {property: p, items: [metachoice[p]]}, {root: true})
//             else if (mode === MODE.SUB)
//                 context.commit('characterState/subElements', {property: p, items: [metachoice[p]]}, {root: true})
//         }
//         if (metachoice[p] instanceof Quantity) {
//             if (mode === MODE.ADD) 
//                 context.commit('characterState/addQuantities', {property: p, items: [metachoice[p]]}, {root: true})
//             else if (mode === MODE.SUB)
//                 context.commit('characterState/subQuantities', {property: p, items: [metachoice[p]]}, {root: true})
//         }
//         if (Array.isArray(metachoice[p] ) && metachoice[p].length > 0 && metachoice[p][0] instanceof Element) {
//             if (mode === MODE.ADD) 
//                 context.commit('characterState/addElements', {property: p, items: metachoice[p]}, {root: true})
//             else if (mode === MODE.SUB)
//                 context.commit('characterState/subElements', {property: p, items: metachoice[p]}, {root: true})
//         }
//         if (Array.isArray(metachoice[p]) && metachoice[p].length > 0 && metachoice[p][0] instanceof Quantity) {
//             if (mode === MODE.ADD) 
//                 context.commit('characterState/addQuantities', {property: p, items: metachoice[p]}, {root: true})
//             else if (mode === MODE.SUB)
//                 context.commit('characterState/subQuantities', {property: p, items: metachoice[p]}, {root: true})
//         }
//     }
// }

// const digestMetachoiceChoices = (context, metachoiceChoices, mode) => {
//     for (let p in metachoiceChoices) {
//         for (let sp in metachoiceChoices[p]) {
//             const values = metachoiceChoices[p][sp].values
//             if (values.length > 0 && values[0] instanceof Element) {
//                 if (mode === MODE.ADD) 
//                     context.commit('characterState/addElements', {property: p, items: values}, {root: true})
//                 else if (mode === MODE.SUB)
//                     context.commit('characterState/subElements', {property: p, items: values}, {root: true})
//             }
//             if (values.length > 0 && values[0] instanceof Quantity) {
//                 if (mode === MODE.ADD) 
//                     context.commit('characterState/addQuantities', {property: p, items: values}, {root: true})
//                 else if (mode === MODE.SUB)
//                     context.commit('characterState/subQuantities', {property: p, items: values}, {root: true})
//             }
//         }
//     }
// }

class MetaChoice {
    /**
     * 
     * @param {string} name 
     * @param {Quantity[]} attributes 
     * @param {Element[]} masterings 
     * @param {Element[]} saves 
     * @param {Element[]} features 
     * @param {Element[]} items
     * @param {Quantity[]} skills
     * @param {Choices} choices 
     */
    constructor(key, name, attributes, masterings, saves, features, items, skills, choices, abilities, spells) {
        this.key = key;
        this.name = name;
        this.attributes = attributes;
        this.masterings = masterings;
        this.saves = saves;
        this.features = features;
        this.items = items;
        this.skills = skills;
        this.choices = choices;
        this.abilities = abilities;
        this.spells = spells;
    }

    digest(context, mode) {
        for (let p in this) {
            if (this[p] instanceof Element) {
                if (mode === MODE.ADD)
                    context.commit('characterState/addElements', { property: p, items: [this[p]] }, { root: true })
                else if (mode === MODE.SUB)
                    context.commit('characterState/subElements', { property: p, items: [this[p]] }, { root: true })
            }
            if (this[p] instanceof Quantity) {
                if (mode === MODE.ADD)
                    context.commit('characterState/addQuantities', { property: p, items: [this[p]] }, { root: true })
                else if (mode === MODE.SUB)
                    context.commit('characterState/subQuantities', { property: p, items: [this[p]] }, { root: true })
            }
            if (Array.isArray(this[p]) && this[p].length > 0 && this[p][0] instanceof Element) {
                if (mode === MODE.ADD)
                    context.commit('characterState/addElements', { property: p, items: this[p] }, { root: true })
                else if (mode === MODE.SUB)
                    context.commit('characterState/subElements', { property: p, items: this[p] }, { root: true })
            }
            if (Array.isArray(this[p]) && this[p].length > 0 && this[p][0] instanceof Quantity) {
                if (mode === MODE.ADD)
                    context.commit('characterState/addQuantities', { property: p, items: this[p] }, { root: true })
                else if (mode === MODE.SUB)
                    context.commit('characterState/subQuantities', { property: p, items: this[p] }, { root: true })
            }
        }
    }

    static fromJson(json, type) {
        const attributes = 'attributes' in json ? json.attributes.map(a => new Quantity(a.name, a.quantity)) : []
        const masterings = 'masterings' in json ? json.masterings.map(m => new Element(m.name)) : []
        const saves = 'saves' in json ? json.saves.map(s => new Element(s.name)) : []
        const features = 'features' in json ? json.features.map(f => new Element(f.name)) : []
        const items = 'items' in json ? json.items.map(i => new Element(i.name)) : []
        const skills = 'skills' in json ? json.skills.map(i => new Quantity(i.name, i.quantity)) : []
        const choices = 'choices' in json ? Choices.fromJson(json.choices) : new Choices([], [], [], [])
        const abilities = 'abilities' in json ? json.abilities.map(a => new Quantity(a.name, a.quantity)) : []
        const spells = 'spells' in json ? json.spells.map(s => new Element(s.name)) : []
        return Object.assign(new type(), {
            key: json.key,
            name: json.name,
            attributes,
            masterings,
            saves,
            features,
            items,
            skills,
            choices,
            abilities,
            spells
        });
    }
}

export class Background extends MetaChoice {
    /**
     * @returns {Background[]}
     */
    static fromJson(json) {
        return MetaChoice.fromJson(json, Background);
    }
}
export class Class extends MetaChoice {
    static fromJson(json) {
        return MetaChoice.fromJson(json, Class);
    }
}
export class Race extends MetaChoice {
    static fromJson(json) {
        return MetaChoice.fromJson(json, Race);
    }
}

export class SubRace extends MetaChoice {
    static fromJson(json) {
        return MetaChoice.fromJson(json, Race);
    }
}

export class MetaChoices {
    /**
     * 
     * @param {MetaChoice[]} elements 
     */
    constructor(elements) {
        this.elements = elements;
    }

    static fromJson(json, type) {
        return new MetaChoices(json.elements.map(c => type.fromJson(c)));
    }
}

export class Backgrounds extends MetaChoices {
    static fromJson(json) {
        return MetaChoices.fromJson(json, Background);
    }
}

export class Classes extends MetaChoices {
    static fromJson(json) {
        return MetaChoices.fromJson(json, Class);
    }
}

export class Races extends MetaChoices {
    static fromJson(json) {
        return MetaChoices.fromJson(json, Race);
    }
}

export class SubRaces extends MetaChoices {
    static fromJson(json) {
        return MetaChoices.fromJson(json, SubRace);
    }
}

export class Form3 {
    /**
     * @param {string} mode
     * @param {object} results
     * @param {object} map
     */
    constructor(mode, results, map) {
        this.mode = mode
        this.results = results
        this.map = map
    }
}