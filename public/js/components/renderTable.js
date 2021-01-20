const header_letter = {
    A: 65,
    Z: 70
}

export function renderColumn(size = 26) {
    const table_columns = []
    for (let i = 0; i < size; i++) {
        table_columns.push(`<li class="table__column-item" data-type='resize'>${String.fromCharCode(header_letter.A+i)}${(i+1 == size) ? '' : '<span class="table__column-resize" data-coll="resize"></span></span>'}</li>`)
    }
    return table_columns.join("")
}

export function renderRow(size) {
    const table_rows = []
    for (let i = 0; i < size; i++) {
        table_rows.push(`<li class="table__rows"><div class="table__row-item" data-type='resize'>${(i+1).toString()}${(i+1 == size) ? '</div><div class="table__flex_cell">' : '<span class="table__row-resize" data-row="resize"></span></div><div class="table__flex_cell">'}`)
        for (let j = 0; j < 26; j++) {
            table_rows.push(`<input type="text" class="table__cell" data-cell="${String.fromCharCode(header_letter.A+j)}" data-id="${i}:${j}">`)
        }
        table_rows.push("</div></li>")
    }
    return table_rows.join("")
}
