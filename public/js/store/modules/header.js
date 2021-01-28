export const states = () => ({
    header: ""
})

export const actions = () => ({
    headerName(state, data) {
        state["header"] = data
    }
})
