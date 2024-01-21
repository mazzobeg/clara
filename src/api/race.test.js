import raceModule from "@/api/race.js";
import { Quantity, Element } from "@/api/type.js"

describe('getCaracteristics', () => {
  it('should return an array of Quantity objects', () => {
    const raceName = 'Elfe';
    const expected = [
      new Quantity('dexterite', 2),
    ];       

    const result = raceModule.getCaracteristics(raceName);

    expect(result).toEqual(expected);
  });
  it('should return an empty array if raceName is not found', () => {
    const raceName = 'NonexistentRace';
    const expected = [];

    const result = raceModule.getCaracteristics(raceName);

    expect(result).toEqual(expected);
  });
});

describe('getAttributes', () => {
  it('should return an array of Quantity objects', () => {
    const raceName = 'Elfe';
    const expected = [
      new Quantity('speed', 9),
    ];       

    const result = raceModule.getAttributes(raceName);

    expect(result).toEqual(expected);
  });

  it('should return an empty array if raceName is not found', () => {
    const raceName = 'NonexistentRace';
    const expected = [];

    const result = raceModule.getAttributes(raceName);

    expect(result).toEqual(expected);
  });
});

describe('getSkills', () => {
  it('should return an array of Quantity objects', () => {
    const raceName = 'Elfe';
    const expected = [
      new Quantity('perception', 1),
    ];

    const result = raceModule.getSkills(raceName);

    expect(result).toEqual(expected);
  });

  it('should return an empty array if raceName is not found', () => {
    const raceName = 'NonexistentRace';
    const expected = [];

    const result = raceModule.getSkills(raceName);

    expect(result).toEqual(expected);
  });
});

describe('getTraits', () => {
  it('should return an array of Element objects', () => {
    const raceName = 'Elfe';
    const expected = [
      new Element("Vision dans le noir"),
      new Element("Ascendance féerique"),
      new Element("Transe"),
    ];       

    const result = raceModule.getTraits(raceName);

    expect(result).toEqual(expected);
  });

  it('should return an empty array if raceName is not found', () => {
    const raceName = 'NonexistentRace';
    const expected = [];

    const result = raceModule.getTraits(raceName);

    expect(result).toEqual(expected);
  });
});

describe('getLanguages', () => {
  it('should return an array of Element objects', () => {
    const raceName = 'Elfe';
    const expected = [
      new Element('Commun'),
      new Element('Elfe'),
    ];

    const result = raceModule.getLanguages(raceName);

    expect(result).toEqual(expected);
  });

  it('should return an empty array if raceName is not found', () => {
    const raceName = 'NonexistentRace';
    const expected = [];

    const result = raceModule.getLanguages(raceName);

    expect(result).toEqual(expected);
  });
});