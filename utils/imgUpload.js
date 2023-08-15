const sharp = require('sharp');
const {Readable} = require('stream');
const {v2: cloudinary} = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.imageUpload = async (file, fileName) => {
    const height = fileName.startsWith("recipe") ? 1000 : 500;
    const width = fileName.startsWith("recipe") ? 1000 : 500;

    const imageBuffer = await sharp(file)
        .resize(height, width)
        .toFormat('jpeg', {quality: 90})
        .toBuffer();

    const streamUpload = () => {
        return new Promise((resolve, reject) => {
            const res = cloudinary.uploader.upload_stream({
                resource_type: fileName.startsWith("recipe") ? 'image' : 'avatar',
                folder: fileName.startsWith("recipe") ? "recipe-images" : "avatar-images",
                public_id: fileName,
                overwrite: true,
            }, (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            })

            const stream = Readable.from(imageBuffer);

            stream.pipe(res);
        })
    }

    const fileNameRes = await streamUpload();

    return fileNameRes.url;
}