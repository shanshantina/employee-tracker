const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');

const inputCheck = require('./utils/inputCheck');


// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rA2!t0yd[W!qf@>',
    database: 'employees_db'
});


db.connect((err) => {
    if(err) throw err;
    console.log (chalk.magentaBright(`
    --------------------------------------------------------------------------------                                                
      ________                          __                                              
     /        |                        /  |                                             
     $$$$$$$$/  _____  ____    ______  $$ |  ______   __    __   ______    ______       
     $$ |__    /     \/    \  /      \ $$ | /      \ /  |  /  | /      \  /      \      
     $$    |   $$$$$$ $$$$  |/$$$$$$  |$$ |/$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |     
     $$$$$/    $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$    $$ |     
     $$ |_____ $$ | $$ | $$ |$$ |__$$ |$$ |$$ \__$$ |$$ \__$$ |$$$$$$$$/ $$$$$$$$/      
     $$       |$$ | $$ | $$ |$$    $$/ $$ |$$    $$/ $$    $$ |$$       |$$       |     
     $$$$$$$$/ $$/  $$/  $$/ $$$$$$$/  $$/  $$$$$$/   $$$$$$$ | $$$$$$$/  $$$$$$$/      
                             $$ |                    /  \__$$ |                         
                             $$ |                    $$    $$/                          
                             $$/                      $$$$$$/                           
      __       __                                                                       
     /  \     /  |                                                                      
     $$  \   /$$ |  ______   _______    ______    ______    ______    ______            
     $$$  \ /$$$ | /      \ /       \  /      \  /      \  /      \  /      \           
     $$$$  /$$$$ | $$$$$$  |$$$$$$$  | $$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |          
     $$ $$ $$/$$ | /    $$ |$$ |  $$ | /    $$ |$$ |  $$ |$$    $$ |$$ |  $$/           
     $$ |$$$/ $$ |/$$$$$$$ |$$ |  $$ |/$$$$$$$ |$$ \__$$ |$$$$$$$$/ $$ |                
     $$ | $/  $$ |$$    $$ |$$ |  $$ |$$    $$ |$$    $$ |$$       |$$ |                
     $$/      $$/  $$$$$$$/ $$/   $$/  $$$$$$$/  $$$$$$$ | $$$$$$$/ $$/                 
                                                /  \__$$ |                              
                                                $$    $$/                               
                                                 $$$$$$/                                                                    
    --------------------------------------------------------------------------------
    `));
    mainPage();
});


function mainPage() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainPage',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role',
                'Exit',
                // bonus
                'Update Employee Manager',
                'View Employees by Manager',
                'View Employees by Department',
                'Delete A Deparment',
                'Delete A Role',
                'Delete An Employee'
            ]
        }
    ])
    .then(function(response) {
        switch (response.mainPage) {
            case 'View All Departments':
                allDepartments();
                break;
            case 'View All Roles':
                allRoles();
                break;
            case 'View All Employees':
                allEmployees();
                break;
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Update An Employee Role':
                updateEmployeeRole();
                break;
            // bonus
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
            case 'View Employees by Manager':
                viewEmployeeByManager();
                break;
            case 'View Employees by Department':
                viewEmployeeByDepart();
                break;
            case 'Delete A Deparment':
                deleteDepartment();
                break;
            case 'Delete A Role':
                deleteRole();
                break;
            case 'Delete An Employee':
                deleteEmployee();
                break;
            case 'Exit':
                endApp();
                break;
        };
    });
};


// show all departments table
function allDepartments() {
    const sql = `SELECT * FROM department`
    const params = [];
    db.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.table(rows);
        mainPage();
    });
};


// show all the roles table
function allRoles() {
    const sql = `SELECT role.id AS ID, role.title AS Job_Title, department.name AS Department, role.salary AS Salary
                 FROM department 
                 JOIN role ON department.id = role.department_id
                 `;
    const params = [];
    db.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.table(rows);
        mainPage();
    });
};


