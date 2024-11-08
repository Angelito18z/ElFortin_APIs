import pool from '../../config/db.js';

class User{
    static async findByCredencials(correo, contrasena){
        const nameTrimmed = correo.trim();  // Elimina espacios en blanco
        const contrasenaTrimmed = contrasena.trim(); 

        const result = await pool.query('SELECT * FROM users WHERE LOWER(name) = LOWER($1) AND encrypted_password = $2', [nameTrimmed, contrasenaTrimmed]);
        console.log('Resultado de la consulta:', result.rows);
        
        return result.rows[0];
    }

    static async findAll(){
        const result = await pool.query('SELECT *FROM users WHERE deleted_at IS NULL' );
        return result.rows;
    }

    static async findById(id){
        const result = await pool.query('SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL', [id]);
        return result.rows[0];
    }

    static async create(data) {
        const {name, email, phone, user_type, nickname, encrypted_password, salt} = data;
        const result = await pool.query('INSERT INTO users (name, email, phone, user_type, nickname, encrypted_password, salt) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, email, phone, user_type, nickname, encrypted_password, salt]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { name, email, phone, user_type, nickname, encrypted_password, salt } = data;
        const result = await pool.query('UPDATE users SET name = $1, email = $2, phone = $3, user_type = $4, nickname = $5, encrypted_password, $6, salt = $7  WHERE id = $8 RETURNING *', [name, email, phone, user_type, nickname, encrypted_password, salt, id]);
        return result.rows[0];
    }
    
      static async delete(id) {
        const result = await pool.query('UPDATE users  SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND deleted_at IS NULL RETURNING *', [id]);
        return result.rows[0];
      }

      static async getUsersExcel(){
        const query = `
        SELECT name,  email, phone, user_type, nickname 
        FROM users 
        WHERE deleted_at IS NULL `;
        const result = await pool.query(query);
        return result.rows;

    }
}

export default User;