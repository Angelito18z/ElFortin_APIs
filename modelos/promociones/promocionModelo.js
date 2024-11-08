import pool from "../../config/db.js";

class promocionModelo{

    static async obtenerTodo(){
        const result = await pool.query("SELECT *FROM promotions WHERE deleted_at IS NULL");
        return result.rows;
    }

    static async crear(data){
        const {name, description, discount_id, start_date, end_date} = data;
        const result = await pool.query("INSERT INTO promotions (name, description, discount_id, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING  *",
            [name,  description, discount_id,  start_date, end_date]);

                
        return result.rows[0]
    }

    static async actualizar(id, data){
        const  {name, description, discount_id, start_date, end_date} = data;
        const result = await pool.query("UPDATE promotions SET name = $1, description = $2, discount_id =  $3, start_date = $4, end_date = $5, updated_at = CURRENT_TIMESTAMP  WHERE id = $6 AND deleted_at IS NULL  RETURNING *",
            [name, description, discount_id, start_date, end_date, id] );
            return result.rows[0];

    }

    static async borrar (id){
        const result = await pool.query("UPDATE promotions SET deleted_at = CURRENT_TIMESTAMP  WHERE id = $1 AND deleted_at IS NULL  RETURNING *",
            [id] );
            return result.rows[0];
        
    }

    static async obtenerPromocionId(id){
        const result = await pool.query('SELECT * FROM promotions WHERE id = $1 AND deleted_at IS NULL ', [id]);
        return result.rows[0];
    }

    static async  obtenerTodasPromocionesExcel(){
        const query = `
        SELECT 
            p.name, 
            p.description, 
            d.discount_type, 
            d.value, 
            p.start_date, 
            p.end_date
        FROM 
            promotions p
        JOIN 
            discounts d 
        ON 
            p.discount_id = d.id
        WHERE 
            p.deleted_at IS NULL `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async obtenerPromocionesFiltro(filtros){
        const result = await pool.query(
    
            `SELECT * FROM promotions 
            WHERE 
            (CAST(name AS TEXT) ILIKE $1 OR 
            CAST(description AS TEXT) ILIKE $1 OR
            CAST (discount_id AS TEXT) ILIKE $1 OR
            CAST (start_date AS TEXT) ILIKE $1 OR
            CAST (end_date AS TEXT) ILIKE $1) AND
            deleted_at IS NULL `,            
           [`%${filtros}%`]
        );
        return result.rows;
    
    }

}

export default promocionModelo;