import {ComponentController} from "@core/ComponentController";
import {TableSelect} from "@/js/components/table/table.select";
import {table_resize} from "@/js/components/table/table.resize";
import {$} from "@core/DomCreater";
import {TableRender} from "@/js/components/table/table.render"

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
             <div class="table" @mousedown="onMousedown()" @keydown="onKeydown()">
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
        this.$on("table:cell", data => this.select.selectedCell.value(data[0]))
        this.$on("table:change_focus", data => this.select.selectedCell.focus())
        this.$on("toolbar:changed", data => this.cellStyles(data[0]))
    }

    onMousedown(event) {
        if (event.target.dataset.coll === "resize" | event.target.dataset.row === "resize") {
            table_resize(event)
                .then(data => {
                    if (data[0] == "coll") this.$dispatch("tableCols", data[1])
                    else if (data[0] == "row") this.$dispatch("tableRows", data[1])
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
        this.$emit("formula:input", cell.value())
        this.$emit("toolbar:active", this.getStore("tableCells"), this.select.selectedCeLLid)
        this.$dispatch("tableCells", [cell.dataset.id, {text: cell.value()}])
    }

    cellStyles(data) {
        const cell = $(this.select.selectedCell)
        let cell_fn_size = 20
        switch (data[0]) {
        case "format_bold":
            this.select.selectedCell.css({
                "fontWeight": "bold"
            })
            this.$dispatch("tableCells", [cell.dataset.id, {bold: true}])
            break

        case "format_italic":
            console.log("italic")
            this.select.selectedCell.css({
                "font-style": "italic"
            })
            this.$dispatch("tableCells", [cell.dataset.id, {italic: true}])
            break

        case "format_underlined":
            console.log("underlined")
            this.select.selectedCell.css({
                "text-decoration": "underline"
            })
            this.$dispatch("tableCells", [cell.dataset.id, {underline: true}])
            break

        case "format_size":
            if (this.select.selectedCell.$el.style.fontSize === "") {
                this.select.selectedCell.css({
                    "font-size": "20px"
                })
            } else {
                cell_fn_size = this.select.selectedCell.$el.style.fontSize
                cell_fn_size = parseInt(cell_fn_size.substr(0, cell_fn_size.length-2))
                this.select.selectedCell.css({
                    "font-size": (cell_fn_size+2)+"px"
                })
            }
            this.$dispatch("tableCells", [cell.dataset.id, {fz: cell_fn_size+"px"}])
            this.currectSizeCell()
            break

        case "format_align_left":
            console.log( "left")
            this.select.selectedCell.css({
                "text-align": "left"
            })
            this.$dispatch("tableCells", [cell.dataset.id, {align: "left"}])
            break

        case "format_align_center":
            console.log("center")
            this.select.selectedCell.css({
                "text-align": "center"
            })
            this.$dispatch("tableCells", [cell.dataset.id, {align: "center"}])
            break

        case "format_align_right":
            console.log( "right")
            this.select.selectedCell.css({
                "text-align": "right"
            })
            this.$dispatch("tableCells", [cell.dataset.id, {align: "right"}])
            break

        case "format_clear":
            console.log("clear")
            this.select.selectedCell.css({
                "fontWeight": "normal",
                "font-style": "normal",
                "text-decoration": "none",
                "text-align": "left",
                "font-size": "18px"
            })
            this.$dispatch("tableCells", [cell.dataset.id, {
                bolt: false,
                italic: false,
                underline: false,
                fz: cell_fn_size+"px",
                align: "left"
            }])
            this.currectSizeCell()
            break
        }
    }

    currectSizeCell() {
        const item = this.select.selectedCell
        const child_node = $(item.getParent(".table__rows").children[0])
        const bounds = (item.$el.getBoundingClientRect().height+2) + "px"
        this.$dispatch("tableRows", [
            child_node.dataset['row_id'],
            {"value": bounds}])
        child_node.css({
            "height": bounds
        })
    }
}
