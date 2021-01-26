import {$} from "@core/DomCreater";
import {Toolbar} from "@/js/components/toolbar";

export function cellStyles(self, data) {
    const cell = $(self.select.selectedCell)
    const toolbar = $(".toolbar")
    let cell_fn_size = Toolbar.default_styles["fz"]
    switch (data[0]) {
    case "format_bold":
        if (toolbar.find("[data-bold]").dataset['bold'] === "true") {
            self.select.selectedCell.css({
                "fontWeight": "normal"
            })
            self.$dispatch("tableCells", [cell.dataset.id, {bold: false}])
        } else {
            self.select.selectedCell.css({
                "fontWeight": "bold"
            })
            self.$dispatch("tableCells", [cell.dataset.id, {bold: true}])
        }
        break

    case "format_italic":
        if (toolbar.find("[data-italic]").dataset['italic'] === "true") {
            self.select.selectedCell.css({
                "font-style": "normal"
            })
            self.$dispatch("tableCells", [cell.dataset.id, {italic: false}])
        } else {
            self.select.selectedCell.css({
                "font-style": "italic"
            })
            self.$dispatch("tableCells", [cell.dataset.id, {italic: true}])
        }
        break

    case "format_underlined":
        if (toolbar.find("[data-underline]").dataset['underline'] === "true") {
            self.select.selectedCell.css({
                "text-decoration": "none"
            })
            self.$dispatch("tableCells", [cell.dataset.id, {underline: false}])
        } else {
            self.select.selectedCell.css({
                "text-decoration": "underline"
            })
            self.$dispatch("tableCells", [cell.dataset.id, {underline: true}])
        }
        break

    case "format_size":
        // eslint-disable-next-line no-case-declarations
        const num_size = self.select.selectedCell.$el.style.fontSize
        console.log("num_size", num_size)
        console.log("type size", num_size)
        if (num_size === Toolbar.default_styles['fz'] || num_size === "") {
            self.select.selectedCell.css({
                "font-size": "20px"
            })
        } else {
            cell_fn_size = self.select.selectedCell.$el.style.fontSize
            cell_fn_size = parseInt(cell_fn_size.substr(0, cell_fn_size.length-2))
            self.select.selectedCell.css({
                "font-size": (cell_fn_size+2)+"px"
            })
        }
        self.$dispatch("tableCells", [cell.dataset.id, {fz: cell_fn_size+"px"}])
        currectSizeCell(self)
        break

    case "format_align_left":
        self.select.selectedCell.css({
            "text-align": "left"
        })
        self.$dispatch("tableCells", [cell.dataset.id, {align: "left"}])

        break

    case "format_align_center":
        self.select.selectedCell.css({
            "text-align": "center"
        })
        self.$dispatch("tableCells", [cell.dataset.id, {align: "center"}])

        break

    case "format_align_right":
        self.select.selectedCell.css({
            "text-align": "right"
        })
        self.$dispatch("tableCells", [cell.dataset.id, {align: "right"}])

        break

    case "format_clear":
        self.select.selectedCell.css({
            "fontWeight": "normal",
            "font-style": "normal",
            "text-decoration": "none",
            "text-align": "left",
            "font-size": "18px"
        })
        currectSizeCell(self)
        self.$dispatch("clearStyle", [cell.dataset.id])
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
