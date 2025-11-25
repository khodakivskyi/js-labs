//fetch photos task(1)
const photosBlock = document.querySelector('.photos');
const API_URL = "https://dog.ceo/api/breeds/image/random";

document.querySelector('#addPhotoBtn').addEventListener('click', addPhoto)

function addPhotoToDOM(url) {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Dog';
    img.style.width = '200px';
    img.style.margin = '10px';
    photosBlock.appendChild(img);
}

async function addPhoto() {
    try{
        const response = await fetch(API_URL);
        const data = await response.json();
        addPhotoToDOM(data.message);
        savePhotoToStorage(data.message);
    }
    catch(err){
        alert(err);
    }
}

//fullscreen task(2)
let isFullscreen = false;
document.querySelector('#fullscreenBtn').addEventListener('click', (e)=>{
    if(!isFullscreen) e.target.innerText = 'Change to default screen';
    else e.target.innerText = 'Enter fullscreen';
    fullscreenView();
})

async function fullscreenView() {
    if (!isFullscreen) {
        await document.body.requestFullscreen();
        isFullscreen = true;
    } else {
        await document.exitFullscreen();
        isFullscreen = false;
    }
}

//localStorage task(3)
function savePhotoToStorage(url) {
    const savedPhotos = JSON.parse(localStorage.getItem('dogsPhotos') || '[]');
    savedPhotos.push(url);
    localStorage.setItem('dogsPhotos', JSON.stringify(savedPhotos));
}

window.addEventListener('DOMContentLoaded', () => {
    const savedPhotos = JSON.parse(localStorage.getItem('dogsPhotos') || '[]');
    savedPhotos.forEach(url => addPhotoToDOM(url));
});