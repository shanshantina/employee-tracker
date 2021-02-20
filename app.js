const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');


const inputCheck = require('./utils/inputCheck');
const Database = require('./utils/connection');


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
                'View Departments Budget',
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
            case 'View Departments Budget':
                viewBudget();
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


// view the department budget
async function viewBudget() {
    let salary = await db.query(`SELECT department.name AS Department, role.salary FROM employee e 
                                 LEFT JOIN employee m ON e.manager_id = m.id 
                                 INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id 
                                 ORDER BY department ASC`);
    let departments = await db.query(`SELECT name FROM department ORDER BY name ASC`);

    let budgetArr = [];
    let department;

    for (i=0; i < departments.length; i++) {
        let departmentBudget = 0;

        for (j=0; j < salary.length; j++) {
            if (departments[i].name === salary[j].Department) {
                departmentBudget += salary[j].salary;
            };
        };

        department = {
            Department: departments[i].name,
            Budget: departmentBudget
        }

        budgetArr.push(department);
    };
    
    console.table(budgetArr);
    mainPage()
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
    let selectEmployee = await db.query(`SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee`);
    selectEmployee.push( {id: null, name: 'Cancel' });
    let roleList = await db.query(`SELECT id, title FROM role`);
    
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'employeeName',
            message: "Please select the employee's name:",
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
        else {
            console.log("\x1b[35m", "No changes made.");
        }
        mainPage();
    }); 
};


// update employee manager
async function updateEmployeeManager() {
    let employees = await db.query(`SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee`);
    employees.push( {id: null, name: 'Cancel' });
    
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'employeeName',
            message: "Please select the employee's name:",
            choices: employees.map(employee => employee.name)
        }
    ])
    .then(replyEmployee => {
        if(replyEmployee.employeeName === 'Cancel') {
            console.log("\x1b[35m", "No changes made.");
            mainPage();
            return;
        };

        let managers = employees.filter(currentEmployee => currentEmployee.name != replyEmployee.employeeName);
            for (i in managers) {
            if (managers[i].name === 'Cancel') {
                managers[i].name = 'None';
            };
        };

        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'managerName',
                message: "Please select the employee's new manager:",
                choices: managers.map(employee => employee.name)
            },
        ])
        .then(function(replyManager) {
            let nameId = employees.find(employee => employee.name === replyEmployee.employeeName).id;
            let managerNewId = managers.find(employee => employee.name === replyManager.managerName).id;

            db.query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [managerNewId, nameId]);
            console.log("\x1b[35m", `${replyEmployee.employeeName}'s new manager has been updated to ${replyManager.managerName}.`);        
   
            mainPage();
        });
    }); 
};


// delete a department
async function deleteDepartment() {
    let departmentList = await db.query(`SELECT id, name FROM department`);
    departmentList.push({ id: null, name: 'Cancel' });

    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'deleteDepart',
            message: 'Please select the department which you want to delete:',
            choices: departmentList.map(department => department.name)
        }
    ])
    .then(function(response) {
        if (response.deleteDepart != 'Cancel') {
            let deletedDepartId = departmentList.find(department => department.name === response.deleteDepart).id;
            db.query(`DELETE FROM department WHERE id =?`,[deletedDepartId]);
    
            console.log("\x1b[35m", `${response.deleteDepart} has been deleted from department table.`);
        }
        else {
            console.log("\x1b[35m", "No changes made.");
        }
        mainPage();  
    });   
}; 


//delete a role
async function deleteRole() {
    let roles = await db.query(`SELECT id, title FROM role`);
    roles.push({ id: null, title: 'Cancel' });

    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'deleteRole',
            message: 'Please select the role title which you want to delete:',
            choices: roles.map(role => role.title)
        }
    ])
    .then(function(response) {
        if (response.deleteRole != 'Cancel') {
            let deletedRoleId = roles.find(role => role.title === response.deleteRole).id;

            db.query(`DELETE FROM role WHERE id =?`, [deletedRoleId]);
            console.log("\x1b[35m", `${response.deleteRole} has been deleted from role table.`);
        }
        else {
            console.log("\x1b[35m", "No changes made.");
        }
        mainPage();
    });
};


// delete an employee
async function deleteEmployee() {
    let employees = await db.query(`SELECT id, CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee`);
    employees.push( {id: null, name: 'Cancel' });

    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'deleteEmployee',
            message: 'Please select the employee which you want to delete:',
            choices: employees.map(employee => employee.name)
        }
    ])
    .then(function(response) {
        if (response.deleteEmployee != 'Cancel') {
            let deleteEmployeeId = employees.find(employee => employee.name === response.deleteEmployee).id;

            db.query(`DELETE FROM employee WHERE id =?`, [deleteEmployeeId]);
            console.log("\x1b[35m", `${response.deleteEmployee} has been deleted from employee table.`);
        }
        else {
            console.log("\x1b[35m", "No changes made.");
        }       
        mainPage();
    }); 
};


// exit the app
function endApp() {
    db.close();   
};
