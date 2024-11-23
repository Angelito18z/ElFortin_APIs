import bcrypt from 'bcrypt';
import pool from '../../config/db.js';

class User {
    /*static async findByCredencials(correo, contrasena) {
        const nameTrimmed = correo.trim();
        const contrasenaTrimmed = contrasena.trim();

        const result = await pool.query(
            'SELECT * FROM users WHERE LOWER(name) = LOWER($1)',
            [nameTrimmed]
        );

        const user = result.rows[0];

        // Check if user exists and the password matches
        if (user && await bcrypt.compare(contrasenaTrimmed, user.encrypted_password)) {
            return user;
        }

        return null;
    }
    */
    static async findAll() {
        const result = await pool.query('SELECT * FROM users WHERE deleted_at IS NULL');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL', [id]);
        return result.rows[0];
    }

    static async create(data) {
        const { name, email, phone, user_type, nickname, password } = data;

        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            'INSERT INTO users (name, email, phone, user_type, nickname, encrypted_password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, email, phone, user_type, nickname, hashedPassword]
        );

        return result.rows[0];
    }

    static async update(id, data) {
        const { name, email, phone, user_type, nickname, password } = data;

        let hashedPassword = null;

        if (password) {
            // Hash the new password if provided
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
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
                encrypted_password = COALESCE($6, encrypted_password) -- Update password only if provided
            WHERE id = $7
            RETURNING *
            `,
            [name, email, phone, user_type, nickname, hashedPassword, id]
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
        const { emailOrUsername } = data;
        TrimmedCredentials = emailOrUsername.trim();
        if (!emailOrUsername || typeof emailOrUsername !== "string") {
            throw new Error("Invalid input: Input must be a non-empty string.");
          }
        const result = await pool.query(
            `
            SELECT * 
            FROM users 
            WHERE LOWER(email) = LOWER($1) OR LOWER(nickname) = LOWER($1)
            `,
            [TrimmedCredentials]
        );
        return result.rows[0];
    }
}

export default User;
