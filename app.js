const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');

// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rA2!t0yd[W!qf@>',
    database: 'employees_db'
});


db.connect((err) => {
    if (err) {
        return console.log(err);
    }
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
    inquirer.prompt({
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
            // bonus
            'Update Employee Manager',
            'View Employees by Manager',
            'View Employees by Department',
            'Delete A Deparment',
            'Delete A Role',
            'Delete An Employee'
        ]
    })
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
        };
    });
};


// show all departments table
function allDepartments() {
    const sql = `SELECT * FROM department`
    const params = [];
    db.query(sql, params, (err, rows) => {
        if (err) {
            return console.log(err);
        }
        console.table(rows);
        mainPage();
    });
};


// show all the roles table
function allRoles() {
    const sql = `SELECT role.id AS ID, role.title AS Job_Title, department.name AS Department, role.salary AS Salary
                 FROM department 
                 JOIN role ON department.id = role.department_id;
                 `;
    const params = [];
    db.query(sql, params, (err, rows) => {
        if (err) {
            return console.log(err);
        }
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
                 LEFT JOIN employee e ON employee.manager_id = e.id;
                 `;
    const params = [];
    db.query(sql, params, (err, rows) => {
        if (err) {
            return console.log(err);
        }
        console.table(rows);
        mainPage();
    });
};


