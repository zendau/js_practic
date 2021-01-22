export class StateX {
    constructor(data) {
        this.state = {}
        this.actions = {}
        this.subscribers = []
        this.init(data)
    }

    getter(data = "all") {
        if (data === "all" ) {
            return this.state
        }
        return this.state[data]
    }

    mutation() {

    }

    dispatch(type, args) {
        this.actions[type](this.state, args)
        this.subscribers.forEach(sub => sub(this.state))
    }

    init(data) {
        const data_states = this.reduce_modules(data["state"])
        Object.keys(data_states).forEach(key => this.state[key] = data_states[key])

        const data_actions = this.reduce_modules(data["action"])
        Object.keys(data_actions).forEach(key => this.actions[key] = data_actions[key])
    }

    reduce_modules(modules) {
        const data = []
        modules.forEach(module => data.push(module()))

        if (this.check_copy(data)) {
            console.log("Success")
            const reduce = {}
            data.forEach(item => Object.assign(reduce, item))
            return reduce
        } else {
            return false
        }
    }

    check_copy(data) {
        const data_keys = data.map(key => Object.keys(key))
        const con_arr = [].concat(...data_keys)
        con_arr.forEach((item, index) => {
            if (con_arr.includes(item, index+1)) {
                throw new Error(`State's name "${item}" already used`)
            }
        })
        return true
    }

    subscribe(fn) {
        this.subscribers.push(fn)
    }

    unSubsctibe(fn) {
        this.subscribers = this.subscribers.filter(sub => sub !== fn)
    }
}
