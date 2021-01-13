const header_letter = {
    A: 65,
    Z: 70
}

export function renderColumn(size) {
    const table_columns = []
    for (let i = 0; i < size; i++) {
        table_columns.push(`<li class="table__column-item">${String.fromCharCode(header_letter.A+i)}</li>`)
    }
    return table_columns.join("")
}

export function renderRow(size) {
    const table_rows = []
    for (let i = 0; i < size; i++) {
        table_rows.push(`<li class="table__row-item">${(i+1).toString()}</li>`)
    }
    return table_rows.join("")
}

export function renderInput(sizeC, sizeR) {
    const table_inpunts = []
    for (let i = 0; i < (sizeC*sizeR); i++) {
        table_inpunts.push(`<input type="text" class="table__cell">`)
    }
    return table_inpunts.join("")
}
