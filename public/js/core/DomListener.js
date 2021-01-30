export class DomListener {
    constructor() {
        this.$events = ['input', 'hover', 'click', "mousedown", "mouseup", "mousemove", "keydown", "load"]
    }

    addListener(element) {
        let elems
        element.forEach((item, pos) => {
            elems = document.querySelectorAll("."+element[pos][0])
            const arr = Object.keys(element[pos][1])
            elems.forEach(item => {
                arr.forEach(listener => {
                    item.addEventListener(listener, this[element[pos][1][listener].replace("()", "")].bind(this))
                    item.removeAttribute("@"+listener)
                })
            })
        })
        this.listener = element
    }
}
