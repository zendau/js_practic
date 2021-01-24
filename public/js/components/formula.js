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
        this.$emit("table:cell", e.target.value)
    }

    onKeydown(e) {
        if (e.key === "Enter") {
            e.preventDefault()
            this.$emit("table:change_focus")
        }
    }
}
