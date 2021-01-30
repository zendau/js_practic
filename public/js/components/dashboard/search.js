import {ComponentController} from "@core/ComponentController";

export class Search extends ComponentController {
    constructor(args = {}) {
        super(args)
        this.class_name = "Search"
        this.html_body = this.toHtml()
    }
    toHtml() {
        return `
             <div class="search-form">
                <input type="text" id="search" class="search-form__input">
                <label for="search"><span class="material-icons">search</span></label>
            </div>
        `
    }
}
