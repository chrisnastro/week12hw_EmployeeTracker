const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql");
const db = require(".");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mackenzie",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);

    startPage();
});

function startPage() {
    inquirer
        .prompt({
            type: "list",
            choices: [
                "Add Employee",
                "Add Department",
                "Add Role",
                "View Employees",
                "View Departments",
                "View Roles",
                "Update Employee Role",
                "Exit"
            ],
            message: "Choose an option:",
            name: "option"
        })
        .then(function (result) {
            console.log(result.option + "selected.");

            switch (result.option) {
                case "View All Departments":
                    viewDepartments();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                default:
                    quit();
            }
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee's first name:",
                name: "empFirstName"
            },
            {
                type: "input",
                message: "Enter employee's last name:",
                name: "empLastName"
            },
            {
                type: "input",
                message: "What is the employee's role ID?",
                name: "roleId"
            },
            {
                type: "input",
                message: "What is the manager's ID?",
                name: "managerId"
            }
        ])
        .then(function (answer) {

            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.empFirstName, answer.empLastName, answer.roleId, answer.managerId], function (err, res) {
                if (err) throw err;
                console.table(res);
                startPage();
            })
        })
}

function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "Enter the department name:",
            name: "deptName"
        })
        .then(function (answer) {
            connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName],
                function (err, res) {
                    if (err) throw err;
                    console.table(res)
                    startPage()
                })
        })
}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the role title:",
                name: "roleName"
            },
            {
                type: "input",
                message: "Enter the salary for this role:",
                name: "roleSalary"
            },
            {
                type: "input",
                message: "Enter department ID number:",
                name: "deptId"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.roleSalary, answer.deptId],
                function (err, res) {
                    console.table(res);
                    startPage();
                });
        });
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the employee to update:",
                name: "eeUpdate"
            },
            {
                type: "input",
                message: "Enter the role you'd like to update to:",
                name: "updateRole"
            }
        ])
        .then(function (answer) {
            connection.query("UPDATE employee SET role_id=? WHERE first_name= ?", [answer.updateRole, answer.eeUpdate],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    startPage();
                });
        });
}

function viewDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPage();
    });
}

function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPage();
    });
}

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPage();
    });
}

function quit() {
    connection.end();
    process.exit();
}