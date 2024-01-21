import { Element } from "@/api/type";
import { converter } from "./form4";

describe("converter", () => {
    it("should convert choices to converted choices", () => {
        // Arrange
        const choices = {
            "languages-1": ["English", "French"],
            "languages-2": ["English", "French"],
        };

        const expectedResult = {
            "languages-1": [new Element("English"), new Element("French")],
            "languages-2": [new Element("English"), new Element("French")],
        };

        // Act
        const convertedChoices = converter(choices);

        // Assert
        expect(convertedChoices).toEqual(expectedResult);
    });
});