class Table {
    constructor (text=null, title=null, data=null) {
        if (text != null) {
            this.convert_text_to_data(text)
        } else if (data != null) {
            this.title = title
            this.data = data
        }
    }

    convert_text_to_data(text) {
        const rows = text.split('\n')
        this.title = rows.shift()
        let data = []

        rows.forEach((row, rowIndex) => {
            if (row.length == 0) {
                return
            }
            const cells = row.split('\t')
            let row_data = []
            cells.forEach((cell, cellIndex) => {
                cell = cell.trim()
                if (!isNaN(cell)) {
                    row_data.push(Number(cell))
                } else {
                    row_data.push(cell)
                }
            });
            data.push(row_data)
        });

        this.data = data
    }

    display(parent_element) {
        const table = document.createElement("table")
        const thead = document.createElement("thead")
        const tbody = document.createElement("tbody")

        this.data.forEach((row, rowIndex) => {
            const rowHTML = document.createElement("tr")
            console.log(rowIndex)
            row.forEach((cell, cellIndex) => {
                let cellHTML = document.createElement("td")
                if (rowIndex == 0) {
                    cellHTML = document.createElement("th")
                }
                if (typeof cell == "number") {
                    if (cell <= 4.7) {
                        cellHTML.style.backgroundColor = "red"
                    } else {
                        cellHTML.style.backgroundColor = "green"
                    }
                    cellHTML.s
                }
                cellHTML.textContent = cell
                rowHTML.appendChild(cellHTML)
            });
            if (rowIndex == 0) {
                thead.appendChild(rowHTML)
            } else {
                tbody.appendChild(rowHTML)
            }
        })
        table.appendChild(thead)
        table.appendChild(tbody)

        const title = document.createElement("h4")
        title.textContent = this.title
        parent_element.appendChild(title)
        parent_element.appendChild(table)
    }
}
function addTable() {
    const input = document.getElementById('input');
    const output = document.getElementById('output_input');
    let table = new Table(text=input.value)
    table.display(output)
}
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    input.addEventListener('paste', (event) => {
        setTimeout(addTable, 0);
    });
});