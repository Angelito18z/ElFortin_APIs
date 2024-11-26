import pool from '../../config/db.js';

const saveImagePath = async (type, id, filePath) => {
    let tableName = '';
    if (type === 'user') {
      tableName = 'user_images';
    } else if (type === 'product') {
      tableName = 'product_images';
    } else if (type === 'review') {
      tableName = 'review_images';
    } else {
      throw new Error('Invalid type');
    }
  
    try {
      const query = `INSERT INTO ${tableName} (id, image_path) VALUES ($1, $2) RETURNING *`;
      const values = [id, filePath];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error inserting data into PostgreSQL');
    }
  };
  
  export default saveImagePath;
