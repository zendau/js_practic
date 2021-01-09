import {ComponentController} from "@/js/core/ComponentController";

export class Formula extends ComponentController {
    static ClassName = "formula"
    listener
    class_name
    constructor() {
        super()
        this.class_name = "Formula"
    }
    toHtml() {
        return `
            <div class="formula">
                <label for="formula" class="formula__icon">FX</label>
                <input id="formula"  @input="test1()" placeholder='alex@gmail.com' @hover="test2()" class="formula__input" type="text">
            </div>
        `
    }

    test1() {
        console.log("test 1")
    }

    test2() {

    }

    test3() {

    }
}
