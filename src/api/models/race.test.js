import { PROTOTYPE } from "./race";

describe("Background", () => {
    test("PROTOTYPE should not be empty", () => {
        expect(PROTOTYPE).not.toBeNull();
        expect(PROTOTYPE).not.toBeUndefined();
        expect(PROTOTYPE).not.toBe("");
        expect(PROTOTYPE).not.toEqual({});
        expect(PROTOTYPE).not.toEqual([]);
    });
});