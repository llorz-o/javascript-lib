const {
    image2Blob,
    createCanvas,
    createImage
} = require("./image.js");

(() => {
    const {
        image,
        width,
        height
    } = createImage({
        src: "./public/assets/2020-12-23-2620414866219008.jpg",
        imageLoaded() {
            const [canvas, context] = createCanvas({
                width: width / 2,
                height: height / 2
            });

            context.drawImage(image, 0, 0, width, height, 0, 0, width/2, height/2);

            document.getElementsByTagName("body")[0].appendChild(canvas)

            console.log(image, canvas);
        }
    });




})()