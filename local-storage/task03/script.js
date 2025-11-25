class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.grades = [];
    }
}

class ListOfStudents {
    constructor(students = []) {
        this.students = students;
    }

    getTableList() {
        const headers = ['Name', 'LastName', 'Math', 'History', 'JS'];
        let html = '<table><thead><tr>';
        headers.forEach(header => {
            html += `<th>${header}</th>`;
        });
        html += '</tr></thead><tbody>';
        this.students.forEach(student => {
            html += '<tr>';
            html += `<td>${student.firstName}</td>`;
            html += `<td>${student.lastName}</td>`;
            student.grades.forEach(grade => {
                html += `<td>${grade}</td>`;
            })
            html += '</tr>';
        });
        html += '</tbody></table>';
        return html;
    }
}

class StylesTable extends ListOfStudents {
    constructor(students = []) {
        super(students);
    }

    getStyles() {
        return `
<style>
    table {
        border-collapse: collapse;
        width: 100%;
        max-width: 600px;
        margin: 20px 0;
    }
    th {
        background-color: #4CAF50;
        color: white;
        padding: 12px;
        text-align: center;
        font-weight: bold;
    }
    td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
</style>
        `.trim();
    }

    getTableList() {
        const table = super.getTableList();
        const tableWithAvg = this.getAvg(table);
        return this.getStyles() + tableWithAvg;
    }

    getAvg(tableHtml, returnAvgOnly=false, studentIndex = null) {
        if (returnAvgOnly && studentIndex !== null) {
            const student = this.students[studentIndex];
            if (student && student.grades.length > 0) {
                let gradesSum = 0;
                student.grades.forEach(grade => {
                    gradesSum += grade;
                });
                return parseFloat((gradesSum / student.grades.length).toFixed(2));
            }
            return 0;
        }

        if (!tableHtml) {
            return '';
        }

        let result = tableHtml;

        result = result.replace('</tr></thead>', '<th>Avg</th></tr></thead>');

        this.students.forEach((student) => {
            if (student.grades.length > 0) {
                let gradesSum = 0;
                student.grades.forEach(grade => {
                    gradesSum += grade;
                });
                const avg = parseFloat((gradesSum / student.grades.length).toFixed(2));

                const studentRowPattern = new RegExp(`(<tr>.*?${student.firstName}.*?${student.lastName}.*?)</tr>`, 's');
                result = result.replace(studentRowPattern, `$1<td>${avg}</td></tr>`);
            }
        });

        return result;
    }

    getTotalAvg() {
        let totalAvgs = 0;
        this.students.forEach((student, index) => {
            totalAvgs += this.getAvg(null, true, index)
        })

        const avg = parseFloat((totalAvgs / this.students.length).toFixed(2));

        return `Середній бал по групі: ${avg}`;
    }
}

const student1 = new Student('Федорко', 'Петро');
student1.grades = [3, 4, 5];

const student2 = new Student('Остапенко', 'Сергій');
student2.grades = [4, 5, 5];

const student3 = new Student('Колос', 'Олеся');
student3.grades = [4, 3, 3];

const listOfStudents = new StylesTable([student1, student2, student3]);

document.body.innerHTML = listOfStudents.getTableList();
listOfStudents.getAvg(document.body.innerHTML);

const totalAvgBlock = document.createElement('div');
totalAvgBlock.innerText = listOfStudents.getTotalAvg();
document.body.appendChild(totalAvgBlock);