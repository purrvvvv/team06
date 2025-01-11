const sqlite3 = require('sqlite3').verbose();

// Function to generate a stock ID in the format "S1", "S2", ..., "S100"
function generateStockId(index) {
    return `S${index}`;
}
const path = require('path');
// Create a new database or open an existing one
const dbPath = path.join(__dirname, 'team06.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the team06 database.');
});


// db.serialize(() => {
//     db.run(`CREATE TABLE IF NOT EXISTS stock (
//         Stock_id TEXT PRIMARY KEY,
//         Stock_name TEXT NOT NULL,
//         Stock_category TEXT NOT NULL,
//         Stock_quantity INTEGER NOT NULL,
//         Stock_bought_price REAL NOT NULL,
//         Stock_current_price REAL NOT NULL
//     )`, (err) => {
//         if (err) {
//             console.error('Error creating table:', err.message);
//         } else {
//             console.log('Stock table created or already exists.');

//             // Prepare the insert statement
//             const insert = db.prepare(`INSERT INTO stock (Stock_id, Stock_name, Stock_category, Stock_quantity, Stock_bought_price, Stock_current_price) VALUES (?, ?, ?, ?, ?, ?)`);
            
//             // Example records to insert
//             const records = [
//               [generateStockId(1), 'Apple Inc.', 'Technology', 100, 200.00, 400.00], 
//               [generateStockId(2), 'Microsoft Corporation', 'Technology', 200, 250.00, 350.00],
//               [generateStockId(3), 'Amazon.com Inc.', 'Consumer Discretionary', 150, 200.00, 400.00],
//               [generateStockId(4), 'Tesla Inc.', 'Consumer Discretionary', 80, 300.00, 450.00],
//               [generateStockId(5), 'Johnson & Johnson', 'Healthcare', 120, 253.50, 320.00],
//               [generateStockId(6), 'Pfizer Inc.', 'Healthcare', 120, 120.00, 200.00],
//               [generateStockId(7), 'JPMorgan Chase & Co.', 'Financials', 260, 450.00, 620.00],
//               [generateStockId(8), 'Bank of America Corporation', 'Financials', 70, 200.00, 296.50],
//               [generateStockId(9), 'Coca-Cola Company', 'Consumer Staples', 200, 230.00, 310.00],
//               [generateStockId(10), 'Procter & Gamble Co.', 'Consumer Staples', 140, 300.00, 340.00],
//               [generateStockId(11), 'JC Penny Company', 'Retail', 240, 200.00, 230.00],
//               [generateStockId(12), 'Peabody Energy Corporation', 'Energy', 340, 300.00, 340.00],
//               [generateStockId(13), 'Amarin Corporation', 'Biotech', 230, 120.00, 180.00],
//               [generateStockId(14), 'Wells Fargo & Corporation', 'Financials', 100, 170.00, 230.00],
//               [generateStockId(15), 'Regional Finance Corporation', 'Financials', 60, 130.00, 180.00],
//               [generateStockId(16), 'Carnival Corporation', 'Travel and Leisure', 200, 250.00, 270.00],
//             ];

//             let insertCount = 0; // Counter for inserted records

//             // Loop through the records and insert them
//             records.forEach(record => {
//                 insert.run(record, (err) => {
//                     if (err) {
//                         console.error('Error inserting record:', err.message);
//                     } else {
//                         console.log(`Inserted record: ${record}`);
//                     }
//                     insertCount++;

//                     // Check if all records have been inserted
//                     if (insertCount === records.length) {
//                         // Finalize the prepared statement
//                         insert.finalize();

//                         // Close the database connection
//                         db.close((err) => {
//                             if (err) {
//                                 console.error(err.message);
//                             }
//                             console.log('Closed the database connection.');
//                         });
//                     }
//                 });
//             });
//         }
//     });
// });

//Fethc All Recorsd from db
function fetchAllRecords(callback) {
  db.serialize(() => {
      db.all(`SELECT * FROM stock`, [], (err, rows) => {
          if (err) {
              console.error('Error fetching records:', err.message);
              return;
          }
          callback(null, rows);
          
           console.log('All records in the stock table:');
           rows.forEach((row) => {
              // console.log(row);
               return row;
           });
      });
  });
}

function fetchRecordById(stockId, callback) {
  db.serialize(() => {
      db.get(`SELECT * FROM stock WHERE Stock_id = ?`, [stockId], (err, row) => {
          if (err) {
              console.error('Error fetching record:', err.message);
              return;
          }

          if (row) {
            callback(null, row);
             return row;
              // console.log(`Record for Stock ID ${stockId}:`, row);
          } else {
              console.log(`No record found for Stock ID ${stockId}.`);
          }
      });
  });
}
module.exports = {
  fetchAllRecords,
  fetchRecordById,
};