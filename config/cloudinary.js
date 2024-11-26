import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload the image to Cloudinary
export const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'users', // Optional: You can specify a folder for better organization
        });
        return result.secure_url; // Cloudinary provides a URL for the uploaded image
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }

};
export const uploadToCloudinaryProducts = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'products', // Optional: You can specify a folder for better organization
        });
        return result.secure_url; // Cloudinary provides a URL for the uploaded image
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }

};