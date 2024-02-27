const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
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
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Exit"
            ],
            message: "Choose an option:",
            name: "option"
        })
        .then(function (result) {
            console.log(result.option + " selected.");
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
            connection.query("INSERT INTO department (department_name) VALUES (?)", [answer.deptName],
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
    const queryEmployees =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id";
    const queryRoles = "SELECT * FROM role";
    connection.query(queryEmployees, (err, resEmployees) => {
        if (err) throw err;
        connection.query(queryRoles, (err, resRoles) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Select the employee to update:",
                        choices: resEmployees.map(
                            (employee) =>
                                `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "Select the new role:",
                        choices: resRoles.map((role) => role.title),
                    },
                ])
                .then((answers) => {
                    const employee = resEmployees.find(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}` ===
                            answers.employee
                    );
                    const role = resRoles.find(
                        (role) => role.title === answers.role
                    );
                    const query =
                        "UPDATE employee SET role_id = ? WHERE id = ?";
                    connection.query(
                        query,
                        [role.id, employee.id],
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                            );
                            startPage();
                        }
                    );
                });
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
    const query = "SELECT role.title, role.id, department.department_name, role.salary from role join department on role.department_id = department.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        startPage();
    });
}

// function to view all employees
function viewEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        startPage();
    });
}

function quit() {
    connection.end();
    process.exit();
}