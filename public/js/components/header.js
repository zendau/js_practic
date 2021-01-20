import {ComponentController} from "@/js/core/ComponentController";

export class Header extends ComponentController {
    static ClassName = "main-container__header"
    listener
    class_name
    constructor(args = {}) {
        super()
        this.class_name = "Header"
    }
    toHtml() {
        return `
            <h1 class="main-container__header">File name</h1>
        `
    }
}
