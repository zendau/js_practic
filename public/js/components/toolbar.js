import {ComponentController} from "@/js/core/ComponentController";
import {$} from "@core/DomCreater";

export class Toolbar extends ComponentController {
    static ClassName = "toolbar"
    static default_styles = {
        bold: false,
        italic: false,
        underline: false,
        fz: "18px",
        align: "left"
    }
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
                <div class="toolbar__item"><span class="material-icons" data-bold="false">format_bold</span></div>
                <div class="toolbar__item"><span class="material-icons" data-italic="false">format_italic</span></div>
                <div class="toolbar__item"><span class="material-icons" data-underline="false">format_underlined</span></div>
                <div class="toolbar__item"><span class="material-icons" data-fz="18px">format_size</span></div>
                <div class="toolbar__item"><span class="material-icons" data-align="left">format_align_left</span></div>
                <div class="toolbar__item"><span class="material-icons" data-align="center">format_align_center</span></div>
                <div class="toolbar__item"><span class="material-icons" data-align="right">format_align_right</span></div>
                <div class="toolbar__item"><span class="material-icons" data-type="clear">format_clear</span></div>
            </div>
        `
    }

    init() {
        super.init()
        this.toolbar = $(".toolbar")
        this.$on("toolbar:active", data => {
            const args = data[0][0][data[0][1].join(":")] || {}
            Object.keys(args).forEach(data => {
                if (data === "text") {
                    this.clearToolbarStyles()
                } else if (data === 'align') {
                    this.toolbar.find(`[data-align="${args[data]}"]`).addClass("icons--active")
                } else if (data === "bold" || data == "italic" || data === "underline") {
                    this.changeStyle(args, data)
                } else if (data === "fz") {
                    this.toolbar.find("[data-fz]").addClass("icons--active")
                }
            })
        })
        this.$on("toolbar:clear", () => this.clearToolbarStyles())
    }

    changeStyle(args, style) {
        if (args !== undefined && args[style] === true) {
            this.toolbar.find(`[data-${style}]`).addClass("icons--active")
            this.toolbar.find(`[data-${style}]`).setAttr(`data-${style}`, true)
        } else {
            this.toolbar.find(`[data-${style}]`).removeClass("icons--active")
            this.toolbar.find(`[data-${style}]`).setAttr(`data-${style}`, false)
        }
    }

    onClick(event) {
        this.$emit("toolbar:changed", event.target.innerText)
    }

    clearToolbarStyles() {
        document.querySelectorAll(".icons--active")
            .forEach(node => $(node).removeClass("icons--active"))
        Object.keys(Toolbar.default_styles).forEach(key => {
            this.toolbar.find(`[data-${key}]`)
                .setAttr(`data-${key}`, Toolbar.default_styles[key])
        })
    }
}
