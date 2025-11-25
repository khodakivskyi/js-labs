class Notification {
    constructor(container = document.body) {
        this.container = container;

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('notification-wrapper');
        this.container.appendChild(this.wrapper);
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.classList.add(type);
        
        const messageText = document.createTextNode(message);
        notification.appendChild(messageText);

        const closeBtn = document.createElement('span');
        closeBtn.textContent = '×';
        closeBtn.classList.add('notification-close');
        closeBtn.addEventListener('click', () => this.close(notification));
        notification.appendChild(closeBtn);

        this.wrapper.appendChild(notification);

        if (duration > 0) {
            setTimeout(() => this.close(notification), duration);
        }
    }

    close(notification) {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

const notifier = new Notification();

const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('buttons-container');
document.body.appendChild(buttonsContainer);

const buttons = [
    {
        text: 'Success',
        type: 'success',
        message: "Дані успішно збережено!"
    },
    {
        text: 'Error',
        type: 'error',
        message: "Помилка при з'єднанні з сервером!"
    },
    {
        text: 'Warning',
        type: 'warning',
        message: "Увага! Поле не може бути порожнім!"
    },
    {
        text: 'Info',
        type: 'info',
        message: "Інформаційне повідомлення"
    }
];

buttons.forEach(buttonConfig => {
    const button = document.createElement('button');
    button.textContent = buttonConfig.text;
    button.classList.add('notification-button');
    button.classList.add(buttonConfig.type);
    
    button.addEventListener('click', () => {
        notifier.show(buttonConfig.message, buttonConfig.type);
    });
    
    buttonsContainer.appendChild(button);
});

