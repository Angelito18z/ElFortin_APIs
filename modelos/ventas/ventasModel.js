import pool from "../../config/db.js";  // Importar el pool de la base de datos

class ventaModelo {
    static async obtenerTodo() {
        const result = await pool.query("SELECT * FROM sales_reports WHERE deleted_at IS NULL");
        return result.rows;
    }

    static async crear(data) {
        const { restaurant_id, report_date, total_sales } = data;
        const result = await pool.query("INSERT INTO sales_reports (restaurant_id, report_date, total_sales) VALUES ($1, $2, $3) RETURNING *",
            [restaurant_id, report_date, total_sales]
        );
        return result.rows[0];
    }

    static async actualizar(id, data) {
        const { restaurant_id, report_date, total_sales } = data;
        const result = await pool.query("UPDATE sales_reports SET restaurant_id = $1, report_date = $2, total_sales = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 AND deleted_at IS NULL RETURNING *",
            [restaurant_id, report_date, total_sales, id]);
        return result.rows[0];
    }

    static async borrar(id) {
        const result = await pool.query("UPDATE sales_reports SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND deleted_at IS NULL RETURNING *", [id]);
        return result.rows[0];
    }

    static async obtenerVentaId(id) {
        const result = await pool.query('SELECT * FROM sales_reports WHERE id = $1 AND deleted_at IS NULL ', [id]);
        return result.rows[0];
    }

    static async obtenerTodasVentasExcel() {
        const query = `
            SELECT r.name AS restaurant_name, sr.report_date, sr.total_sales
            FROM sales_reports sr
            JOIN restaurants r ON sr.restaurant_id = r.id
            WHERE sr.deleted_at IS NULL;
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async obtenerVentasFiltro(filtros) {
        const result = await pool.query(
            `SELECT * FROM sales_reports 
            WHERE 
            (CAST(restaurant_id AS TEXT) ILIKE $1 OR 
            CAST(report_date AS TEXT) ILIKE $1 OR
            CAST (total_sales AS TEXT) ILIKE $1) 
            AND deleted_at IS NULL`,
            [`%${filtros}%`]
        );
        return result.rows;
    }
}

export default ventaModelo;  // Exportar con 'export default'