import pool from "../../config/db.js";

class proveedorModelo{

static async obtenerTodo(){

    const result = await pool.query("SELECT *FROM suppliers WHERE deleted_at IS NULL");
    return result.rows;
}

static async crear(data){
    const {name, contact_info} = data;
    const result = await pool.query(
        "INSERT INTO SUPPLIERS (name, contact_info) VALUES ($1, $2) RETURNING *",
        [name, contact_info]
    );
    return result.rows[0];
}

static async actualizar (id, data){
    const {name, contact_info} = data;
    const result = await pool.query('UPDATE suppliers set name = $1, contact_info = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND deleted_at IS NULL RETURNING *',
        [name,contact_info,id]);
        return result.rows[0];
    
}

static async borrar(id){
    const result = await pool.query('UPDATE suppliers  SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND deleted_at IS NULL RETURNING *',[id]);
    return result.rows[0];
}

static async obtenerProveedorId(id){
    const result = await pool.query('SELECT * FROM suppliers WHERE id = $1 AND deleted_at IS NULL ', [id]);
    return result.rows[0];
}

static async  obtenerTodosProveedoresExcel(){
    const query = `
    SELECT name,  contact_info 
    FROM suppliers 
    WHERE deleted_at IS NULL `;
    const result = await pool.query(query);
    return result.rows;
}

static async obtenerProveedoresFiltro(filtros){
    const result = await pool.query(

        `SELECT * FROM suppliers 
        WHERE 
        (CAST(name AS TEXT) ILIKE $1 OR 
        CAST(contact_info AS TEXT) ILIKE $1) 
        AND deleted_at IS NULL`,
       [`%${filtros}%`]
    );
    return result.rows;

}

}

export default proveedorModelo;







