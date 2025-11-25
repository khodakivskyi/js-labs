class Form {
    constructor(container, options = {}) {
        this.container = container;
        this.fields = [];
        this.submitHandler = null;

        this.form = document.createElement('form');
        this.form.classList.add('form-wrapper');
        this.form.noValidate = true;
        this.container.appendChild(this.form);

        if (options.fields) {
            options.fields.forEach(f => this.addField(f));
        }

        if (options.onSubmit) {
            this.onSubmit(options.onSubmit);
        }
    }

    addField({ label, name, type = 'text', required = false, placeholder = '' }) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('form-field');

        const labelEl = document.createElement('label');
        labelEl.textContent = label;

        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;
        input.required = required;

        wrapper.appendChild(labelEl);
        wrapper.appendChild(input);
        this.form.appendChild(wrapper);

        this.fields.push({ name, input, required, type, label });
    }

    addButton(text, type = 'submit') {
        const btn = document.createElement('button');
        btn.type = type;
        btn.textContent = text;
        btn.classList.add('form-button');
        this.form.appendChild(btn);
    }

    validate() {
        const errors = [];
        
        this.fields.forEach(f => {
            const value = f.input.value.trim();
            
            if (f.required && !value) {
                errors.push(`Поле "${f.label}" є обов'язковим для заповнення.`);
                return;
            }
            
            if (!value) {
                return;
            }
            
            if (f.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors.push(`Поле "${f.label}" має містити правильну електронну адресу (наприклад: example@mail.com).`);
                }
            }
            
            if (f.type === 'password') {
                if (value.length < 6) {
                    errors.push(`Поле "${f.label}" має містити мінімум 6 символів.`);
                }
            }
        });
        
        return errors;
    }

    onSubmit(callback) {
        this.submitHandler = callback;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const errors = this.validate();
            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }
            const formData = {};
            this.fields.forEach(f => {
                formData[f.name] = f.input.value;
            });
            this.submitHandler(formData);
        });
    }
}


const container = document.querySelector('#form-container');

const myForm = new Form(container, {
    fields: [
        { label: "Ім'я", name: "name", required: true },
        { label: "Електронна пошта", name: "email", type: "email", required: true },
        { label: "Пароль", name: "password", type: "password", required: true },
    ],
    onSubmit: (data) => {
        alert(`Привіт, ${data.name}!`);
    }
});

myForm.addButton("Відправити");
