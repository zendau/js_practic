import {DomListener} from "@core/DomListener";

export class ComponentController extends DomListener {
    constructor() {
        super()
    }

    parser(html) {
        const arr = html.split("@")
        const res = [];
        this.$events.forEach(event => {
            arr.forEach(item => {
                if (item.includes(event) && item.includes("()")) res.push(item)
            })
        })
        const temp_arr = res.map(item => item.split("()"))
        return temp_arr.map(item => item[0].replaceAll("'", "").replaceAll("\"", "").split("="))
    }
}

