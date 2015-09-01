var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./Northwind.sl3');

db.serialize(function () {
  db.run('', function () {
    console.log("==========");
    console.log('Categories');
    console.log("==========");
  });

  db.each('SELECT * FROM Categories', function (err, row) {
    console.log(row.Description.toString());
  });

  db.run('', function () {
    console.log("========");
    console.log("Products");
    console.log("========");
  });

  db.each('SELECT * FROM Products ' +
    'INNER JOIN Categories ' +
    'ON Products.CategoryID = Categories.CategoryID ' +
    'LIMIT 10', function (err, row) {
    console.log(row.ProductName + ' is a ' + row.CategoryName);
  });

  db.run('', function () {
    console.log("====================");
    console.log('Employee Supervisors')
    console.log("====================");
  });

  db.each('SELECT Employees.LastName AS EmployeeLastName, Supervisors.LastName AS SupervisorLastName FROM Employees ' +
    'LEFT OUTER JOIN Employees AS Supervisors ' +
    'On Employees.ReportsTo = Supervisors.EmployeeID',
    function (err, row) {
    if (row.SupervisorLastName) {
      console.log(row.EmployeeLastName + "'s superviosr is " + row.SupervisorLastName);
    } else {
      console.log(row.EmployeeLastName + " does not have a supervisor");
    };
  });

  db.run('', function () {
    console.log("===========================");
    console.log('New CategoryFavorites Table');
    console.log("===========================");
  });

  db.run('DROP TABLE CategoryFavorites');

  db.run('CREATE TABLE CategoryFavorites ' +
    '([FavoriteID] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
    '[CategoryID] INTEGER NOT NULL)');

  for (var i = 2; i <= 8; i+=2) {
    db.run('INSERT INTO CategoryFavorites ' +
      '(CategoryID) VALUES (' + i + ')');
  };

  db.each('SELECT * FROM CategoryFavorites', function (err, row) {
    console.log(row);
  });

  db.run('', function () {
    console.log("================================");
    console.log('New CategoryFavorites Mod1 Table');
    console.log("================================");
  });

  db.run('UPDATE CategoryFavorites SET CategoryID = 5 WHERE FavoriteID = 2');

  db.each('SELECT * FROM CategoryFavorites', function (err, row) {
    console.log(row);
  });

  db.run('', function () {
    console.log("================================");
    console.log('New CategoryFavorites Mod2 Table');
    console.log("================================");
  });

  db.run('DELETE from CategoryFavorites Where FavoriteID = 3');

  db.run('INSERT INTO CategoryFavorites (CategoryID) VALUES (1)');

  db.each('SELECT * FROM CategoryFavorites', function (err, row) {
    console.log(row);
  });

  db.close();
});

// getCategories(getProducts);

// function getCategories() {
//   console.log("=====================");
//   console.log('Categories');
//   console.log("=====================");
//   db.each('SELECT * FROM Categories', function (err, row) {
//     console.log(row.Description.toString());
//   });
// };

// function getProducts() {
//   console.log("=====================");
//   console.log("Products");
//   console.log("=====================");
//   db.each('SELECT * FROM Products ' +
//     'INNER JOIN Categories ' +
//     'ON Products.CategoryID = Categories.CategoryID ' +
//     'LIMIT 10', function (err, row) {
//     console.log(row.ProductName + ' is a ' + row.CategoryName);
//   });
// }

// function getEmployeeSupers() {
//   console.log("=====================");
//   console.log('Employee Supervisors')
//   console.log("=====================");
//   //  #{Employee last name}'s supervisor is #{Supervisor Lastname}
//   db.each('SELECT Employees.LastName AS EmployeeLastName, Supervisors.LastName AS SupervisorLastName FROM Employees ' +
//     'LEFT OUTER JOIN Employees AS Supervisors ' +
//     'On Employees.ReportsTo = Supervisors.EmployeeID',
//     function (err, row) {
//     if (row.SupervisorLastName) {
//       console.log(row.EmployeeLastName + "'s superviosr is " + row.SupervisorLastName);
//     } else {
//       console.log(row.EmployeeLastName + " does not have a supervisor");
//     }
//   })
// }

// db.close();
