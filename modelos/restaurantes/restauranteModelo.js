import pool from "../../config/db.js";

class restauranteModelo{

    static async obtenerTodo(){
        const result = await pool.query("SELECT *FROM restaurants WHERE deleted_at IS NULL");
        return result.rows;
    }

    static async crear(data){
        const {name, location, opening_hours} = data;
        const result = await pool.query("INSERT INTO restaurants (name, location, opening_hours) VALUES ($1, $2, $3) RETURNING  *",
            [name,  location, opening_hours]
        );        
        return result.rows[0]
    }

    static async actualizar(id, data){
        const  {name, location, opening_hours} = data;
        const result = await pool.query("UPDATE restaurants SET name = $1, location = $2, opening_hours =  $3, updated_at = CURRENT_TIMESTAMP  WHERE id = $4 AND deleted_at IS NULL  RETURNING *",
            [name, location, opening_hours, id] );
            return result.rows[0];

    }

    static async borrar (id){
        const result = await pool.query("UPDATE restaurants SET deleted_at = CURRENT_TIMESTAMP  WHERE id = $1 AND deleted_at IS NULL  RETURNING *",
            [id] );
            return result.rows[0];
        
    }

    static async obtenerRestauranteId(id){
        const result = await pool.query('SELECT * FROM restaurants WHERE id = $1 AND deleted_at IS NULL ', [id]);
        return result.rows[0];
    }

    static async  obtenerTodosRestaurantesExcel(){
        const query = `
        SELECT name,  location, opening_hours 
        FROM restaurants 
        WHERE deleted_at IS NULL `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async obtenerRestaurantesFiltro(filtros){
        const result = await pool.query(
    
            `SELECT * FROM restaurants 
            WHERE 
            (CAST(name AS TEXT) ILIKE $1 OR 
            CAST(location AS TEXT) ILIKE $1 OR
            CAST (opening_hours AS TEXT) ILIKE $1) 
            AND deleted_at IS NULL`,
           [`%${filtros}%`]
        );
        return result.rows;
    
    }

}

export default restauranteModelo;