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
        .createPromptModule({
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
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "View Departments":
                    viewDepartments();
                    break;
                case "View Roles":
                    viewRoles();
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
    prompt([
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