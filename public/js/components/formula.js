import {ComponentController} from "@/js/core/ComponentController";
import {$} from "@core/DomCreater";

export class Formula extends ComponentController {
    static ClassName = "formula"
    listener
    class_name
    constructor(args = {}) {
        super(args)
        this.class_name = "Formula"
        this.html_body = this.toHtml()
    }
    toHtml() {
        return `
            <div class="formula">
                <label for="formula" class="formula__icon">FX</label>
                <input id="formula" @input="onInput()"  @keydown="onKeydown()" class="formula__input" type="text">
            </div>
        `
    }

    init() {
        super.init()
        this.$on("formula:input", data => $("#formula").value(data[0]))
    }

    onInput(e) {
        const value = e.target.value
        if (value[0] === "=") {
            this.$emit("table:cell", this.parser(value), value)
        } else {
            this.$emit("table:cell", value)
        }
    }

    onKeydown(e) {
        if (e.key === "Enter") {
            e.preventDefault()
            this.$emit("table:change_focus")
        }
    }

    parser(string) {
        const formula = string.substring(1, string.length)
        let new_formula = formula
        // eslint-disable-next-line no-unused-vars
        const func = [
            "cos",
            "sin",
            "tan"
        ]

        const reg = RegExp("^[0-9()+\\-/*^(cos)(sin)(tan)]+$")
        if (reg.exec(formula)) {
            try {
                func.forEach(item => {
                    new_formula = new_formula.replaceAll(item, "Math."+item)
                })
                const number = eval(new_formula)
                console.log("type", typeof number)
                if (typeof number === "number") {
                    return number.toFixed(4)
                } else {
                    return formula
                }
            } catch (e) {
                console.log(e.message)
            }
        }
    }
}

