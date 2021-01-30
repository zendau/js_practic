import {$} from "@core/DomCreater";
import {Emmiter} from "@core/Emmiter";

export class Excel {
    constructor(selector, parameters) {
        this.check_status = false

        document.onDOMSubtreeModified = e => {
            this.check_status = false
        }

        const time = setInterval(() => {
            if (this.check_status === true) {
                clearInterval(time)
                try {
                    $(".loader").$el.remove()
                } catch (e) {
                    console.log(e.message)
                }
            } else {
                this.check_status = true
            }
        }, 300)
        this.emmiter = new Emmiter()
        this.components = parameters["components"]
        this.store = parameters["store"]
        this.sub_store()
        parameters["components"].forEach(Component => {
            const component = new Component({
                "emmit": this.emmiter,
                "store": this.store,
                "data": parameters["data"]
            })
            $(selector).append(component.html_body)
            component.init(component)
        })
    }

    sub_store() {
        this.store.subscribe((data) => {})
    }
}
