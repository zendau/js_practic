import {$} from "@core/DomCreater";
import {Formula} from "@/js/components/formula";

export class Excel {
    constructor(selector, components) {
        components.forEach(Component => {
            const component = new Component
            $(selector).append(component.toHtml())
        })

        $("#app").html("<h1>Hello</h1>")
        $("#app").addClass(['test', "hello", "world"])

        const res = new Formula().parser("<input class='input' @input='test1()' @hover='test2()'> placeholder='alex@gmail.com'")
        res.forEach(item => console.log(`event ${item[0]} and method ${item[1]}`))
    }
}
