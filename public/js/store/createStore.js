// eslint-disable-next-line no-unused-vars
import {StateX} from "@/js/store/Store";
import * as table from "@/js/store/modules/table"
import * as formula from "@/js/store/modules/formula"
import * as header from "@/js/store/modules/header"
import * as toolbar from "@/js/store/modules/toolbar"


export function init_state() {
    console.log("table", table)
    console.log("tableState", table.states())
    console.log("formula", formula)
    console.log("header", header)
    console.log("toolbar", toolbar)
}


// // eslint-disable-next-line no-unused-vars
// const test = new StateX({
//     state: [states, states3, states4],
//     action: [actions, actions2]
// })
//
// console.log(test)
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
