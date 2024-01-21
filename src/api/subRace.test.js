import subRaceModule from "@/api/subRace.js";
import { Quantity, Element } from "@/api/type.js"

describe("getCaracteristics", () => {
  it("should return an array of characteristics", () => {
    // Arrange
    const subRaceName = "Elfe des bois";

    const expectedResult = [new Quantity("sagesse", 1)]

    // Act
    const result = subRaceModule.getCaracteristics(subRaceName);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});

describe("getSpells", () => {
  it("should return an array of spells", () => {
    // Arrange
    const subRaceName = "Elfe des bois";

    const expectedResult = [new Element("Cachette naturelle")]

    // Act
    const result = subRaceModule.getSpells(subRaceName);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});

describe("getMaitrises", () => {
  it("should return an array of maitrises", () => {
    // Arrange
    const subRaceName = "Elfe des bois";

    const expectedResult = [new Element("Epée longue"), new Element("Epée courte"), new Element("Arc long"), new Element("Arc court")]

    // Act
    const result = subRaceModule.getMaitrises(subRaceName);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});

describe("getTraits", () => {
  it("should return an array of traits", () => {
    // Arrange
    const subRaceName = "Robuste";

    const expectedResult = [new Element("Résistance des robustes")]
    // Act
    const result = subRaceModule.getTraits(subRaceName);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});

describe("getSubRace", () => {
  it("should return the subrace object when a valid subrace name is provided", () => {
    // Arrange
    const subRaceName = "Elfe des bois";
    const expectedSubRace = {
      "caractériques": {
        "sagesse": 1
      },
      "sorts": [
        "Cachette naturelle"
      ],
      "maitrises": [
        "Epée longue",
        "Epée courte",
        "Arc long",
        "Arc court"
      ]
    };

    // Act
    const result = subRaceModule.getSubRace(subRaceName);

    // Assert
    expect(result).toEqual(expectedSubRace);
  });

  it("should throw an error when an invalid subrace name is provided", () => {
    // Arrange
    const subRaceName = "Invalid SubRace";

    // Act and Assert
    expect(() => {
      subRaceModule.getSubRace(subRaceName);
    }).toThrowError("SubRace 'Invalid SubRace' not found in subRace");
  });
});