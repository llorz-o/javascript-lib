function image2Blob({
    mime,
    zipRatio,
    src,
    ratio = 1,
}) {
    return new Promise((resolve, reject) => {
        createImage({
            src,
        }).then(({
            image,
            width,
            height
        }) => {
            try {
                const targetWidth = width * ratio
                const targetHeight = height * ratio
                const [canvas, context] = createCanvas({
                    width: targetWidth,
                    height: targetHeight
                });
                context.drawImage(image, 0, 0, width, height, 0, 0, targetWidth, targetHeight);
                // 压缩
                zipBlobByCanvas(canvas, {
                    mime,
                    ratio: zipRatio
                }).then(resolve)
            } catch (e) {
                return reject(e)
            }
        })
    })
}

function createImage({
    src,
    crossorigin = "anonymous",
} = {}) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossorigin = crossorigin
        image.onload = e => {
            const {
                width,
                height
            } = image;
            resolve({
                image: e.target,
                width,
                height
            })
        }
        image.onerror = err => reject(err)
        image.src = src;
    })
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

// 通过canvas压缩图片转换为blob
function zipBlobByCanvas(canvas, {
    mime = "image/jpeg",
    ratio = 1
} = {}) {
    return new Promise((resolve, reject) => {
        try {
            canvas.toBlob(blob => {
                if (blob === null) reject(new Error("blob is null"))
                resolve(blob);
            }, mime, ratio)
        } catch (error) {
            reject(error)
        }
    })
}

// blob to base64
function blob2Base64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => resolve(e.target.result)
        reader.onerror = err => reject(err)
        reader.readAsDataURL(blob)
    })
}

module.exports = {
    image2Blob,
    createImage,
    createCanvas,
    zipBlobByCanvas,
    blob2Base64
}