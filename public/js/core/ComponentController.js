import {DomListener} from "@core/DomListener";

export class ComponentController extends DomListener {
    constructor(cont) {
        super(cont)
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

    init() {
        this.addListener(this.dom_parser(this.toHtml()))
    }
}

