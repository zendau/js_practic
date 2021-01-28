import {StateX} from "@/js/store/Store";
import * as table from "@/js/store/modules/table"
import * as formula from "@/js/store/modules/formula"
import * as header from "@/js/store/modules/header"
import * as toolbar from "@/js/store/modules/toolbar"

export function init_state() {
    return new StateX({
        state: [
            table.states,
            formula.states,
            header.states,
            toolbar.states
        ],
        action: [
            table.actions,
            formula.actions,
            header.actions,
            toolbar.actions
        ]
    })
}
// // console.log(test.getter("tableCell"))
// test.dispatch("tableResize", [
//     1,
//     {
//         value: 700
//     }
// ])
// // console.log(test)
//
// console.log("state", test.getter("all"))
