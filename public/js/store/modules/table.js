export const states = () => ({
    tableCell: {
        1: {
            value: 150
        },
        2: {
            value: 500
        }
    },
    tableStyle: {},
    rowStyle: {},
    collStyle: {}
})


export const actions = () => ({
    tableResize(states, data) {
        states["tableCell"][data[0]] = data[1]
    }
})
