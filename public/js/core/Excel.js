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
        // $("#app").html("<h1>Hello</h1>")
        $("#app").addClass(['test', "hello", "world"])

        // const res = new Formula().parser(`
        //     <div class="formula">
        //         <label for="formula" class="formula__icon">FX</label>
        //         <input id="formula" @input="test1()" placeholder='alex@gmail.com' @hover="test2()" class="formula__input" type="text">
        //     </div>`)
        // res.forEach(item => console.log(`event ${item[0]} and method ${item[1]}`))

        // new Formula().dom_parser(`
        //     <div class="formula">
        //         <label for="formula" class="formula__icon">FX</label>
        //         <input id="formula" @input="test1()" @click="test3()" @input="test4()"placeholder='alex@gmail.com' @hover="test2()" class="formula__input" type="text">
        //     </div>`)
    }
}
