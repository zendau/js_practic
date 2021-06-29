import {ComponentController} from "@core/ComponentController";
import {$} from "@core/DomCreater";
import {get_loader} from "@/js/components/loader";

export class Create extends ComponentController {
    constructor(args = {}) {
        super(args)
        this.class_name = "Create"
        this.html_body = this.toHtml()
    }
    toHtml() {
        return `
            <div class="create-form" @mousedown="onMousedown()">
                <div class="create-form__container">
                    <button class="create-form__item" data-type="create">
                        <span class="material-icons">add</span>
                    </button>
                    <button class="create-form__item" data-type="create">
                        <span class="material-icons">add</span>
                    </button>
                    <button class="create-form__item" data-type="create">
                        <span class="material-icons">add</span>
                    </button>
                    <button class="create-form__item" data-type="create">
                        <span class="material-icons">add</span>
                    </button>
                </div>
            </div>
        `
    }

    onMousedown(event) {
        $("#app").html(get_loader())
        document.onmouseup = e => {
            document.onmouseup = null
            if ($(event.target).dataset.type === "create") {
                history.pushState({page: 2}, "title 1", "/sheet/"+Math.random().toString(36).substring(2));
                // history.pushState({page: 2}, "title 1", "/sheet/ll9ft3s0zpq")
                window.dispatchEvent(new Event('popstate'));
            }
        }
    }
}
