class Table {
    constructor(container, data = []) {
        this.container = container;
        this.data = data;

        this.table = document.createElement("table");
        this.table.style.borderCollapse = "collapse";
        this.table.style.width = "50%";
        this.container.appendChild(this.table);

        const headers = Object.keys(data[0]);

        this.renderHeader(headers);
        data.forEach(row => {
            this.addRow(row)
        });
    }

    renderHeader(headers) {
        this.thead = document.createElement('thead');
        const tr = document.createElement('tr');

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.style.border = "1px solid black";
            th.style.padding = "5px";
            tr.appendChild(th);
        });

        this.thead.appendChild(tr);
        this.table.appendChild(this.thead);
    }

    addRow(rowObj) {
        if (!this.tbody) {
            this.tbody = document.createElement('tbody');
            this.table.appendChild(this.tbody);
        }

        const row = Object.values(rowObj);
        const tr = document.createElement('tr');

        row.forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            td.style.border = "1px solid black";
            td.style.padding = "5px";
            tr.appendChild(td);
        });

        this.tbody.appendChild(tr);
    }

    addColumn(column = []) {
        if (!this.tbody || !this.thead) return

        const headerRow = this.thead.querySelector('tr');
        const th = document.createElement('th');
        th.textContent = column[0];
        th.style.border = "1px solid black";
        th.style.padding = "5px";
        headerRow.appendChild(th);

        for (let i = 1; i < column.length; i++) {
            const td = document.createElement('td');
            td.textContent = column[i];
            td.style.border = "1px solid black";
            td.style.padding = "5px";

            if(this.tbody.rows[i - 1]){
                this.tbody.rows[i - 1].appendChild(td);
            }
        }
    }
}

const data = [
    {Name: "Олексій", Age: 25, City: "Київ"},
    {Name: "Марія", Age: 30, City: "Львів"},
    {Name: "Іван", Age: 22, City: "Одеса"}
];

const container = document.getElementById("table-container");

const table = new Table(container, data);
