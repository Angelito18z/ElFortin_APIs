import bcrypt from 'bcrypt';
import pool from '../../config/db.js';
import { uploadToCloudinary } from '../../config/cloudinary.js';

class User {

    static async findAll() {
        const result = await pool.query('SELECT * FROM users WHERE deleted_at IS NULL');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL', [id]);
        return result.rows[0];
    }

    static async create(data, filePath) {
        const { name, email, phone, user_type, nickname, password } = data;
        
        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Upload image to Cloudinary if a filePath is provided
        let imageUrl = null;
        if (filePath) {
            imageUrl = await uploadToCloudinary(filePath);
        }
        
        const result = await pool.query(
            'INSERT INTO users (name, email, phone, user_type, nickname, encrypted_password, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, email, phone, user_type, nickname, hashedPassword, imageUrl]
        );
        return result.rows[0];
    }

    static async update(id, data, filePath) {
        const { name, email, phone, user_type, nickname, password } = data;
    
        let hashedPassword = null;
        if (password) {
            // Hash the new password if provided
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }
    
        // Upload new image to Cloudinary if a filePath is provided
        let imageUrl = null;
        if (filePath) {
            imageUrl = await uploadToCloudinary(filePath);
        }
    
        const result = await pool.query(
            `
            UPDATE users
            SET 
                name = $1,
                email = $2,
                phone = $3,
                user_type = $4,
                nickname = $5,
                encrypted_password = COALESCE($6, encrypted_password),
                image_url = COALESCE($7, image_url) -- Update image URL only if provided
            WHERE id = $8
            RETURNING *
            `,
            [name, email, phone, user_type, nickname, hashedPassword, imageUrl, id]
        );
    
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query(
            'UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND deleted_at IS NULL RETURNING *',
            [id]
        );
        return result.rows[0];
    }

    static async getUsersExcel() {
        const query = `
        SELECT name, email, phone, user_type, nickname 
        FROM users 
        WHERE deleted_at IS NULL
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async getUserByEmailOrUsername(data) {
        const { emailOrNickname  } = data;

        if (!emailOrNickname  || typeof emailOrNickname  !== "string") {
            throw new Error("Invalid input: Input must be a non-empty string.");
          }

        const TrimmedCredentials = emailOrNickname.trim();

        const result = await pool.query(
            `
        SELECT 
            id, name, email, phone, user_type, nickname, 
            PGP_SYM_DECRYPT(encrypted_password::bytea, 'AES_KEY') AS decrypted_password
        FROM users 
        WHERE LOWER(email) = LOWER($1) OR LOWER(nickname) = LOWER($1)
        `,
            [TrimmedCredentials]
        );
        console.log(result.rows[0]);
        return result.rows[0] || null;
    }
}

export default User;
