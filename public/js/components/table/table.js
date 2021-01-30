import {ComponentController} from "@core/ComponentController";
import {TableSelect} from "@/js/components/table/table.select";
import {table_resize} from "@/js/components/table/table.resize";
import {$} from "@core/DomCreater";
import {TableRender} from "@/js/components/table/table.render"
import {cellStyles} from "@/js/components/table/table.styles";

export class Table extends ComponentController {
    static ClassName = ".table"
    listener
    class_name
    selected_id
    constructor(args = {}) {
        super(args)
        this.class_name = "table"
        this.row_size = 20
        this.tableRender = new TableRender(this.getStore())
        this.html_body = this.toHtml()
    }

    toHtml() {
        return `
             <div class="table" @load="onLoad()" @mousedown="onMousedown()" @keydown="onKeydown()">
                <ul class="table__column-list">
                    <li class="table__column-item table__column-item--empty">0</li>
                    ${this.tableRender.renderColumn()}
                </ul>
                <div class="table__container">
                    <ul class="table__row-list">
                        ${this.tableRender.renderRow(this.row_size)}
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
        this.$on("table:cell", data => {
            const cell = $(this.select.selectedCell)
            this.select.selectedCell.value(data[0][0])
            this.select.selectedCell.setAttr("data-value", data[0][1])
            this.$dispatch("tableCells", [cell.dataset.id, {text: data[0][0]}])
            if (data[0][1] !== undefined) {
                this.$dispatch("tableCells", [cell.dataset.id, {dataValue: data[0][1]}])
            }
        })
        this.$on("table:change_focus", data => this.select.selectedCell.focus())
        this.$on("toolbar:changed", data => cellStyles(this, data[0]))
    }

    onMousedown(event) {
        if (event.target.dataset.coll === "resize" | event.target.dataset.row === "resize") {
            table_resize(event)
                .then(data => {
                    if (data[0] === "coll") this.$dispatch("tableCols", data[1])
                    else if (data[0] === "row") this.$dispatch("tableRows", data[1])
                })
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
        document.onkeyup = event => {
            document.onkeyup = null
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
    }

    updateCell() {
        const cell = $(this.select.selectedCell)
        if (cell.dataset.value !== undefined) {
            this.$emit("formula:input", cell.dataset.value)
        } else {
            this.$emit("formula:input", cell.value())
        }
        this.$emit("toolbar:active", this.getStore("tableCells"), this.select.selectedCeLLid)
        this.$dispatch("tableCells", [cell.dataset.id, {text: cell.value()}])
    }

    onLoad(event) {
        console.log("event load", event)
    }
}
