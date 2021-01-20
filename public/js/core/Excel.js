import {$} from "@core/DomCreater";
import {Emmiter} from "@core/Emmiter";

export class Excel {
    components

    constructor(selector, components) {
        this.emmiter = new Emmiter()
        components.forEach(Component => {
            const component = new Component({
                "emmit": this.emmiter
            })
            $(selector).append(component.toHtml())
            component.init(component)
        })
        this.components = components
        $("#app").addClass(['test', "hello", "world"])
    }
}
