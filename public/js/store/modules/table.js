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
        if (typeof data[0] !== "object") {
            data[0] = [data[0]]
        }
        data[0].forEach(id => {
            if (states["tableCells"][id] === undefined) {
                states["tableCells"][id] = Object.assign({}, data[1])
            } else {
                states["tableCells"][id] = Object.assign(states["tableCells"][id], data[1])
            }
        })
    },
    clearStyle(states, data) {
        let prev_value
        if (typeof data !== "object") {
            data = [data]
        }
        data.forEach(id => {
            prev_value = states["tableCells"][id]['text']
            states["tableCells"][id] = {}
            states["tableCells"][id]['text'] = prev_value
        })
    }
})
