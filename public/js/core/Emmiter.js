export class Emmiter {
    constructor() {
        this.listeners = {}
    }

    on(event, fn) {
        this.listeners[event] = fn
    }

    emit(event, ...args) {
        this.listeners[event](args)
    }

    off(event, fn) {
        this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
}
