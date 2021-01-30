import '../scss/main.scss'

// import {Excel} from "@core/Excel";
// import {Header} from "@/js/components/header";
// import {Toolbar} from "@/js/components/toolbar";
// import {Formula} from "@/js/components/formula";
// import {Table} from "@/js/components/table/table";
// import {init_state} from "@/js/store/createStore";
import {Router} from "@/js/router/Router";

// eslint-disable-next-line no-unused-vars
// const excel = new Excel(
//     "#app", {
//         "components": [Header, Toolbar, Formula, Table],
//         "store": init_state()
//     }
// )
new Router("#app")

