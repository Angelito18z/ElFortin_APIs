import pool from "../../config/db.js";

class Product {
  static async findAll() {
    const result = await pool.query(`
SELECT 
    mi.id,
    mi.restaurant_id,
    mi.name,
    mi.description,
    mi.price,
    image_url,
    c.name as category_name,
    mi.pre_tax_cost,
    mi.post_tax_cost,
    mi.created_at,
    mi.updated_at,
    mi.deleted_at
FROM 
    menu_items mi
JOIN 
    categories c ON mi.category_id = c.id
WHERE 
    mi.deleted_at IS NULL;        `);
    return result.rows;
  }

  static async create(data) {
    const {
      restaurant_id,
      name,
      description,
      price,
      category_id,
      pre_tax_cost,
      post_tax_cost,
      image_url,
    } = data;
    const result = await pool.query(
      "INSERT INTO menu_items (restaurant_id, name, description, price, category_id, pre_tax_cost, post_tax_cost, image_url, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp) RETURNING *",
      [
        restaurant_id,
        name,
        description,
        price,
        category_id,
        pre_tax_cost,
        post_tax_cost,
        image_url,
      ]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      `
            SELECT 
                mi.*, 
                c.name as category_name 
            FROM 
                menu_items mi
            JOIN 
                categories c ON mi.category_id = c.id
            WHERE 
                mi.id = $1 AND mi.deleted_at IS NULL
        `,
      [id]
    );
    return result.rows[0];
  }

  static async searchAllColumns(searchString) {
    const result = await pool.query(
      `
            SELECT 
            mi.*,
             c.name as category_name  
            FROM 
              menu_items mi JOIN categories c ON mi.category_id = c.id 
          WHERE 
              (mi.name ILIKE $1 OR CAST(mi.price AS TEXT) 
          ILIKE 
              $1 OR CAST(mi.pre_tax_cost AS TEXT)     
          ILIKE 
              $1 OR CAST(mi.post_tax_cost AS TEXT) 
          ILIKE 
              $1) AND mi.deleted_at IS NULL`,
      [`%${searchString}%`]
    );
    return result.rows;
  }

  static async update(id, data) {
    const {
      name,
      description,
      price,
      category_id,
      pre_tax_cost,
      post_tax_cost,
    } = data;
    const result = await pool.query(
      "UPDATE menu_items SET name=$1, description=$2, price=$3, category_id=$4, pre_tax_cost=$5, post_tax_cost=$6, updated_at = now() WHERE id=$7 AND deleted_at IS NULL RETURNING *",
      [name, description, price, category_id, pre_tax_cost, post_tax_cost, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      "UPDATE menu_items SET deleted_at = current_timestamp WHERE id = $1 AND deleted_at IS NULL RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Product not found");
    }
    return result.rows[0];
  }

  static async generarExcel() {
    const result = await pool.query(`
            SELECT name, price, pre_tax_cost, post_tax_cost, category_id 
            FROM menu_items 
            WHERE deleted_at IS NULL`);
    return result.rows;
  }
}

export default Product;
