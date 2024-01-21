import { getSkillLabels } from "./utils";
import ENUM from "@/api/enum";

describe("getSkillLabels", () => {
  it("should return skill labels with ☆ for skillsMap value of 1", () => {
    // Arrange
    const skillsMap = {
        [ENUM.SKILLS.ACROBATICS]: 0,
        [ENUM.SKILLS.ANIMAL_HANDLING]: 1,
        [ENUM.SKILLS.ARCANA]: 2
    };

    const abilitiesMap = {
        [ENUM.CARACTERISTICS.DEX] : 10,
        [ENUM.CARACTERISTICS.SAG] : 12,
        [ENUM.CARACTERISTICS.INT] : 14,
        [ENUM.CARACTERISTICS.FOR] : 16,
        [ENUM.CARACTERISTICS.CHA] : 18,
    };

    const bonusMaitrise = 5;

    // Act
    const result = getSkillLabels(skillsMap, abilitiesMap, bonusMaitrise);

    // Assert
    expect(result).toEqual({
        [ENUM.SKILLS.ACROBATICS]: "(0)",
        [ENUM.SKILLS.ANIMAL_HANDLING]: "☆ (6)",
        [ENUM.SKILLS.ARCANA]: "★ (12)"
    });
  });
});