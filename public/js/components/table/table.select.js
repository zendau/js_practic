import {$} from "@core/DomCreater";
import {Table} from "@/js/components/table/table";


export class TableSelect {
    start_cell
    end_cell
    selectedCeLLid
    selectedCell
    constructor(args = {}) {
        this.selectedElements = []
        this.selectedCells = []
    }

    select(elem) {
        this.clean()
        const element = $(Table.ClassName).find(`[data-id='${elem.join(":")}']`)
        $(element).addClass("table__cell--selected").focus()
        this.selectedCell = element
        this.selectedElements.push(elem.join(":"))
        this.selectedCeLLid = this.selectedElements[0].split(":")
        this.selectedCells.push(element)
    }

    selectGroup() {
        this.clean()
        this.sort()
        let element
        for (let i = this.start_cell[0]; i <= this.end_cell[0]; i++) {
            for (let j = this.start_cell[1]; j <= this.end_cell[1]; j++) {
                this.selectedElements.push(`${i}:${j}`)
            }
        }
        this.selectedElements.forEach((item, index) => {
            element = $(Table.ClassName).find(`[data-id='${item}']`)
            this.selectedCells.push(element)
            element.addClass("table__cell--selected")
        })
        this.selectedCell = $(Table.ClassName).find(`[data-id='${this.selectedElements[0]}']`)
        this.selectedCeLLid = this.selectedElements[0].split(":")
    }

    clean() {
        this.selectedElements.forEach(item => $(Table.ClassName).find(`[data-id='${item}']`).removeClass("table__cell--selected"))
        this.selectedElements = []
        this.selectedCells = []
    }

    sort() {
        if (this.end_cell[0] < this.start_cell[0]) {
            const temp = this.start_cell[0]
            this.start_cell[0] = this.end_cell[0]
            this.end_cell[0] = temp
        }

        if (this.end_cell[1] < this.start_cell[1]) {
            const temp = this.start_cell[1]
            this.start_cell[1] = this.end_cell[1]
            this.end_cell[1] = temp
        }
    }
}
