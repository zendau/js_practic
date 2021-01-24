import {DomListener} from "@core/DomListener";

export class ComponentController extends DomListener {
    constructor(args) {
        super()
        this.args = args
    }

    dom_parser(html) {
        const node = document.createElement("div")
        node.innerHTML = html
        const nodes = node.querySelectorAll("*")
        const res = []
        nodes.forEach(node => {
            this.$events.forEach(event => {
                if (node.getAttribute("@"+event)) res.push(node)
            })
        })
        for (let i = 0; i < res.length; i++) {
            if (res[i] == res[i+1]) {
                res.splice(i, 1)
                i--;
            }
        }

        return res.map(item => this.html_parser(item))
    }
    html_parser(node) {
        const class_name = node.className
        const attr = {}
        this.$events.forEach(event => {
            if (node.getAttribute("@"+event)) attr[event] = node.getAttribute("@"+event)
        })
        return [class_name, attr]
    }

    $emit(event, ...args) {
        this.args.emmit.emit(event, args)
    }

    $on(event, callback) {
        this.args.emmit.on(event, callback)
    }

    $dispatch(type, args) {
        this.args.store.dispatch(type, args)
    }

    init() {
        this.addListener(this.dom_parser(this.html_body))
    }

    get getStore() {
        return this.args.store.getServerData
    }
}

