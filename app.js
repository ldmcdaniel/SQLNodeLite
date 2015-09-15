var pg = require('pg');

var conString = 'postgres://localhost/Northwind';

pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }

  client.query('SELECT * FROM Categories', function(err, result) {
    //call `done()` to release the client back to the pool
    // done();

    if(err) {
      return console.error('error running Categories query', err);
    }
    console.log("==========");
    console.log('Categories');
    console.log("==========");

    result.rows.forEach(function (row) {
      console.log(row.Description);
    })

    client.end();
  });

  client.query('SELECT * FROM Products ' +
    'INNER JOIN Categories ' +
    'ON Products."CategoryID" = Categories."CategoryID" ' +
    'LIMIT 10',
    function(err, result) {
      if(err) {
        return console.error('error running Products query ', err);
      }
      console.log("========");
      console.log("Products");
      console.log("========");

      result.rows.forEach(function (row) {
        console.log(row.ProductName + ' is a ' + row.CategoryName);
      })

      // for (var i = 0; i < result.rows.length; i++) {
      //   console.log(result.rows[i].ProductName + ' is a ' + result.rows[i].CategoryName)
      // };

    client.end();
  });

  client.query('SELECT Employees.LastName AS EmployeeLastName, Supervisors.LastName AS SupervisorLastName FROM Employees ' +
    'LEFT OUTER JOIN Employees AS Supervisors ' +
    'ON Employees.ReportsTo = Supervisors.EmployeeID',
    function (err, result) {
      if(err) {
        return console.error('error running Employee query ', err)
      }

      console.log("====================");
      console.log('Employee Supervisors');
      console.log("====================");

      result.rows.forEach(function (row) {
        if (row.SupervisorLastName) {
          console.log(row.EmployeeLastName + "'s superviosr is " + row.SupervisorLastName);
        } else {
          console.log(row.EmployeeLastName + " does not have a supervisor");
        };
      });

      client.end();

    });
});

//   db.each('SELECT Employees.LastName AS EmployeeLastName, Supervisors.LastName AS SupervisorLastName FROM Employees ' +
//     'LEFT OUTER JOIN Employees AS Supervisors ' +
//     'On Employees.ReportsTo = Supervisors.EmployeeID',
//     function (err, row) {
    // if (row.SupervisorLastName) {
    //   console.log(row.EmployeeLastName + "'s superviosr is " + row.SupervisorLastName);
    // } else {
    //   console.log(row.EmployeeLastName + " does not have a supervisor");
    // };
//   });

//   db.run('', function () {
//     console.log("===========================");
//     console.log('New CategoryFavorites Table');
//     console.log("===========================");
//   });

//   db.run('DROP TABLE CategoryFavorites');

//   db.run('CREATE TABLE CategoryFavorites ' +
//     '([FavoriteID] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
//     '[CategoryID] INTEGER NOT NULL)');

//   for (var i = 2; i <= 8; i+=2) {
//     db.run('INSERT INTO CategoryFavorites ' +
//       '(CategoryID) VALUES (' + i + ')');
//   };

//   db.each('SELECT * FROM CategoryFavorites', function (err, row) {
//     console.log(row);
//   });

//   db.run('', function () {
//     console.log("================================");
//     console.log('New CategoryFavorites Mod1 Table');
//     console.log("================================");
//   });

//   db.run('UPDATE CategoryFavorites SET CategoryID = 5 WHERE FavoriteID = 2');

//   db.each('SELECT * FROM CategoryFavorites', function (err, row) {
//     console.log(row);
//   });

//   db.run('', function () {
//     console.log("================================");
//     console.log('New CategoryFavorites Mod2 Table');
//     console.log("================================");
//   });

//   db.run('DELETE from CategoryFavorites Where FavoriteID = 3');

//   db.run('INSERT INTO CategoryFavorites (CategoryID) VALUES (1)');

//   db.each('SELECT * FROM CategoryFavorites', function (err, row) {
//     console.log(row);
//   });

//   db.close();
// });

// // getCategories(getProducts);

// // function getCategories() {
// //   console.log("=====================");
// //   console.log('Categories');
// //   console.log("=====================");
// //   db.each('SELECT * FROM Categories', function (err, row) {
// //     console.log(row.Description.toString());
// //   });
// // };

// // function getProducts() {
// //   console.log("=====================");
// //   console.log("Products");
// //   console.log("=====================");
// //   db.each('SELECT * FROM Products ' +
// //     'INNER JOIN Categories ' +
// //     'ON Products.CategoryID = Categories.CategoryID ' +
// //     'LIMIT 10', function (err, row) {
// //     console.log(row.ProductName + ' is a ' + row.CategoryName);
// //   });
// // }

// // function getEmployeeSupers() {
// //   console.log("=====================");
// //   console.log('Employee Supervisors')
// //   console.log("=====================");
// //   //  #{Employee last name}'s supervisor is #{Supervisor Lastname}
// //   db.each('SELECT Employees.LastName AS EmployeeLastName, Supervisors.LastName AS SupervisorLastName FROM Employees ' +
// //     'LEFT OUTER JOIN Employees AS Supervisors ' +
// //     'On Employees.ReportsTo = Supervisors.EmployeeID',
// //     function (err, row) {
// //     if (row.SupervisorLastName) {
// //       console.log(row.EmployeeLastName + "'s superviosr is " + row.SupervisorLastName);
// //     } else {
// //       console.log(row.EmployeeLastName + " does not have a supervisor");
// //     }
// //   })
// // }

// // db.close();
