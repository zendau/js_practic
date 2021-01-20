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
        super()
        this.class_name = "table"
        this.row_size = 20
        this.args = args
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
        this.args.emmit.on("update cell", data => {
            this.select.selectedCell.value(data[0])
        })
    }

    onMousedown(event) {
        if (event.target.dataset.coll === "resize" | event.target.dataset.row === "resize") {
            table_resize(event)
            console.log(event)
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
        case "ArrowDown":
            if (this.select.currentElement[0] != 0) {
                this.select.currentElement[0]++
            }
            this.select.select(this.select.currentElement)
            break
        case "ArrowUp":
            if (this.select.currentElement[0] == 0) break
            this.select.currentElement[0]--
            this.select.select(this.select.currentElement)
            break
        case "ArrowRight":
            if (this.select.currentElement[1] == 0) break
            this.select.currentElement[1]++
            this.updateCell()
            this.select.select(this.select.currentElement)
            break
        case "ArrowLeft":
            if (this.select.currentElement[1] == 0) break
            this.select.currentElement[1]--
            this.select.select(this.select.currentElement)
            break
        }
    }

    updateCell() {
        this.args.emmit.emit("reset input")
    }
}
