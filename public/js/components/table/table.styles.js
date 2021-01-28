import {$} from "@core/DomCreater";

export function cellStyles(self, data) {
    const toolbar = $(".toolbar")
    const selected_size = $(".toolbar__range").value()
    switch (data[0]) {
    case "format_bold":
        if (toolbar.find("[data-bold]").dataset['bold'] === "true") {
            changeStyle(self, "fontWeight", "normal", "bold", self.select.selectedElements, false)
        } else {
            changeStyle(self, "fontWeight", "bold", "bold", self.select.selectedElements, true)
        }
        break

    case "format_italic":
        if (toolbar.find("[data-italic]").dataset['italic'] === "true") {
            changeStyle(self, "font-style", "normal", "italic", self.select.selectedElements, false)
        } else {
            changeStyle(self, "font-style", "italic", "italic", self.select.selectedElements, true)
        }
        break

    case "format_underlined":
        if (toolbar.find("[data-underline]").dataset['underline'] === "true") {
            changeStyle(self, "text-decoration", "none", "underline", self.select.selectedElements, false)
        } else {
            changeStyle(self, "text-decoration", "underline", "underline", self.select.selectedElements, true)
        }
        break

    case "format_size":
        self.select.selectedCell.css({
            "font-size": selected_size+"px"
        })
        changeStyle(self, "font-size", selected_size+"px", "fz", self.select.selectedElements, selected_size+"px")
        currectSizeCell(self)
        break

    case "format_align_left":
        changeStyle(self, "text-align", "left", "align", self.select.selectedElements, "left")
        break

    case "format_align_center":
        changeStyle(self, "text-align", "center", "align", self.select.selectedElements, "center")
        break

    case "format_align_right":
        changeStyle(self, "text-align", "right", "align", self.select.selectedElements, "right")
        break

    case "format_clear":
        self.select.selectedCells.forEach(cell =>{
            cell.css({
                "fontWeight": "normal",
                "font-style": "normal",
                "text-decoration": "none",
                "text-align": "left",
                "font-size": "18px"
            })
        })
        self.$dispatch("clearStyle", self.select.selectedElements)
        self.$emit("toolbar:clear")
        break
    }
    if (data[0] !== "format_clear") {
        self.$emit("toolbar:active", self.getStore("tableCells"), self.select.selectedCeLLid)
    }
}

export function currectSizeCell(self) {
    const item = self.select.selectedCell
    const child_node = $(item.getParent(".table__rows").children[0])
    const bounds = (item.$el.getBoundingClientRect().height) + "px"
    self.$dispatch("tableRows", [
        child_node.dataset['row_id'],
        {"value": bounds}])
    child_node.css({
        "height": bounds
    })
}

function changeStyle(self, style, value, name, id, bool) {
    self.select.selectedCells.forEach(cell =>{
        cell.css({
            [style]: value
        })
    })
    self.$dispatch("tableCells", [id, {[name]: bool}])
}

