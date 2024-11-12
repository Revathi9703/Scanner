import SQLite from 'react-native-sqlite-storage';

// Open the database
const db = SQLite.openDatabase({ name: 'Productname.db', location: 'default' });

// Function to create the table
export const createTable = async () => {
  (await db).transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Product (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mrp REAL, quantity INTEGER);',
      [],
      () => console.log('Table created successfully'),
      (error) => console.log('Error creating table:', error)
    );
  });
};

// Function to insert product into the database
export const insertProductToDb = (name, mrp, quantity) => {
  return new Promise(async (resolve, reject) => {
    (await db).transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Product (name, mrp, quantity) VALUES (?, ?, ?);',
        [name, mrp, quantity],
        (tx, result) => {
          resolve(result); // Resolve promise if insertion is successful
        },
        (error) => {
          reject(error); // Reject promise if there's an error
        }
      );
    });
  });
};

// Function to fetch products from the database
export const fetchProductsFromDb = () => {
  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Product;',
        [],
        (_, { rows }) => {
          const products = [];
          for (let i = 0; i < rows.length; i++) {
            products.push(rows.item(i));
          }
          resolve(products); // Resolve with the products array
        },
        (error) => {
          reject(error); // Reject promise if there's an error
        }
      );
    });
  });
};

// Function to delete a product by id
export const deleteProductFromDb = (id) => {
  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      tx.executeSql(
        'DELETE FROM Product WHERE id = ?;',
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
