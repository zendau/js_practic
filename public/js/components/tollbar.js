import {ComponentController} from "@/js/core/ComponentController";

export class Toolbar extends ComponentController {
    static ClassName = "toolbar"

    constructor() {
        super();
    }

    toHtml() {
        return `
            <div class="toolbar">
                <div class="toolbar__item"><span class="material-icons">format_bold</span></div>
                <div class="toolbar__item"><span class="material-icons">format_italic</span></div>
                <div class="toolbar__item"><span class="material-icons">format_size</span></div>
                <div class="toolbar__item"><span class="material-icons">format_underlined</span></div>
                <div class="toolbar__item"><span class="material-icons">format_clear</span></div>
            </div>
        `
    }
}
