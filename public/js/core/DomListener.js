export class DomListener {
    constructor() {
        this.$events = ['input', 'hover', 'click']
    }

    addListener(element) {
        let elem;
        element.forEach((item, pos) => {
            elem = document.querySelector("."+element[pos][0])
            const arr = Object.keys(element[pos][1])
            arr.forEach(listener => {
                elem.addEventListener(listener, this[element[pos][1][listener].replace("()", "")])
            })
        })
        this.listener = element
    }

    removeListener(element) {
        let elem;
        element.forEach((item, pos) => {
            elem = document.querySelector("."+element[pos][0])
            const arr = Object.keys(element[pos][1])
            arr.forEach(listener => {
                elem.removeEventListener(listener, this[element[pos][1][listener].replace("()", "")])
            })
        })
        this.listener = element
    }
}
