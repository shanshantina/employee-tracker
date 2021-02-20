const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');


const inputCheck = require('./utils/inputCheck');


class Database {
    constructor (config) {
        this.connection = mysql.createConnection(config);
    };

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, rows) => {
                if(err) {
                    return reject(err);
                };
                resolve(rows)
            });
        });
    };
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    };
};


// create connection to database
const db = new Database ({
    host: 'localhost',
    user: 'root',
    password: 'rA2!t0yd[W!qf@>',
    database: 'employees_db'
});



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

function mainPage() {
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'mainPage',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'View Employees by Manager',
                'View Employees by Department',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role',
                'Update Employee Manager',
                'Delete A Deparment',
                'Delete A Role',
                'Delete An Employee',
                'Exit'
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
            case 'View Employees by Manager':
                viewEmployeeByManager();
                break;
            case 'View Employees by Department':
                viewEmployeeByDepart();
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
            case 'Update Employee Manager':
                updateEmployeeManager();
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
async function allDepartments() {
    await db.query(`SELECT id, name AS Department FROM department`, (err, rows) => {
        if(err) throw err;
        console.table(rows);
        mainPage();
    });
};


// show all the roles table
async function allRoles() {     
    await db.query(`SELECT role.id AS ID, role.title AS Job_Title, department.name AS Department, role.salary AS Salary
                    FROM department 
                    JOIN role ON department.id = role.department_id`, 
        (err, rows) => {
        if(err) throw err;
        console.table(rows);
        mainPage();
    });
};


// show all employees talbe
async function allEmployees() {
    await db.query(`SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, 
                    role.title AS Job_Title, department.name AS Department, role.salary AS Salary, 
                    CONCAT(e.first_name, " ", e.last_name) AS Manager 
                    FROM employee INNER JOIN role ON role.id = employee.role_id 
                    INNER JOIN department ON department.id = role.department_id
                    LEFT JOIN employee e ON employee.manager_id = e.id`,
        (err, rows) => {
        if(err) throw err;
        console.table(rows);
        mainPage();
    });
};


// view employee by manager first name
async function viewEmployeeByManager() {
    await db.query(`SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, 
                    role.title AS Job_Title, department.name AS Department, role.salary AS Salary, 
                    CONCAT(e.first_name, " ", e.last_name) AS Manager 
                    FROM employee INNER JOIN role ON role.id = employee.role_id 
                    INNER JOIN department ON department.id = role.department_id
                    LEFT JOIN employee e ON employee.manager_id = e.id
                    ORDER BY Manager ASC`,
        (err, rows) => {
        if(err) throw err;
        console.table(rows);
        mainPage();
    });    
};


// view employee by department
async function viewEmployeeByDepart() {
    await db.query(`SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, 
                    role.title AS Job_Title, department.name AS Department, role.salary AS Salary, 
                    CONCAT(e.first_name, " ", e.last_name) AS Manager 
                    FROM employee INNER JOIN role ON role.id = employee.role_id 
                    INNER JOIN department ON department.id = role.department_id
                    LEFT JOIN employee e ON employee.manager_id = e.id
                    ORDER BY Department ASC`,
        (err, rows) => {
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
    .then(response => {;
        db.query(`INSERT INTO department (name) VALUES (?)`, [response.addDepartment]);
        console.log("\x1b[35m", `${response.addDepartment} has been added to department table.`);
        mainPage();
    });
};


// add a role
async function addRole() {
    let departments = await db.query (`SELECT * FROM department`);

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
            choices: departments.map(department => department.name)
        },
    ])
    .then(function(response) {
        let deptId = departments.find(department => department.name === response.roleDepartment).id;
     
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
                 [response.roleName, response.salary, deptId]);
        console.log("\x1b[35m", `${response.roleName} has been added to Department: ${response.roleDepartment}.`);
        mainPage();
    });
};


// add an employee
async function addEmployee() {
    let selectRole = await db.query(`SELECT id, title FROM role`);
    let selectManager = await db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS Manager FROM employee`);
    selectManager.unshift({ id: null, Manager: "None" });

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
            type: 'rawlist',
            name: 'role',
            message: "Please select the employee's role",
            choices: selectRole.map(role => role.title)
        },
        {
            type: 'rawlist',
            name: 'manager',
            message: "Please select the employee's manager",
            choices:  selectManager.map(employee => employee.Manager)
        }
    ])
    .then(function(response) {
        let roleId = selectRole.find(role => role.title === response.role).id;  
        let managerId = selectManager.find(employee => employee.Manager === response.manager).id;

        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
                  [response.firstName, response.lastName, roleId, managerId]);
        
        console.log("\x1b[35m", `${response.firstName} ${response.lastName} has been added to employee table.`);
        mainPage();
    });    
};


// update employee
async function updateEmployeeRole() {
    let selectEmployee = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
    selectEmployee.push( {id: null, name: 'Cancel' });
    let roleList = await db.query(`SELECT id, title FROM role`);
    
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'employeeName',
            message: "Please select the employee's last name:",
            choices: selectEmployee.map(employee => employee.name)
        },
        {
            type: 'rawlist',
            name: 'newRole',
            message: "Please select the employee's new title:",
            choices: roleList.map(role => role.title)
        }
    ])
    .then(function(response) {
        if (response.employeeName != 'Cancel') {
            let employeeId = selectEmployee.find(employee => employee.name === response.employeeName).id;
            let roleNewId = roleList.find(role => role.title === response.newRole).id;

            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleNewId, employeeId]);
            console.log("\x1b[35m", `${response.employeeName} new role ${response.newRole} has been updated.`);        
        }
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


//delete a role
async function deleteRole() {
    db.query(`SELECT * FROM role`, function(err, res) {
        if(err) throw err;
        inquirer.prompt([
            {
                input: 'rawlist',
                name: 'deleteRole',
                message: 'Please select the role title which you want to delete:',
                choices: function() {
                    let roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                }
            }
        ])
        .then(function(response) {
            const sql = `DELETE FROM role WHERE id =?`;
            const params = [response.choices];
        
            db.query(sql, params, function(err, result) {
                if(err) throw err;
                console.table("Role had been deleted", response);
                mainPage();
            });
        });
    });
};


// delete an employee
async function deleteRole() {
    db.query(`SELECT id, CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee`, function(err, res) {
        if(err) throw err;
        inquirer.prompt([
            {
                input: 'rawlist',
                name: 'deleteEmployee',
                message: 'Please select the employee which you want to delete:',
                choices: function() {
                    let employeeArray = [];
                    for (let i = 0; i < res.length; i++) {
                        employeeArray.push(res[i].name);
                    }
                    return employeeArray;
                }
            }
        ])
        .then(function(response) {
            const sql = `DELETE FROM employee WHERE id =?`;
            const params = [response.choices];
        
            db.query(sql, params, function(err, result) {
                if(err) throw err;
                console.table("Employee had been deleted", response);
                mainPage();
            });
        });
    });
};


// exit the app
function endApp() {
    db.end();
};
