const form = document.querySelector('form');

form.addEventListener('input', () => {
    const obj ={};

    const elements = form.elements;

    for (let element of elements) {

        if (!element.name || element.type === 'button' || element.type === 'submit' || element.type === 'reset' || element.type === 'file') continue;

        if (element.type === "checkbox") {
            if (!obj[element.name]) obj[element.name] = [];
            if (element.checked) obj[element.name].push(element.value);
        }

        else if (element.type === "radio") {
            if (element.checked) obj[element.name] = element.value;
        }

        else {
            obj[element.name] = element.value;
        }
    }

    localStorage.setItem('formData', JSON.stringify(obj));
})

window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('formData');
    if(!savedData) return;

    const data = JSON.parse(savedData);

    for(let key in data) {
        const elements = form.querySelectorAll(`[name="${key}"]`);

        elements.forEach(element => {
            if (element.type === 'checkbox') {
                element.checked = Array.isArray(data[key]) && data[key].includes(element.value);
            } else if (element.type === 'radio') {
                element.checked = (element.value === data[key]);
            } else {
                element.value = data[key];
            }
        })
    }
})