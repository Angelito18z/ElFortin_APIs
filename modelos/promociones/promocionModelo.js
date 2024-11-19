import pool from "../../config/db.js";

class promocionModelo {
  // 1. Get all active discounts
  static async obtenerTodo() {
    const result = await pool.query(
      "SELECT * FROM discounts WHERE deleted_at IS NULL AND active = true"
    );
    return result.rows;
  }

  // 2. Create a new discount
  static async crear(data) {
    const {
      code,
      description,
      discount_type,
      value,
      start_date,
      end_date,
      active,
    } = data;
    const result = await pool.query(
      `INSERT INTO discounts (code, description, discount_type, value, start_date, end_date, active) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [code, description, discount_type, value, start_date, end_date, active]
    );

    return result.rows[0];
  }

  // 3. Update an existing discount by ID
  static async actualizar(id, data) {
    const {
      code,
      description,
      discount_type,
      value,
      start_date,
      end_date,
      active,
    } = data;
    const result = await pool.query(
      `UPDATE discounts 
         SET code = $1, description = $2, discount_type = $3, value = $4, 
             start_date = $5, end_date = $6, active = $7, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $8 AND deleted_at IS NULL 
         RETURNING *`,
      [
        code,
        description,
        discount_type,
        value,
        start_date,
        end_date,
        active,
        id,
      ]
    );
    return result.rows[0];
  }

  // 4. Soft delete a discount by ID
  static async borrar(id) {
    const result = await pool.query(
      `UPDATE discounts 
         SET deleted_at = CURRENT_TIMESTAMP, active = false 
         WHERE id = $1 AND deleted_at IS NULL 
         RETURNING *`,
      [id]
    );
    return result.rows[0];
  }

  // 5. Get a discount by ID
  static async obtenerPromocionId(id) {
    const result = await pool.query(
      `SELECT * FROM discounts 
         WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );
    return result.rows[0];
  }

  // 6. Get all promotions with discount details for Excel export
  static async obtenerTodasPromocionesExcel() {
    const query = `
        SELECT 
          d.code, 
          d.description, 
          d.discount_type, 
          d.value, 
          d.start_date, 
          d.end_date, 
          d.active 
        FROM discounts d 
        WHERE d.deleted_at IS NULL AND d.active = true`;
    const result = await pool.query(query);
    return result.rows;
  }

  // 7. Filter discounts based on various columns
  static async obtenerPromocionesFiltro(filtros) {
    const result = await pool.query(
      `SELECT * FROM discounts 
         WHERE 
           (CAST(code AS TEXT) ILIKE $1 OR 
            CAST(description AS TEXT) ILIKE $1 OR
            CAST(discount_type AS TEXT) ILIKE $1 OR
            CAST(value AS TEXT) ILIKE $1 OR
            CAST(start_date AS TEXT) ILIKE $1 OR
            CAST(end_date AS TEXT) ILIKE $1) 
           AND deleted_at IS NULL AND active = true`,
      [`%${filtros}%`]
    );
    return result.rows;
  }
}

export default promocionModelo;
