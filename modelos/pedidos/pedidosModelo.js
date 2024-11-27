import pool from '../../config/db.js';

class Order {
    // Find all orders
    static async findAll() {
        const result = await pool.query('SELECT * FROM orders WHERE deleted_at IS NULL');
        return result.rows;
    };

    // Create a new order
    static async create(data) {
        // Destructuring the data object
        const {
            table_number,
            restaurant_id,
            total_amount,
            client_id,
            pre_tax_total,
            post_tax_total,
            payment_method_id,
            status_id,
            order_type,
            discount_id
        } = data;

        const result = await pool.query(`
            INSERT INTO orders 
            (table_number, restaurant_id, total_amount, client_id, pre_tax_total, post_tax_total, payment_method_id, status_id, order_type, discount_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING *`, 
            [table_number, restaurant_id, total_amount, client_id, pre_tax_total, post_tax_total, payment_method_id, status_id, order_type, discount_id]
        );
        return result.rows[0];
    }

    // Find an order by id
    static async findById(id) {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1 AND deleted_at IS NULL', [id]);
        return result.rows[0];
    }

    // Update an order
    static async update(id, data) {
        // Destructuring the data object
        const {
            table_number,
            restaurant_id,
            total_amount,
            client_id,
            pre_tax_total,
            post_tax_total,
            payment_method_id,
            status_id,
            order_type,
            discount_id
        } = data;

        const result = await pool.query(`
            UPDATE orders 
            SET table_number = $1, restaurant_id = $2, total_amount = $3, client_id = $4, pre_tax_total = $5, post_tax_total = $6, 
                payment_method_id = $7, status_id = $8, order_type = $9, discount_id = $10, updated_at = CURRENT_TIMESTAMP 
            WHERE id = $11 AND deleted_at IS NULL 
            RETURNING *`,
            [table_number, restaurant_id, total_amount, client_id, pre_tax_total, post_tax_total, payment_method_id, status_id, order_type, discount_id, id]
        );
        return result.rows[0];
    }

    // Delete an order
    static async delete(id) {
        const result = await pool.query('UPDATE orders SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND deleted_at IS NULL RETURNING *', [id]);
        return result.rows[0];
    }

    // Search orders by all columns
    static async searchAllColumns(searchString) {
        const result = await pool.query(`
            SELECT * FROM orders 
            WHERE 
                CAST(table_number AS TEXT) ILIKE $1 OR
                CAST(restaurant_id AS TEXT) ILIKE $1 OR
                CAST(total_amount AS TEXT) ILIKE $1 OR
                CAST(client_id AS TEXT) ILIKE $1 OR
                CAST(pre_tax_total AS TEXT) ILIKE $1 OR
                CAST(post_tax_total AS TEXT) ILIKE $1 OR
                CAST(payment_method_id AS TEXT) ILIKE $1 OR
                CAST(status_id AS TEXT) ILIKE $1 OR
                order_type ILIKE $1 OR
                CAST(discount_id AS TEXT) ILIKE $1 OR
                CAST(created_at AS TEXT) ILIKE $1 OR
                CAST(updated_at AS TEXT) ILIKE $1 OR
                CAST(deleted_at AS TEXT) ILIKE $1 AND
                deleted_at IS NULL`, 
            [`%${searchString}%`]
        );
        return result.rows;
    }

    // Get all orders in a simplified format (e.g., for Excel export)
    static async getAllOrdersExcel() {
        const query = `
            SELECT table_number, restaurant_id, total_amount, client_id, pre_tax_total, post_tax_total, order_type, created_at 
            FROM orders 
            WHERE deleted_at IS NULL;
        `;
        const result = await pool.query(query);
        return result.rows;
    };

    // Get orders by customer ID
    static async getOrdersByCustomerId(customerId) {
        const result = await pool.query(`
            SELECT 
                o.id AS order_id,
                o.table_number,
                o.order_date,
                o.total_amount,
                COALESCE(o.pre_tax_total, 0) AS pre_tax_total,
                COALESCE(o.post_tax_total, 0) AS post_tax_total,
                COALESCE(pm.name, 'None') AS payment_method,
                COALESCE(d.description, 'No discount') AS discount_description,
                COALESCE(d.discount_type, 'None') AS discount_type,
                COALESCE(d.value, 0) AS discount_value,
                COALESCE(os.name, 'Pending') AS status,
                o.order_type,
                oi.quantity,
                COALESCE(mi.name, 'Unknown item') AS item_name,
                COALESCE(oi.item_cost, 0) AS item_cost
            FROM orders o
            LEFT JOIN payment_methods pm ON o.payment_method_id = pm.id
            LEFT JOIN discounts d ON o.discount_id = d.id
            LEFT JOIN order_statuses os ON o.status_id = os.id
            INNER JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
            WHERE o.client_id = $1
              AND o.deleted_at IS NULL
              AND oi.deleted_at IS NULL
              AND mi.deleted_at IS NULL
        `, [customerId]);
        return result.rows;
    }
}

export default Order;
