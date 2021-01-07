import {ComponentController} from "@/js/core/ComponentController";

export class Formula extends ComponentController {
    static ClassName = "formula"

    constructor() {
        super();
    }
    toHtml() {
        return `
            <div class="formula">
                <label for="formula" class="formula__icon">FX</label>
                <input id="formula" class="formula__input" type="text">
            </div>
        `
    }
}
