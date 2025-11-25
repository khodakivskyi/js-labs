class Shape{
    static total = 100;

    constructor(a){
        this.a=a;
    }

    static fill(){
        Shape.total = 100;
    }

    draw(){
        const resultBlock = document.querySelector('.result');

        const shape = document.createElement('div');
        shape.style.width = this.a + 'px';
        shape.style.height = this.a + 'px';

        const colorIntensity = Shape.total / 100;
        shape.style.backgroundColor = `rgba(255, 0, 0, ${colorIntensity})`;

        Shape.total -= 10;

        resultBlock.appendChild(shape);
    }
}

document.querySelector('.draw').addEventListener('click', () => {
    const square = new Shape(50);
    square.draw();
});

document.querySelector('.fillPaint').addEventListener('click', () => {
    Shape.fill();
});