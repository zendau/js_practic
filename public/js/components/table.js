import {ComponentController} from "@/js/core/ComponentController";

export class Table extends ComponentController {
    static ClassName = "table"

    constructor() {
        super();
    }

    toHtml() {
        return `
             <div class="table">
                <ul class="table__column-list">
                    <li class="table__column-item table__column-item--empty">0</li>
                    <li class="table__column-item">A</li>
                    <li class="table__column-item">B</li>
                    <li class="table__column-item">C</li>
                    <li class="table__column-item">D</li>
                    <li class="table__column-item">E</li>
                    <li class="table__column-item">F</li>
                </ul>
                <ul class="table__row-list">
                    <li class="table__row-item">1</li>
                    <li class="table__row-item">2</li>
                    <li class="table__row-item">3</li>
                    <li class="table__row-item">4</li>
                    <li class="table__row-item">5</li>
                    <li class="table__row-item">6</li>
                </ul>
                <div class="table__cells">
                    <input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell"><input type="text" class="table__cell">
                </div>
            </div>
        `
    }
}
