function image2Blob() {

}

function createImage({
    src,
    crossorigin = "anonymous",
    imageLoaded = () => {}
} = {}) {
    const image = new Image();

    image.crossorigin = crossorigin
    image.onload = imageLoaded
    image.src = src;

    const {
        width,
        height
    } = image;

    console.log(width,
        height);

    return {
        image,
        width,
        height
    }
}



function createCanvas({
    width = 100,
    height = 100,
} = {}) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');

    return [canvas, context]
}

module.exports = {
    image2Blob,
    createImage,
    createCanvas,
}