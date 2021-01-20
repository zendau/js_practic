import {$} from "@core/DomCreater";

export function table_resize(event) {
    const event_element = event.target.dataset
    const Correct_element = $(event.target)
    const parent = Correct_element.getParent("[data-type='resize']")
    const bounds = parent.getBoundingClientRect()
    const num_cell = parent.innerText
    let delta

    if (event_element.type) {
        return
    }

    document.onmousemove = e => {
        if (event_element.coll) {
            delta = e.clientX - bounds.right
            Correct_element.css({
                "opacity": 1,
                "height": "2000px",
                "right": -delta + "px",
            })
        } else if (event_element.row) {
            delta = e.pageY - bounds.bottom
            Correct_element.css({
                "opacity": 1,
                "width": "2000px",
                "bottom": -delta + "px",
            })
        }
    }
    document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null
        Correct_element.css({"opacity": 0})

        if (event_element.coll) {
            const new_width = bounds.width + delta + "px"
            Array.from(document.querySelectorAll(`input[data-cell="${num_cell}"]`))
                .forEach(item => {
                    $(item).css({"width": new_width})
                })
            $(parent).css({'width': new_width})
            Correct_element.css({"right": 0})
        } else if (event_element.row) {
            const new_height = bounds.height + delta + "px"
            $(parent).css({'height': new_height})
            Correct_element.css({"bottom": 0})
        }
    }
}
