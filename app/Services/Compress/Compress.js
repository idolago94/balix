import ImageResizer from 'react-native-image-resizer';
var RNFS = require('react-native-fs');
import RNVideoHelper from 'react-native-video-helper';

class CompressService {

    async compressFile(file) {
        console.log('CompressService -> buildImageForUpload');
        let resizeImage = null;
        if(file.type) {
            resizedImage = await this.resizeImage(file.uri, 1080, 100);
        } else {
            this.resizeVideo(file.uri);
        }
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

    resizeVideo(videoURI) {
        // RNVideoHelper.compress(videoURI, {
        //     quality: 'low', // default low, can be medium or high
        //     defaultOrientation: 0 // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
        // }).then(compressedUri => {
        //     debugger;
        //     console.warn('compressedUri', compressedUri); // String with path to temporary compressed video
        // });
    }
}

export default new CompressService();