export const states = () => ({
    tableCols: {},
    tableRows: {},
    tableStyle: {},
    tableCells: {}
})


export const actions = () => ({
    tableCols(states, data) {
        states["tableCols"][data[0]] = data[1]
    },
    tableRows(states, data) {
        states["tableRows"][data[0]] = data[1]
    },
    tableCells(states, data) {
        if (states["tableCells"][data[0]] === undefined) {
            states["tableCells"][data[0]] = Object.assign({}, data[1])
        } else {
            states["tableCells"][data[0]] = Object.assign(states["tableCells"][data[0]], data[1])
        }
    }
})