// show all employees talbe
function allEmployees() {
    const sql = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, 
                 role.title AS Job_Title, department.name AS Department, role.salary AS Salary, 
                 CONCAT(e.first_name, " ", e.last_name) AS Manager 
                 FROM employee INNER JOIN role ON role.id = employee.role_id 
                 INNER JOIN department ON department.id = role.department_id
                 LEFT JOIN employee e ON employee.manager_id = e.id
                 `;
    const params = [];
    db.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.table(rows);
        mainPage();
    });
};


//add a department
async function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: "Please enter department's name:",
            validate: inputCheck  
        }
    ])
    .then(response => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [response.addDepartment];
        db.query(sql, params, function(err) {
            if(err) throw err;
            console.log('New department had been added.')
            console.table('New Department', response);
            mainPage();
        });
    });
};


// add a role
async function addRole() {
    db.query(`SELECT * FROM department`, function(err, res) {
        if(err) throw err;

        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: "Please enter the role's title:",
                validate: inputCheck
            },
            {
                type: 'input',
                name: 'salary',
                message: "Please enter the role's salary (Enter a number):",
                validate: input => {
                    if (!isNaN(input)) {
                        return true;
                    }
                    return 'Please enter a valid number.'
                }
            },
            {
                type: 'rawlist',
                name: 'roleDepartment',
                message: "Please select the role's department",
                choices: function() {
                    let departArray = [];
                    for (let i = 0; i < res.length; i++) {
                        departArray.push(res[i].name);
                    }
                    return departArray;
                }
            },
        ])
        .then(function(response) {
            let deptId;
            for (let j = 0; j < res.length; j++) {
                if (res[j].name === response.roleDepartment) {
                    deptId = res[j].id;
                }
            };

            const sql = `INSERT INTO role (title, salary, department_id) 
                         VALUES (?,?,?)`;
            const params = [response.roleName, response.salary, deptId];
    
            db.query(sql, params, function (err, res) {
                if(err) throw err;
                console.table('New role had been added', response);
                mainPage();
            });
        });
    });
};


// create role title array
// function selectRole() {
//     let roleArray = [];
//     db.query(`SELECT * FROM role`, function(err, res) {
//         if(err) throw err;
//         for (let i = 0; i < res.length; i++) {
//             roleArray.push(res[i].title);
//         };
//     });
//     return roleArray;
// };


// create manager array
// function selectManager() {
//     let managerArray = [];
//     db.query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS Manager
//               FROM employee ORDER BY Manager ASC`, function(err, res) {
//         if (err) throw err;
//         for (var i = 0; i < res.length; i++) {
//             managerArray.push(res[i].Manager);
//         };                
//     })
//     return managerArray;
// };


// add an employee
async function addEmployee() {
    db.query(`SELECT role.*, employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS Manager 
              FROM employee JOIN role ON role.id = employee.role_id 
              `, function(err, res) {
        inquirer.prompt ([
            {
               type: 'input',
               name: 'firstName',
               message: "Please enter employee's first name:",
               validate: inputCheck
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Please enter employee's last name:",
                validate: inputCheck
            },
            {
                type: 'list',
                name: 'role',
                message: "Please select the employee's role",
                choices: function() {
                    let roleArray = [];
                    if(err) throw err;
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    };
                    return roleArray;
                }
            },
            {
                type: 'list',
                name: 'manager',
                message: "Please select the employee's manager",
                choices: function() {
                    let managerArray = [];
                    for (var p = 0; p < res.length; p++) {
                    managerArray.push(res[p].Manager);
                   };                
                }
            }
        ])
        .then(function(response) {
            // let roleId = selectRole().indexOf(val.role) + 1;
            // let managerId = selectManager().indexOf(val.choice) + 1;

            let roleId;
            for (let j = 0; j < res.length; j++) {
                if (response.role === res[j].title) {
                    roleId = res[j].id;
                }
            };

           let managerId;
           for (let k = 0; k < res.length; k++) {
                if (response.manager === res[k].Manager) {
                    managerId = res[k].id;
                }
            };

    
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                         VALUES (?,?,?,?)`;
            const params = [response.firstName, response.lastName, roleId, managerId];
    
            db.query(sql, params, function(err) {
                if (err) throw err;
                console.table('New employee had been added', response);
                mainPage();
            });
        });    
    })
    
};


// update employee
async function updateEmployeeRole() {
    db.query(`SELECT employee.last_name, role.title FROM employee
              JOIN role ON role.id = employee.role_id`, function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'lastName',
                message: "Please select the employee's last name:",
                choices: function() {
                    let lastName =[];
                    for (let i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    };
                    return lastName;
                }
            },
            {
                type: 'rawlist',
                name: 'updateRole',
                message: "Please select the employee's new title:",
                choices: function() {
                    let roleArray = [];
                    if(err) throw err;
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    };
                    return roleArray;
                }
            }
        ])
        .then(function(response) {
            // let roleId = selectRole().indexOf(response.updateRole) + 1;
            let roleId;
            for (let j = 0; j < res.length; j++) {
                if (response.updateRole === res[j].title) {
                    roleId = res[j].id;
                }
            };

            const sql = `UPDATE employee SET last_name = ? WHERE role_id = ?`;
            const params = [response.last_name, roleId];

            db.query(sql, params, function(err) {
                if (err) throw err;
                console.table("Employee's title updated", response);
                mainPage();
            });
        });
    });
};


// view employee by manager first name
async function viewEmployeeByManager() {
    const sql = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, 
                 role.title AS Job_Title, department.name AS Department, role.salary AS Salary, 
                 CONCAT(e.first_name, " ", e.last_name) AS Manager 
                 FROM employee INNER JOIN role ON role.id = employee.role_id 
                 INNER JOIN department ON department.id = role.department_id
                 LEFT JOIN employee e ON employee.manager_id = e.id
                 ORDER BY Manager ASC
                 `;
    const params = [];
    db.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.table(rows);
        mainPage();
    });    
};


// view employee by department
async function viewEmployeeByDepart() {
    const sql = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, 
                 role.title AS Job_Title, department.name AS Department, role.salary AS Salary, 
                 CONCAT(e.first_name, " ", e.last_name) AS Manager 
                 FROM employee INNER JOIN role ON role.id = employee.role_id 
                 INNER JOIN department ON department.id = role.department_id
                 LEFT JOIN employee e ON employee.manager_id = e.id
                 ORDER BY Department ASC
                 `;
    const params = [];
    db.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.table(rows);
        mainPage();
    }); 
};


// delete a department
async function deleteDepartment() {
    db.query(`SELECT * FROM department`, function(err, res) {
        if(err) throw err;
        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'deleteDepart',
                message: 'Please select the department name which you want to delete:',
                choices: function() {
                    let departArray = [];
                    for (let i = 0; i < res.length; i++) {
                        departArray.push(res[i].name);
                    }
                    return departArray;
                }
            }
        ])
        .then(function(response) {
            const sql = `DELETE FROM department WHERE id =?`;
            const params = [response.choices];
        
            db.query(sql, params, function(err, result) {
                if(err) throw err;
                console.table("Department had been deleted", response);
                mainPage();
            })
        })
    })
}; 


//


// exit the app
function endApp() {
    db.end();
};
