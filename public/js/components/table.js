import {ComponentController} from "@/js/core/ComponentController";
import {renderColumn, renderRow} from "@/js/components/renderTable";
// import {$} from "@core/DomCreater";
import {TableSelect} from "@/js/components/table.select";
import {table_resize} from "@/js/components/table.resize";
import {$} from "@core/DomCreater";

export class Table extends ComponentController {
    static ClassName = ".table"
    listener
    class_name
    selected_id
    constructor(args = {}) {
        super(args)
        this.class_name = "table"
        this.row_size = 20
    }

    toHtml() {
        return `
             <div class="table" @mousedown="onMousedown()" @keydown="onKeydown()">
                <ul class="table__column-list">
                    <li class="table__column-item table__column-item--empty">0</li>
                    ${renderColumn()}
                </ul>
                <div class="table__container">
                    <ul class="table__row-list">
                        ${renderRow(this.row_size)}
                    </ul>
                </div>  
            </div>
        `
    }

    init() {
        super.init()
        this.select = new TableSelect(this.args)
        this.selected_id = [0, 0]
        this.select.select(this.selected_id)
        this.$on("table:cell", data => this.select.selectedCell.value(data[0]))
        this.$on("table:change_focus", data => this.select.selectedCell.focus())
    }

    onMousedown(event) {
        if (event.target.dataset.coll === "resize" | event.target.dataset.row === "resize") {
            table_resize(event)
        } else if (event.target.dataset.cell && event.shiftKey) {
            this.select.start_cell = $(event.target).parse_id()

            document.onmouseup = e => {
                document.onmouseup = null
                this.select.end_cell = $(e.target).parse_id()
                this.select.selectGroup()
            }
        } else if (event.target.dataset.cell) {
            const id = $(event.target).parse_id()
            this.select.select(id)
            this.updateCell()
        } else {
            console.log(event.target.dataset)
        }
    }

    onKeydown(event) {
        switch (event.key) {
        case "Enter":
            event.preventDefault()
            // eslint-disable-next-line no-fallthrough
        case "ArrowDown":
            this.select.selectedCeLLid[0]++
            if (this.select.selectedCeLLid[0] >= this.row_size) {
                this.select.selectedCeLLid[0]--
                break
            }
            this.select.select(this.select.selectedCeLLid)
            this.updateCell()
            break
        case "ArrowUp":
            this.select.selectedCeLLid[0]--
            if (this.select.selectedCeLLid[0] < 0) {
                this.select.selectedCeLLid[0]++
                break
            }
            this.select.select(this.select.selectedCeLLid)
            this.updateCell()
            break
        case "Tab":
            event.preventDefault()
        // eslint-disable-next-line no-fallthrough
        case "ArrowRight":
            this.select.selectedCeLLid[1]++
            if (this.select.selectedCeLLid[1] > 25) {
                this.select.selectedCeLLid[1]--
                break
            }
            this.select.select(this.select.selectedCeLLid)
            this.updateCell()
            break
        case "ArrowLeft":
            this.select.selectedCeLLid[1]--
            if (this.select.selectedCeLLid[1] < 0) {
                this.select.selectedCeLLid[1]++
                break
            }
            this.select.select(this.select.selectedCeLLid)
            this.updateCell()
            break
        default:
            this.updateCell()
        }
    }

    updateCell() {
        this.$emit("formula:input", $(this.select.selectedCell).value())
    }
}
