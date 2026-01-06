const bcrypt = require('bcryptjs');

const createCategoryTableQuery = `
  CREATE TABLE IF NOT EXISTS Category (
    category_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    image_path VARCHAR(255),
    category_name VARCHAR(255)
  );
`;

const createProductTableQuery = `
  CREATE TABLE IF NOT EXISTS Product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    description VARCHAR(255),
    image_path VARCHAR(255),
    normal_price DECIMAL(10,2),
    discount_percent DECIMAL(10,2),
    product_name VARCHAR(255),
    created_at DATE,
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
  );
`;

const createProductAttributeTableQuery = `
  CREATE TABLE IF NOT EXISTS ProductAttribute (
    product_attribute_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    color VARCHAR(255),
    size VARCHAR(255),
    quantity INT,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
  );
`;

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    password VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255)
  );
`;

const createAddressTableQuery = `
  CREATE TABLE IF NOT EXISTS Address (
    address_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    city VARCHAR(255),
    street VARCHAR(255),
    province VARCHAR(255),
    zip_code VARCHAR(255),
    phone_number VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
  );
`;

const createCreditCardTableQuery = `
  CREATE TABLE IF NOT EXISTS CreditCard (
    credit_card_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    card_number VARCHAR(255),
    expiration_date VARCHAR(255),
    cvv VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
  );
`;

const createCartTableQuery = `
  CREATE TABLE IF NOT EXISTS Cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
  );
`;

const createCartItemTableQuery = `
  CREATE TABLE IF NOT EXISTS CartItem (
    cart_item_id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT,
    product_id INT,
    product_attribute_id INT,
    quantity INT,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (product_attribute_id) REFERENCES ProductAttribute(product_attribute_id)
  );
`;

const createHistoryTableQuery = `
  CREATE TABLE IF NOT EXISTS History (
    history_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    product_attribute_id INT,
    quantity INT,
    address_id INT,
    credit_card_id INT,
    order_date DATE,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (product_attribute_id) REFERENCES ProductAttribute(product_attribute_id),
    FOREIGN KEY (address_id) REFERENCES Address(address_id),
    FOREIGN KEY (credit_card_id) REFERENCES CreditCard(credit_card_id)
  );
`;

const createAdminUserQuery = `
  INSERT INTO User (email, password, role, first_name, last_name)
  VALUES (?, ?, 'admin', 'admin', 'admin');
`;

async function createTables(dbConnection, adminEmail, adminPassword) {
  try {
    await dbConnection.query(createCategoryTableQuery);
    await dbConnection.query(createProductTableQuery);
    await dbConnection.query(createProductAttributeTableQuery);
    await dbConnection.query(createUserTableQuery);
    await dbConnection.query(createAddressTableQuery);
    await dbConnection.query(createCreditCardTableQuery);
    await dbConnection.query(createCartTableQuery);
    await dbConnection.query(createCartItemTableQuery);
    await dbConnection.query(createHistoryTableQuery);

    // Hash admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
     
    // Insert admin user with parameterized query
    await dbConnection.query(createAdminUserQuery, [adminEmail, hashedPassword]);

  } catch (error) {
    console.error("ERROR: Failed to create tables: ", error.message);
    throw error;
  }
}

module.exports = createTables;