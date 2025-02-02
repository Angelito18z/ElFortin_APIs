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
      type: "integer",
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
export const DiscountSchema = {
  type: "object",
  properties: {
    id: { 
      type: "integer", 
      description: "Unique ID of the discount" 
    },
    code: { 
      type: "string", 
      description: "Discount code (unique)" 
    },
    description: { 
      type: "string", 
      description: "Description of the discount" 
    },
    discount_type: { 
      type: "string", 
      enum: ["percentage", "fixed"], 
      description: "Type of the discount (either 'percentage' or 'fixed')" 
    },
    value: { 
      type: "number", 
      format: "float", 
      description: "Value of the discount (percentage or fixed amount)" 
    },
    start_date: { 
      type: "string", 
      format: "date", 
      description: "Start date of the discount" 
    },
    end_date: { 
      type: "string", 
      format: "date", 
      description: "End date of the discount" 
    },
    active: { 
      type: "boolean", 
      description: "Whether the discount is currently active" 
    },
    created_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the discount was created" 
    },
    updated_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the discount was last updated" 
    },
    deleted_at: { 
      type: "string", 
      format: "date-time", 
      nullable: true, 
      description: "Timestamp when the discount was deleted (nullable)" 
    }
  },
  required: ["code", "discount_type", "value"], // Make sure these are mandatory
};
export const SupplierSchema = {
  type: "object",
  properties: {
    id: { 
      type: "integer", 
      description: "Unique ID of the supplier" 
    },
    name: { 
      type: "string", 
      description: "Name of the supplier", 
      minLength: 1 // Ensuring that name is not empty
    },
    contact_info: { 
      type: "string", 
      description: "Contact information for the supplier", 
      nullable: true // Contact info is optional
    },
    created_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the supplier was created" 
    },
    updated_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the supplier was last updated" 
    },
    deleted_at: { 
      type: "string", 
      format: "date-time", 
      nullable: true, 
      description: "Timestamp when the supplier was deleted (nullable)" 
    }
  },
  required: ["name"], // Only the supplier's name is mandatory
};
export const RestaurantSchema = {
  type: "object",
  properties: {
    id: { 
      type: "integer", 
      description: "Unique ID of the restaurant" 
    },
    name: { 
      type: "string", 
      description: "Name of the restaurant", 
      minLength: 1 // Ensuring the name is not empty
    },
    location: { 
      type: "string", 
      description: "Location/address of the restaurant", 
      minLength: 1 // Ensuring the location is not empty
    },
    opening_hours: { 
      type: "string", 
      description: "Opening hours of the restaurant", 
      nullable: true // Opening hours are optional
    },
    created_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the restaurant was created" 
    },
    updated_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the restaurant was last updated" 
    },
    deleted_at: { 
      type: "string", 
      format: "date-time", 
      nullable: true, 
      description: "Timestamp when the restaurant was deleted (nullable)" 
    }
  },
  required: ["name", "location"], // Name and location are mandatory
};
export const UserSchema = {
  type: "object",
  properties: {
    id: { 
      type: "integer", 
      description: "Unique ID of the user" 
    },
    name: { 
      type: "string", 
      description: "Full name of the user", 
      minLength: 1 // Ensuring the name is not empty
    },
    email: { 
      type: "string", 
      format: "email", 
      description: "Email address of the user (unique)", 
      minLength: 1 // Email is required
    },
    phone: { 
      type: "string", 
      description: "Phone number of the user", 
      nullable: true // Phone number is optional
    },
    user_type: { 
      type: "string", 
      enum: ["client", "worker"], 
      description: "Type of the user (either 'client' or 'worker')" 
    },
    nickname: { 
      type: "string", 
      description: "Nickname of the user", 
      nullable: true // Nickname is optional
    },
    encrypted_password: { 
      type: "string", 
      description: "Encrypted (hashed) password of the user", 
      minLength: 1 // Ensuring the password is provided
    },
    salt: { 
      type: "string", 
      description: "Salt used for password hashing", 
      minLength: 1 // Ensuring the salt is provided
    },
    created_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the user account was created" 
    },
    updated_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the user account was last updated" 
    },
    deleted_at: { 
      type: "string", 
      format: "date-time", 
      nullable: true, 
      description: "Timestamp when the user account was deleted (nullable)" 
    }
  },
  required: ["name", "email", "user_type", "encrypted_password", "salt"], // These fields are mandatory
};
export const DetalleVentaSchema = {
  type: "object",
  properties: {
    id: { 
      type: "integer", 
      description: "Unique ID of the order item" 
    },
    order_id: { 
      type: "integer", 
      description: "ID of the associated order", 
      example: 1 // Example of a related order ID
    },
    menu_item_id: { 
      type: "integer", 
      description: "ID of the menu item associated with this order item", 
      example: 101 // Example of a related menu item ID
    },
    quantity: { 
      type: "integer", 
      description: "Quantity of the menu item ordered", 
      minimum: 1, // Ensure that the quantity is at least 1
    },
    item_cost: { 
      type: "number", 
      format: "float", 
      description: "Cost of the item (pre-tax)", 
      nullable: true // Item cost may be optional
    },
    created_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the order item was created" 
    },
    updated_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the order item was last updated" 
    },
    deleted_at: { 
      type: "string", 
      format: "date-time", 
      nullable: true, 
      description: "Timestamp when the order item was deleted (nullable)" 
    }
  },
  required: ["order_id", "menu_item_id", "quantity"], // Required fields for an order item
};
export const PromotionSchema = {
  type: "object",
  properties: {
    id: { 
      type: "integer", 
      description: "Unique ID of the promotion" 
    },
    code: { 
      type: "string", 
      description: "Promotion code (unique)" 
    },
    description: { 
      type: "string", 
      description: "Description of the promotion" 
    },
    discount_type: { 
      type: "string", 
      enum: ["percentage", "fixed"], 
      description: "Type of the discount applied by the promotion (either 'percentage' or 'fixed')" 
    },
    value: { 
      type: "number", 
      format: "float", 
      description: "Value of the promotion (percentage or fixed amount)" 
    },
    start_date: { 
      type: "string", 
      format: "date", 
      description: "Start date of the promotion" 
    },
    end_date: { 
      type: "string", 
      format: "date", 
      description: "End date of the promotion" 
    },
    active: { 
      type: "boolean", 
      description: "Whether the promotion is currently active" 
    },
    image_url: { 
      type: "string", 
      description: "URL of the promotion image (optional)", 
      nullable: true 
    },
    created_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the promotion was created" 
    },
    updated_at: { 
      type: "string", 
      format: "date-time", 
      description: "Timestamp when the promotion was last updated" 
    },
    deleted_at: { 
      type: "string", 
      format: "date-time", 
      nullable: true, 
      description: "Timestamp when the promotion was deleted (nullable)" 
    }
  },
  required: ["code", "discount_type", "value"], // Make sure these are mandatory fields
};
export const UserInputSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Full name of the user",
      minLength: 1 // Ensuring the name is not empty
    },
    email: {
      type: "string",
      format: "email",
      description: "Email address of the user (unique)",
      minLength: 1 // Email is required
    },
    phone: {
      type: "string",
      description: "Phone number of the user",
      nullable: true // Phone number is optional
    },
    user_type: {
      type: "string",
      enum: ["client", "worker"],
      description: "Type of the user (either 'client' or 'worker')"
    },
    nickname: {
      type: "string",
      description: "Nickname of the user",
      nullable: true // Nickname is optional
    },
    password: {
      type: "string",
      description: "Password for the user account (required for creation, optional for update)",
      minLength: 6 // Password should have at least 6 characters
    },
    image: {
      type: "string",
      format: "binary",
      description: "Profile image of the user (optional)"
    }
  },
  required: ["name", "email", "user_type", "nickname", "password"] // These fields are mandatory for creation
};
