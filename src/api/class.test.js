import classe from "@/api/class.js";
import { Element, Quantity } from "@/api/type.js";
import ENUM from "@/api/enum.js";

describe("getBonusMaitrises", () => {
    it("should return an array of Quantity objects with the bonus maitrises", () => {
        // Arrange
        const className = "barde";
        const expectedQuantities = [new Quantity(ENUM.ATTRIBUTES_KEYS.BONUS_MAITRISE, 2)];

        // Act
        const result = classe.getBonusMaitrises(className);

        // Assert
        expect(result).toEqual(expectedQuantities);
    });

    it("should return an empty array if the class name is not found", () => {
        // Arrange
        const className = "unknownClass";
        
        // Assert
        expect(classe.getBonusMaitrises(className)).toEqual([]);
    });
});

describe("getLifeDice", () => {
    it("should return an array of Quantity objects representing the life dice for a given class", () => {
        // Arrange
        const className = "barde";
        const expectedLifeDice = [new Quantity(ENUM.ATTRIBUTES_KEYS.LIFE_DICE, "1d8")];
        
        // Act
        const result = classe.getLifeDice(className);

        // Assert
        expect(result).toEqual(expectedLifeDice);
    });

    it("should return an empty array if the class name is not found", () => {
        // Arrange
        const className = "unknownClass";

        // Act & Assert
        expect(classe.getLifeDice(className)).toEqual([]);
    });
});

describe("getLife", () => {
    it("should return an array of Quantity objects representing the life points for a given class", () => {
        // Arrange
        const className = "barde";
        const expectedLife = [new Quantity(ENUM.ATTRIBUTES_KEYS.LIFE, 8)];

        // Act
        const result = classe.getLife(className);

        // Assert
        expect(result).toEqual(expectedLife);
    });

    it("should return an empty array if the class name is not found", () => {
        // Arrange
        const className = "unknownClass";

        // Act & Assert
        expect(classe.getLife(className)).toEqual([]);
    });
});

describe("getMaitrises", () => {
    it("should return an array of Element objects representing the maitrises for a given class", () => {
        // Arrange
        const className = "barde";
        //const expectedMaitrises = ["maitrise1", "maitrise2"];
        const expectedMaitrises = [new Element("Armure légère"), new Element("Armes courantes"), new Element("Arbalète de poing"), new Element("Epée longue"), new Element("Rapière")];

        // Act
        const result = classe.getMaitrises(className);

        // Assert
        expect(result).toEqual(expectedMaitrises);
    });

    it("should return an empty array if the class name is not found", () => {
        // Arrange
        const className = "unknownClass";

        // Act & Assert
        expect(classe.getMaitrises(className)).toEqual([]);
    });
});

describe("getSauvegarde", () => {
    it("should return an array of Element objects representing the sauvegarde for a given class", () => {
        // Arrange
        const className = "barde";
        const expectedSauvegarde = [new Element("Dextérité"), new Element("Charisme")];

        // Act
        const result = classe.getSauvegarde(className);

        // Assert
        expect(result).toEqual(expectedSauvegarde);
    });

    it("should return an empty array if the class name is not found", () => {
        // Arrange
        const className = "unknownClass";

        // Act & Assert
        expect(classe.getSauvegarde(className)).toEqual([]);
    });
});

describe("getCapacities", () => {
    it("should return an array of Element objects representing the capacities for a given class", () => {
        // Arrange
        const className = "barbare";
        const expectedCapacities = [new Element("Rage"), new Element("Défense sans armure")];

        // Act
        const result = classe.getCapacities(className);

        // Assert
        expect(result).toEqual(expectedCapacities);
    });

    it("should return an empty array if the class name is not found", () => {
        // Arrange
        const className = "unknownClass";

        // Act & Assert
        expect(classe.getCapacities(className)).toEqual([]);
    });
});

describe("getItems", () => {
    it("should return an array of Element objects representing the items for a given class", () => {
        // Arrange
        const className = "barde";
        const expectedItems = [new Element("Armure de cuire"), new Element("Dague")];

        // Act
        const result = classe.getItems(className);

        // Assert
        expect(result).toEqual(expectedItems);
    });

    it("should return an empty array if the class name is not found", () => {
        // Arrange
        const className = "unknownClass";

        // Act & Assert
        expect(classe.getItems(className)).toEqual([]);
    });
});