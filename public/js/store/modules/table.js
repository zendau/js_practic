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
        console.log("data", data[0])
        console.log("type", typeof data[0])
        console.log("state", states)
        states["tableCells"][data[0]] = data[1]
    }
})
