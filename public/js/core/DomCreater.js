class DomCreater {
    constructor(selector) {
        if (selector.nodeType) {
            this.$el = selector
            this.$type = "node"
        } else if (selector[0] === "#") {
            this.$el = document.querySelector(selector)
            this.$type = "id"
        } else if (selector[0] === ".") {
            this.$el = document.querySelector(selector)
            this.$type = "class"
        } else if (selector instanceof DomCreater) {
            this.$el = selector.$el
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
            this.$el.innerHTML = data
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
            return $(this.$el.append(data))
        } else {
            const node = document.createElement("div")
            node.innerHTML = data
            Object.keys(node.children).forEach(item => this.$el.append(node.children[item]))
        }
        return this
    }

    getParent(data) {
        return this.$el.closest(data)
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
    }

    get dataset() {
        return this.$el.dataset
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    parse_id() {
        return this.$el.dataset.id.split(":").map(item => +item)
    }

    focus() {
        this.$el.focus()
        return this
    }

    value(data) {
        if (data != null) {
            this.$el.value = data
            return this
        }
        return this.$el.value
    }

    setAttr(name, data) {
        this.$el.setAttribute(name, data)
        return this
    }
}

export function $(selector) {
    return new DomCreater(selector)
}

