import ImageResizer from 'react-native-image-resizer';
var RNFS = require('react-native-fs');

class UploadService {

    async buildImageForUpload(imageData) {
        console.log(imageData);
        let resizedImage= await this.resizeImage(imageData.uri, 100);
        return resizedImage;
    }

    resizeImage(imageURI, q) {
        return new Promise(resolve => {
            let data = null;
            ImageResizer.createResizedImage(imageURI, 1080, 1080, 'JPEG', q).then(result => {
                console.log('Resized image size: ', result.size);
                if(result.size > 500000) {
                    resolve(this.resizeImage(result.uri, q-1));
                } else {
                    data = {
                        contentType: 'image/jpeg',
                        width: result.width,
                        height: result.height,
                        size: result.size
                    }
                    RNFS.readFile(result.uri, 'base64').then(res => {
                        data.base64 = res;
                        resolve(data);
                    });
                }
            });
        });
    }
}

export default new UploadService();