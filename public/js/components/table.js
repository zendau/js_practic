import {ComponentController} from "@/js/core/ComponentController";
import {renderColumn, renderRow, renderInput} from "@/js/components/renderTable";

export class Table extends ComponentController {
    static ClassName = "table"
    listener
    class_name
    constructor() {
        super()
        this.class_name = "Table"
    }

    toHtml() {
        return `
             <div class="table">
                <ul class="table__column-list">
                    <li class="table__column-item table__column-item--empty">0</li>
                    ${renderColumn(26)}
                </ul>
                <div class="table__container">
                    <ul class="table__row-list">
                        ${renderRow(20)}
                    </ul>
                    <div class="table__cells">
                        ${renderInput(26, 20)}
                    </div>
                </div>    
            </div>
        `
    }
}
