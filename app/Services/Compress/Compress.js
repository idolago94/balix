import ImageResizer from 'react-native-image-resizer';
// import { RNFFmpeg, RNFFprobe } from 'react-native-ffmpeg';
import { NavigationStore } from '../../mobx';

class CompressService {

    async compressFile(file) {
        console.log('CompressService -> buildImageForUpload');
        let resizedFile = null;
        if(file.uri.includes('.png') || file.uri.includes('.jpg') || file.uri.includes('.jpeg')) {
            resizedFile = await this.resizeImage(file.uri, 1080, 100);
        } else {
            // resizedFile = await this.resizeVideo(file.uri, file.fileName);
            resizedFile = {
                uri: file.uri,
                name: file.fileName
            };
        }
        return resizedFile;
    }

    async buildProfileImage(imageData) {
        console.log('CompressService -> buildProfileImage');
        let resizedImage= await this.resizeImage(imageData.uri, 800, 100);
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

    // resizeVideo(videoURI, name) {
    //     return new Promise(resolve => {
    //         let output = videoURI.replace('.MOV', `-${new Date().getTime()}.MOV`);
    //         let command = `-i ${videoURI} -vcodec h264 -acodec aac ${output}`;
    //         RNFFmpeg.execute(command).then(result => {
    //             console.log('ffmpeg result', result);
    //             if(result.rc == 0) {
    //                 resolve({
    //                     uri: output,
    //                     name
    //                 })
    //             } else {
    //                 NavigationStore.setBanner('Video compress failed.');
    //             }
    //         });
    //     })
    // }
}

export default new CompressService();