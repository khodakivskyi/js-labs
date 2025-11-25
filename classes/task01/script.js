class Modal {
    constructor(title = "Модальне вікно") {
        this.title = title;

        this.modalOverlay = document.createElement("div");
        this.modalOverlay.classList.add("modal-overlay");

        this.modalBox = document.createElement("div");
        this.modalBox.classList.add("modal-box");
        this.modalBox.style.position = "absolute";

        this.modalHeader = document.createElement("h2");
        this.modalHeader.textContent = this.title;
        this.modalHeader.style.cursor = "move";

        this.modalContent = document.createElement("div");

        this.closeButton = document.createElement("button");
        this.closeButton.textContent = "Закрити";
        this.closeButton.addEventListener("click", () => this.close());

        this.modalBox.appendChild(this.modalHeader);
        this.modalBox.appendChild(this.modalContent);
        this.modalBox.appendChild(this.closeButton);
        this.modalOverlay.appendChild(this.modalBox);

        document.body.appendChild(this.modalOverlay);

        this.initDrag();
    }

    open() {
        this.modalOverlay.classList.add("active");
    }

    close() {
        this.modalOverlay.classList.remove("active");
    }

    updateContent(content){
        this.modalContent.innerHTML = content;
    }

    initDrag() {
        let offsetX = 0, offsetY = 0;
        let isDragging = false;

        this.modalHeader.addEventListener("mousedown", (e) => {
            isDragging = true;
            const rect = this.modalBox.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            this.modalBox.style.transform = "none";

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        const onMouseMove = (e) => {
            if (!isDragging) return;
            this.modalBox.style.left = `${e.clientX - offsetX}px`;
            this.modalBox.style.top = `${e.clientY - offsetY}px`;
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }
}

const myModal = new Modal("text");

setTimeout(() => {
    myModal.open();
}, 1000);


setTimeout(() => {
    myModal.updateContent("<p>content</p>");
}, 5000);