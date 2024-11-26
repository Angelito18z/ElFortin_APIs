import imageModel from '../../models/imageModel.js';
// Controller to handle the image upload logic
const uploadImage = async (req, res) => {
    const { type, id } = req.body; // 'type' can be 'user', 'product', or 'review'
    const filePath = path.join('uploads', type + 's', req.file.filename); // Dynamic path
  
    try {
      // Save the image path in the database
      const imageRecord = await imageModel.saveImagePath(type, id, filePath);
      
      // Send response back to the client
      res.status(200).json({
        message: 'Image uploaded successfully!',
        imagePath: imageRecord.image_path,
      });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: err.message });
    }
  };
  
export { uploadProductImage, uploadPromotionImage, uploadUserImage };