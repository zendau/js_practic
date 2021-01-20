import {ComponentController} from "@/js/core/ComponentController";
import {$} from "@core/DomCreater";

export class Formula extends ComponentController {
    static ClassName = "formula"
    listener
    class_name
    constructor(args = {}) {
        super()
        this.class_name = "Formula"
        this.args = args
        this.args.emmit.on("reset input", data => {
            console.log("clean")
            $("#formula").value("")
        })
    }
    toHtml() {
        return `
            <div class="formula">
                <label for="formula" class="formula__icon">FX</label>
                <input id="formula"  @input="test1()" placeholder='alex@gmail.com' @hover="test2()" class="formula__input" type="text">
            </div>
        `
    }

    test1(e) {
        this.args.emmit.emit("update cell", e.target.value)
    }

    test2() {

    }

    test3() {

    }
}
