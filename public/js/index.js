import '../scss/main.scss'

import {Excel} from "@core/Excel";
import {Header} from "@/js/components/header";
import {Toolbar} from "@/js/components/tollbar";
import {Formula} from "@/js/components/formula";
import {Table} from "@/js/components/table";
import {init_state} from "@/js/store/createStore";

// eslint-disable-next-line no-unused-vars
const excel = new Excel("#app", [Header, Toolbar, Formula, Table])

init_state()
