import {ComponentController} from "@/js/core/ComponentController";

export class Header extends ComponentController {
    static ClassName = "main-container__header"
    listener
    class_name
    constructor(args = {}) {
        super(args)
        this.class_name = "Header"
        this.html_body = this.toHtml()
    }
    toHtml() {
        return `
            <input @input="onInput()" class="main-container__header" value="${this.getStore("header") || "Untitled spreadsheet"}">
        `
    }

    onInput(event) {
        let val = event.target.value

        event.target.onblur = e => {
            if (val === "") {
                val = "Untitled spreadsheet"
                event.target.value = val
            }
            event.target.onblur = null
            this.$dispatch("headerName", val)
        }
    }
}
