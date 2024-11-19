export const OrderSchema = {
  type: "object",
  properties: {
    id: { type: "integer", description: "Unique ID of the order" },
    table_number: { type: "integer", description: "Table number" },
    restaurant_id: { type: "integer", description: "Restaurant ID" },
    total_amount: {
      type: "number",
      format: "float",
      description: "Total amount",
    },
    client_id: { type: "integer", description: "Client ID" },
    pre_tax_total: {
      type: "number",
      format: "float",
      description: "Pre-tax total",
    },
    post_tax_total: {
      type: "number",
      format: "float",
      description: "Post-tax total",
    },
    payment_method_id: { type: "integer", description: "Payment method ID" },
    status_id: { type: "integer", description: "Order status ID" },
    order_type: {
      type: "string",
      description: "Type of order (e.g., dine-in)",
    },
    discount_id: { type: "integer", description: "Discount ID" },
    created_at: {
      type: "string",
      format: "date-time",
      description: "Creation timestamp",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      description: "Last update timestamp",
    },
    deleted_at: {
      type: "string",
      format: "date-time",
      nullable: true,
      description: "Deletion timestamp",
    },
  },
  required: ["table_number", "restaurant_id", "total_amount", "status_id"],
};
export const ProductSchema = {
  type: "object",
  properties: {
    id: { type: "integer", description: "Unique ID of the product" },
    restaurant_id: {
      type: "integer",
      description: "Restaurant ID associated with the product",
    },
    name: { type: "string", description: "Name of the product" },
    description: { type: "string", description: "Description of the product" },
    price: {
      type: "number",
      format: "float",
      description: "Price of the product",
    },
    category_name: {
      type: "string",
      description: "Category name of the product",
    },
    pre_tax_cost: {
      type: "number",
      format: "float",
      description: "Pre-tax cost of the product",
    },
    post_tax_cost: {
      type: "number",
      format: "float",
      description: "Post-tax cost of the product",
    },
    created_at: {
      type: "string",
      format: "date-time",
      description: "Creation timestamp of the product",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      description: "Last update timestamp of the product",
    },
    deleted_at: {
      type: "string",
      format: "date-time",
      nullable: true,
      description: "Deletion timestamp of the product",
    },
  },
  required: [
    "restaurant_id",
    "name",
    "price",
    "category_name",
    "pre_tax_cost",
    "post_tax_cost",
  ],
};
