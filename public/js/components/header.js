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
            <input class="main-container__header" value="File name">
        `
    }
}
