import images from './images';

export default imageService = {
    getAllImages: () => {
        return images
    },
    getUserImages: (userId) => {
        return images.filter(img => img.userId == userId)
    }
}