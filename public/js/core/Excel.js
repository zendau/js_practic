import {$} from "@core/DomCreater";
import {Emmiter} from "@core/Emmiter";

export class Excel {
    constructor(selector, parameters) {
        this.emmiter = new Emmiter()
        this.components = parameters["components"]
        this.store = parameters["store"]
        this.sub_store()
        parameters["components"].forEach(Component => {
            const component = new Component({
                "emmit": this.emmiter,
                "store": this.store
            })
            $(selector).append(component.html_body)
            component.init(component)
        })
    }

    sub_store() {
        this.store.subscribe((data) => {})
    }
}
