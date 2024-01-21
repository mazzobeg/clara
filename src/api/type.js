class Quantity {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

class Element {
    constructor(name) {
        this.name = name;
    }
}

class MethodAndMutations {
    constructor(method, property, subMutation, addMutation) {
        this.method = method;
        this.property = property;
        this.subMutation = subMutation;
        this.addMutation = addMutation;
    }
}

class Choice {
    constructor(type, index, values) {
        this.type = type;
        this.index = index,
        this.values = values;
    }

}

export {
    Quantity,
    Element,
    MethodAndMutations,
    Choice,
}