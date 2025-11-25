const container = document.querySelector("#container");
const blocksCount = 5;
const blocks = [];

function createBlock() {
    const block = document.createElement("div");
    block.className = "block";

    block.style.left = Math.random() * (window.innerWidth - 50) + "px";
    block.style.top = Math.random() * (window.innerHeight - 50) + "px";

    block.dx = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 3);
    block.dy = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 3);

    container.append(block);
    blocks.push(block);
}

for (let i = 0; i < blocksCount; i++) {
    createBlock();
}

function moveBlocks() {
    const w = container.clientWidth;
    const h = container.clientHeight;

    blocks.forEach(block => {
        let x = parseFloat(block.style.left);
        let y = parseFloat(block.style.top);

        x += block.dx;
        y += block.dy;

        if (x <= 0 || x >= w - 50) block.dx *= -1;
        if (y <= 0 || y >= h - 50) block.dy *= -1;

        block.style.left = x + "px";
        block.style.top = y + "px";
    });

    setTimeout(moveBlocks, 16);
}

setTimeout(moveBlocks, 16);
