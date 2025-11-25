const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-free-desktop-wallpaper-beautiful-green-fields-image_2950823.jpg"
];

const imagesState = [];

images.forEach((image, index) => {
    const img = document.createElement('img')
    img.src = image;
    img.style.display = "none";

    imagesState[index]= { element: img, index: index };
    document.body.appendChild(img);
})

let currentIndex = 0;

function changeImage(){
    imagesState.forEach(image => {
        image.element.style.display = "none";
    })

    if (currentIndex > imagesState.length - 1) {
        currentIndex = 0;
    }
    imagesState[currentIndex++].element.style.display="block";
}

changeImage();
setInterval(changeImage, 4000);