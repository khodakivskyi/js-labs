function showImages(){
    const input = document.querySelector('input');
    const message = document.querySelector('.message');

    if(!isValidFileArrayJson(input.value)){
        message.innerHTML = 'Неправильна структура JSON';
        message.style.color = 'red';
        message.style.display = 'block';
    }
    else{
        message.innerHTML = 'OK';
        message.style.color = 'green';
        message.style.display = 'block';

        const arr =JSON.parse(input.value).map(item => item.trim());

        const imagesSmallBlock = document.querySelector('.images-small');
        const imagesBigBlock = document.querySelector('.images-big');

        arr.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            imagesSmallBlock.appendChild(img);
        })

        arr.forEach((image) => {
            const img = document.createElement('img');
            img.src = image;
            imagesBigBlock.appendChild(img);
        })

        imagesSmallBlock.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                document.querySelectorAll('.current').forEach(item => {
                    item.classList.remove('current');
                })

                const src = e.target.getAttribute('src');
                const currentImg = imagesBigBlock.querySelector(`img[src='${src}']`);
                currentImg.classList.toggle('current');
            }
        })
    }
}

function isValidFileArrayJson(str) {
    try {
        const data = JSON.parse(str);

        if (!Array.isArray(data)) return false;

        return data.every(item => typeof item === "string");
    } catch {
        return false;
    }
}
