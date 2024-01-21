import { Quantity, Element } from "@/api/type";
import characterState from "./characterState";

describe("addElements", () => {
  it("should add elements to an empty state property", () => {
    // Arrange
    const state = {
      property: []
    };
    const property = "property";
    const elements = [new Element(4), new Element(5), new Element(6)]
    const payload = {
      property : property,
      items : elements
    }
    // Act
    characterState.mutations.addElements(state, payload);

    // Assert
    expect(state.property).toEqual([4, 5, 6]);
  });

  it("should add elements to a non-empty state property", () => {
    // Arrange
    const state = {
      property: [1, 2, 3]
    };
    const property = "property";
    const elements = [new Element(4), new Element(5), new Element(6)]
    const payload = {
      property: property,
      items: elements
    }

    // Act
    characterState.mutations.addElements(state, payload);

    // Assert
    expect(state.property).toEqual([1, 2, 3, 4, 5, 6]);
  });
}); 

describe("subQuantities", () => {
  it("should subtract quantities from an array state property", () => {
    // Arrange
    const state = {
      property: {a:10, b:20, c:30}
    };
    const property = "property";
    const quantities = [new Quantity("a", 4), new Quantity("b", 5), new Quantity("c", 6)];
    const payload = {
      property: property,
      items: quantities
    }

    // Act
    characterState.mutations.subQuantities(state, payload);

    // Assert
    expect(state.property).toEqual({a:6, b:15, c:24});
  });

  it("should subtract quantities from a dictionary state property", () => {
    // Arrange
    const state = {
      property: {
        a: 10,
        b: 20,
        c: 30
      }
    };
    const property = "property";
    const quantities = [new Quantity("a", 4), new Quantity("b", 5), new Quantity("c", 6)];
    const payload = {
      property: property,
      items: quantities
    }

    // Act
    characterState.mutations.subQuantities(state, payload);

    // Assert
    expect(state.property).toEqual({ a: 6, b: 15, c: 24 });
  });
});