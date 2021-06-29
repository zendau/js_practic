import {Excel} from "@core/Excel";
import {Search} from "@/js/components/dashboard/search";
import {Create} from "@/js/components/dashboard/create";
import {Select} from "@/js/components/dashboard/select";
import {init_state} from "@/js/store/createStore";
import {Header} from "@/js/components/header";
import {Toolbar} from "@/js/components/toolbar";
import {Formula} from "@/js/components/formula";
import {Table} from "@/js/components/table/table";
import {$} from "@core/DomCreater";
import {get_loader} from "@/js/components/loader";

export class Router {
    constructor(root) {
        this.root = root
        this.urls = [
            'sheets'
        ]
        this.tableHashes = [
            "ll9ft3s0zpq"
        ]
        this.init()
    }

    init() {
        $("#app").html(get_loader())
        const userData = JSON.parse(localStorage.getItem("userData")) || []
        this.tableHashes = userData
        this.render("dashboard")
        window.addEventListener("hashchange", (event) => {
            $("#app").html(get_loader())
            const current_hash = window.location.hash.substring(1)
            const args = current_hash.split("/")
            this.findTemplate(args)
        })
        window.addEventListener("popstate", (event) => {
            $("#app").html(get_loader())
            const path = window.location.pathname.substr(1)
            const args = path.split("/")
            this.findTemplate(args)
        })
    }

    findTemplate(args) {
        try {
            const res = this.tableHashes.filter(item => item === args[1])
            if (args[0] === "") {
                this.render("dashboard")
            } else if (args[0] === "sheet" && res.length !== 0) {
                this.render("oldTable", args[1])
            } else {
                this.render("newTable", args[1])
                this.tableHashes.push(args[1])
                localStorage.setItem("userData", JSON.stringify(this.tableHashes))
            }
        } catch (e) {
            console.log(e.message)
            this.render("dashboard")
        }
    }

    render(url, hash) {
        if (url === "dashboard") {
            new Excel(this.root, {
                "components": [Search, Create, Select],
                "store": init_state(),
                "data": this.tableHashes
            })
        }
        if (url === "oldTable") {
            new Excel(this.root, {
                "components": [Header, Toolbar, Formula, Table],
                "store": init_state(hash),
                "data": this.tableHashes
            })
        }
        if (url === "newTable") {
            new Excel(this.root, {
                "components": [Header, Toolbar, Formula, Table],
                "store": init_state(hash),
                "data": this.tableHashes
            })
        }
    }
}
