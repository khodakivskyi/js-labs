class Slider {
    constructor(container, direction="horizontal") {
        this.container = container;
        this.direction = direction;
        this.slides = [];
        this.currentIndex = 0;

        if(this.direction === "horizontal") {
            this.prevButton = document.createElement("button");
            this.prevButton.textContent = "prev";
            this.prevButton.addEventListener("click", () => this.prev());

            this.nextButton = document.createElement("button");
            this.nextButton.textContent = "next";
            this.nextButton.addEventListener("click", () => this.next());

            this.prevButton.style.position = this.nextButton.style.position = "absolute";
            this.prevButton.style.top = this.nextButton.style.top = "50%";
            this.prevButton.style.transform = this.nextButton.style.transform = "translateY(-50%)";
            this.prevButton.style.left = "10px";
            this.nextButton.style.right = "10px";
            this.prevButton.style.zIndex = this.nextButton.style.zIndex = "10";
        }
        else if(this.direction === "vertical") {
            this.prevButton = document.createElement("button");
            this.prevButton.textContent = "up";
            this.prevButton.addEventListener("click", () => this.prev());

            this.nextButton = document.createElement("button");
            this.nextButton.textContent = "down";
            this.nextButton.addEventListener("click", () => this.next());

            this.prevButton.style.position = this.nextButton.style.position = "absolute";
            this.nextButton.style.top = "100%";
            this.prevButton.style.top = "0";
            this.prevButton.style.zIndex = this.nextButton.style.zIndex = "10";
            this.prevButton.style.left = "40%";
            this.nextButton.style.left = "40%";
        }

        this.container.appendChild(this.prevButton);
        this.container.appendChild(this.nextButton);
    }

    addSlide(content) {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        slide.innerHTML = content;

        if (this.slides.length === 0) {
            slide.classList.add("active");
        }

        this.container.appendChild(slide);
        this.slides.push(slide);
    }

    update() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === this.currentIndex);
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.update();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.update();
    }
}

const container = document.getElementById("slider-container");
const slider = new Slider(container, "vertical");

const images = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-free-desktop-wallpaper-beautiful-green-fields-image_2950823.jpg"
];

images.forEach(src => {
    slider.addSlide(`<img src="${src}" style="width:100%; height:100%; object-fit: cover;" alt="">`);
});
