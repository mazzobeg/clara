import { createStore } from "vuex";
import characterForm1 from "./module/characterForm1";
import form2 from "./module/form2";
import characterState from "./module/characterState";
import form4 from "./module/form4";
import form3 from "./module/form3";

export default createStore({
    modules : {
        characterForm1, 
        form2,
        characterState,
        form4,
        form3
    }
})