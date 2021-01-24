import {ComponentController} from "@/js/core/ComponentController";

export class Toolbar extends ComponentController {
    static ClassName = "toolbar"
    listener
    class_name
    constructor(args = {}) {
        super(args)
        this.class_name = "Toolbar"
        this.html_body = this.toHtml()
    }

    toHtml() {
        return `
            <div class="toolbar" @click="onClick()">
                <div class="toolbar__item"><span class="material-icons">format_bold</span></div>
                <div class="toolbar__item"><span class="material-icons">format_italic</span></div>
                <div class="toolbar__item"><span class="material-icons">format_underlined</span></div>
                <div class="toolbar__item"><span class="material-icons">format_size</span></div>
                <div class="toolbar__item"><span class="material-icons">format_align_left</span></div>
                <div class="toolbar__item"><span class="material-icons">format_align_center</span></div>
                <div class="toolbar__item"><span class="material-icons">format_align_right</span></div>
                <div class="toolbar__item"><span class="material-icons">format_clear</span></div>
            </div>
        `
    }

    init() {
        super.init()
        this.$on("toolbar:active", data => {
            console.log(data[0][0][data[0][1].join(":")])
        })
    }

    onClick(event) {
        this.$emit("toolbar:changed", event.target.innerText)
    }
}
