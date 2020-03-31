import ImageResizer from 'react-native-image-resizer';
var RNFS = require('react-native-fs');

class CompressService {

    async compressFile(imageData) {
        console.log('CompressService -> buildImageForUpload');
        let resizedImage= await this.resizeImage(imageData.uri, 1080, 100);
        return resizedImage;
    }

    async buildProfileImage(imageData) {
        console.log('CompressService -> buildProfileImage');
        let resizedImage= await this.resizeImage(imageData.uri, 800, 800);
        return resizedImage;
    }

    resizeImage(imageURI, size, quality) {
        return new Promise(resolve => {
            ImageResizer.createResizedImage(imageURI, size, size, 'JPEG', quality).then(result => {
                console.log('Resized image size: ', result.size);
                if(result.size > 500000) {
                    resolve(this.resizeImage(result.uri, size, quality-1));
                } else {
                    resolve(result);
                    // {path, size, width, height, name, uri}
                }
            });
        });
    }
}

export default new CompressService();