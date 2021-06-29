import {ComponentController} from "@core/ComponentController";
import {$} from "@core/DomCreater";
import {get_loader} from "@/js/components/loader";

export class Select extends ComponentController {
    constructor(args = {}) {
        super(args)
        this.class_name = "Select"
        this.html_body = this.toHtml()
        this.args = args
    }
    toHtml() {
        return `
            <div class="select-files" @mousedown="onMousedown()">
                <div class="select-files__file">
                    <div class="select-files__data">
                        <div class="select-files__file-item">Name</div>
                        <div class="select-files__file-item">Autor</div>
                        <div class="select-files__file-item">Data create</div>
                    </div>
                    <div class="select-files__options">
                        <span class="material-icons select-files__file-option--empty">settings_ethernet</span>
                    </div>
                </div>
                ${this.renderSelectList()}
                <ul class="select-files__option-menu">
                    <li class="select-files__option-menu__item">Rename</li>
                    <li class="select-files__option-menu__item">Remove</li>
                    <li class="select-files__option-menu__item">Open in new tab</li>
                </ul>
            </div>
             `
    }

    renderSelectList() {
        const res = []
        let temp_data = {}
        let tableTitle = "Untitled spreadsheet"
        this.args['data'].map(item => {
            temp_data = JSON.parse(localStorage.getItem(item))
            try {
                tableTitle = temp_data['header']
                if (tableTitle === "") {
                    tableTitle = "Untitled spreadsheet"
                }
            } catch (e) {
                tableTitle = "Untitled spreadsheet"
            }
            res.push(`
                <div class="select-files__file" data-hash="${item}">
                    <div class="select-files__data">
                        <div class="select-files__file-item">${tableTitle}</div>
                        <div class="select-files__file-item">Autor</div>
                        <div class="select-files__file-item">Data create</div>
                    </div>
                    <div class="select-files__options">
                        <span class="material-icons select-files__file-option">settings_ethernet</span>
                    </div>
                </div>
            `)
        })
        return res.join("")
    }

    onMousedown(event) {
        $("#app").html(get_loader())
        document.onmouseup = e => {
            document.onmouseup = null
            const parent = $(event.target).getParent("[data-hash]")
            const hash = $(parent).dataset.hash
            history.pushState({page: 2}, "title 1", "/sheet/"+hash)
            window.dispatchEvent(new Event('popstate'))
        }
    }
}
