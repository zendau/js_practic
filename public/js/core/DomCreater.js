class DomCreater {
    constructor(selector) {
        if (selector.nodeType) {
            this.$el = document.querySelector(selector)
            this.$type = "node"
        } else if (selector[0] === "#") {
            this.$el = document.querySelector(selector)
            this.$type = "id"
        } else if (selector[0] === ".") {
            this.$el = document.querySelector(selector)
            this.$type = "class"
        } else {
            this.$el = document.createElement(selector)
            this.$type = "node"
        }
    }
    html(data) {
        if (data.nodeType) {
            this.$el.append(data)
            return this
        } else {
            const split_arr = data.split(">")
            if (split_arr.length === 1) {
                // eslint-disable-next-line no-throw-literal
                throw new Error("data not html")
            }
            const selector = split_arr[0].substring(1, split_arr[0].length)
            const body_data = data.substring(selector.length+2, data.length-selector.length - 3)
            const node = document.createElement(selector)
            node.textContent = body_data
            this.$el.append(node)
            return this
        }
    }

    text(data) {
        if (data.nodeType) {
            this.$el.append(data)
            return this
        } else {
            const node = document.createTextNode(data)
            this.$el.append(node)
            return this
        }
    }

    clear() {
        this.$el.textContent = ""
    }

    addClass(list) {
        if (typeof list === 'string') {
            this.$el.classList.add(list)
        } else {
            list.forEach(elem => this.$el.classList.add(elem))
        }
        return this
    }

    removeClass(list) {
        if (typeof list === 'string') {
            this.$el.classList.remove(list)
        } else {
            list.forEach(elem => this.$el.classList.remove(elem))
        }
        return this
    }

    append(data) {
        if (data.nodeType) {
            this.$el.append(data)
        } else {
            let html = this.$el.innerHTML
            html += data
            this.$el.innerHTML = html
        }
    }
}

export function $(selector) {
    return new DomCreater(selector)
}

