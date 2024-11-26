import multer from 'multer';
import path from 'path';

// Configure Multer storage for users
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

// Configure Multer storage for products
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

// Configure Multer storage for promotions
const promotionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/promotions'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

// Create multer instance for users
const uploadUserImage = multer({
  storage: userStorage,
  fileFilter: (req, file, cb) => {
    const validExtensions = ['.png', '.jpg', '.jpeg'];
    if (!validExtensions.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
});

// Create multer instances for products and promotions
const uploadProductImage = multer({
  storage: productStorage,
  fileFilter: (req, file, cb) => {
    const validExtensions = ['.png', '.jpg', '.jpeg'];
    if (!validExtensions.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
});

const uploadPromotionImage = multer({
  storage: promotionStorage,
  fileFilter: (req, file, cb) => {
    const validExtensions = ['.png', '.jpg', '.jpeg'];
    if (!validExtensions.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
});

// Export all multer instances
export default uploadUserImage; // Use default export
