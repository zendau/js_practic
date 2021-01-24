export class TableRender {
    constructor(state) {
        this.header_letter = {
            A: 65,
            Z: 70
        }
        this.state = state
        this.BASE_WIDTH = "102px"
        this.BASE_HEIGHT = "25px"
    }

    renderColumn(size = 26) {
        const table_columns = []
        const ColStyles = this.state['tableCols']
        for (let i = 0; i < size; i++) {
            table_columns.push(`
                <li class="table__column-item" 
                data-col_id=${i}
                style = "
                    width: ${ColStyles[i] ? ColStyles[i]['value'] : this.BASE_WIDTH} 
                "
                data-type='resize'>
                ${String.fromCharCode(this.header_letter.A+i)}${(i+1 == size) ? '' : '<span class="table__column-resize" data-coll="resize"></span></span>'}</li>`)
        }
        return table_columns.join("")
    }

    renderRow(size) {
        const table_rows = []
        const ColStyles = this.state['tableCols']
        const RowStyles = this.state['tableRows']
        const CellData = this.state["tableCells"]
        let input_value = ""
        for (let i = 0; i < size; i++) {
            table_rows.push(`
                <li class="table__rows"><div class="table__row-item" 
                data-row_id=${i} 
                style = "
                    height: ${RowStyles[i] ? RowStyles[i]['value'] : this.BASE_HEIGHT} 
                "
                data-type='resize'>
                ${(i+1).toString()}${(i+1 == size) ? '</div><div class="table__flex_cell">' : '<span class="table__row-resize" ' +
                'data-row="resize"></span></div><div class="table__flex_cell"' +
                '>'}`)
            for (let j = 0; j < 26; j++) {
                if (CellData[i+":"+j] === undefined) {
                    input_value = ""
                } else {
                    input_value = CellData[i + ":" + j]['text']
                }
                table_rows.push(`
                    <input type="text" class="table__cell" 
                    data-cell="${String.fromCharCode(this.header_letter.A+j)}" 
                    data-id="${i}:${j}"
                    value="${input_value}"
                    style = "
                        width: ${ColStyles[j] ? ColStyles[j]['value'] : this.BASE_WIDTH} 
                    "
                    >`)
            }
            table_rows.push("</div></li>")
        }
        return table_rows.join("")
    }
}


