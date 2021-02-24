# employee-tracker

  ![License Badge](https://img.shields.io/badge/License-MIT-brightgreen.svg) ![Language](https://img.shields.io/github/languages/count/shanshantina/employee-tracker?style=plastic&logo=appveyor&color=ff69b4) ![Language](https://img.shields.io/github/languages/top/shanshantina/employee-tracker?style=flat&logo=appveyor&color=blueviolet)
  

  ## Description
  This is a employee tracker which is a command-line application to manage a company's employee database by using Node.js, Inquirer, and MySQL.

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Credits](#credits)
  * [Questions](#questions)

  ## Installation
  Instructions to get the application run: 
  1. Download and install [Visual Studio Code](https://code.visualstudio.com/Download) if user don't have it installed in the computer. 
  2. Download and install [Node.js](https://nodejs.org/en/) if user don't have it installed in the computer. 
  3. Open the terminal, first run `npm install inquirer`, `npm install --save mysql2`, `npm install console.table --save`, `npm install chalk` to install all three packages: 
     * `inquirer` will prompt user for inputting the information in command line. 
     * `mysql2` to connect to MySQL database and perform queries.
     * `console.table` to print MySQL rows to the console.
     * `chalk` to change Terminal string color. 

The application itself runs by command `node app.js` or `node app`.

  ## Usage
  
   [Employee Tracker Walkthrough Video](https://drive.google.com/file/d/1J5iWysEwICot7b8-4jJhsPIKkp3uhwl5/view)

   ![demo](./assets/image/tracker.gif)

  Employee Tracker is a command-line application that accepts user input: 
  1. when user starts the application, then user is presented with the following options: 
      * View And Edit Department Information
      * View And Edit Role Information
      * View And Edit Employee Information
      * Exit 
  2. when user selects **View And Edit Department Information**, then user is presented with the following options: 
      * View All Departments
      * View Departments Budget
      * Add A Department
      * Delete A Deparment
      * Go Back To Main Page.
  3. when user selects **View All Departments**, then user is presented with a formatted table showing department names and department ids.
  4. when user selects **View Departments Budget**, then user is presented with a formatted table showing department names and budges.
  5. when user selects **Add A Department**, then user is prompted to enter the name of the department and that department is added to the database.
  6. when user selects **Delete A Deparment**, then user is prompted to select the name of department from department list and that department is deleted from the database.
  7. when user selects **Go Back To Main Page**, then use is presented back to the starting page of the application.
  8. when user selects **View And Edit Role Information**, then user is presented with the following options: 
      * View All Roles
      * Add A Role
      * Delete A Role
      * Go Back To Main Page
  9. when user selects **View All Roles**, then user is presented with the job title, role id, the department that role belongs to, and the salary for that role.
  10. when user selects **Add A Role**, then user is prompted to enter the name, salary, and department for the role and that role is added to the database.
  11. when user selects **Delete A Role**, then user is prompted to select the title of role from role title list and that role is deleted from the database.
  12. when user selects **View And Edit Employee Information**, then user is presented with the following options: 
      * View All Employees
      * View Employees by Manager
      * View Employees by Department
      * Add An Employee
      * Update An Employee Role
      * Update Employee Manager
      * Delete An Employee
      * Go Back To Main Page.
  13. when user selects **View All Employees**, then user is presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
  14. when user selects **View Employees by Manager**, then user is presentd with a formatted table showing employee data sorts by employee's manager in ascending order.
  15. when user selects **View Employees by Department**, then user is presentd with a formatted table showing employee data sorts by employee's departments in ascending order.
  16. when user selects **Add An Employee**, then user is prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database.
  17. when user selects **Update An Employee Role**, then user is prompted to select an employee to update and their new role and this information is updated in the database.
  18. when user selects **Update Employee Manager**, then user is prompted to select an employee to update and their new manager and this information is updated in the database.
  19. when user selects **Delete An Employee**, then user is prompted to select the employee's name from employee name list and that employee is deleted from the database.
  20. when user selects **Exit**, the application is ended.
  

  ## License
  
  This project is under license MIT
  
  [License Link](https://choosealicense.com/licenses/)

  ## Contributing
  Not Available 

  ## Tests
  Not Available

  ## Credits
  The lists of resources used to complete this challenge: 
  1. Module 12 SQL from canvas. 
  2. Google (https://www.google.ca/) 
  3. MDN Web Docs (https://developer.mozilla.org/en-US/docs/Web/JavaScript).
  4. mysql2 (https://www.npmjs.com/package/mysql2).
  5. console.table (https://www.npmjs.com/package/console.table). 
  6. chalk (https://www.npmjs.com/package/chalk). 
  7. Supports from instructor, assistant instructor and Tutor.

  ## Questions

  For any questions, please contact me with the information below:

  GitHub: [@shanshantina](https://github.com/shanshantina)

  
  Email: tinaxu84@gmail.com