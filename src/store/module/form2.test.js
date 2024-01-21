import form2 from "./form2";
import classe from "@/api/class";

describe("updateClasse", () => {
    it("should update the class and character state", () => {
        // Arrange
        const context = {
            commit: jest.fn(),
            rootGetters: jest.fn(),
        };
        const classPayload = {
            previous: "barde",
            new: "barbare"
        };

        // Act
        form2.actions.updateClasse(context, classPayload);

        // Assert
        expect(context.commit).toHaveBeenCalledWith("characterState/subQuantities", { property: "attributs", items: classe.getLifeDice("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addQuantities", { property: "attributs", items: classe.getLifeDice("barbare") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/subElements", { property: "maitrises", items: classe.getMaitrises("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addElements", { property: "maitrises", items: classe.getMaitrises("barbare") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/subQuantities", { property: "attributs", items: classe.getBonusMaitrises("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addQuantities", { property: "attributs", items: classe.getBonusMaitrises("barbare") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/subElements", { property: "sauvegardes", items: classe.getSauvegarde("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addElements", { property: "sauvegardes", items: classe.getSauvegarde("barbare") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/subElements", { property: "capacites", items: classe.getCapacities("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addElements", { property: "capacites", items: classe.getCapacities("barbare") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/subQuantities", { property: "attributs", items: classe.getLife("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addQuantities", { property: "attributs", items: classe.getLife("barbare") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/subElements", { property: "items", items: classe.getItems("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addElements", { property: "items", items: classe.getItems("barbare") }, { root: true });
    });

    it("should only update the class and character state if previous class is not empty", () => {
        // Arrange
        const context = {
            commit: jest.fn(),
            rootGetters: jest.fn(),
        };
        const classPayload = {
            previous: "",
            new: "barbare"
        };

        // Act
        form2.actions.updateClasse(context, classPayload);

        // Assert
        expect(context.commit).not.toHaveBeenCalledWith("characterState/subQuantities", { property: "attributs", items: classe.getLifeDice("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addQuantities", { property: "attributs", items: classe.getLifeDice("barbare") }, { root: true });
        expect(context.commit).not.toHaveBeenCalledWith("characterState/subElements", { property: "maitrises", items: classe.getMaitrises("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addElements", { property: "maitrises", items: classe.getMaitrises("barbare") }, { root: true });
        expect(context.commit).not.toHaveBeenCalledWith("characterState/subQuantities", { property: "attributs", items: classe.getBonusMaitrises("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addQuantities", { property: "attributs", items: classe.getBonusMaitrises("barbare") }, { root: true });
        expect(context.commit).not.toHaveBeenCalledWith("characterState/subElements", { property: "sauvegardes", items: classe.getSauvegarde("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addElements", { property: "sauvegardes", items: classe.getSauvegarde("barbare") }, { root: true });
        expect(context.commit).not.toHaveBeenCalledWith("characterState/subElements", { property: "capacites", items: classe.getCapacities("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addElements", { property: "capacites", items: classe.getCapacities("barbare") }, { root: true });
        expect(context.commit).not.toHaveBeenCalledWith("characterState/subQuantities", { property: "attributs", items: classe.getLife("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addQuantities", { property: "attributs", items: classe.getLife("barbare") }, { root: true });
        expect(context.commit).not.toHaveBeenCalledWith("characterState/subElements", { property: "items", items: classe.getItems("barde") }, { root: true });
        expect(context.commit).toHaveBeenCalledWith("characterState/addElements", { property: "items", items: classe.getItems("barbare") }, { root: true });
    });
});