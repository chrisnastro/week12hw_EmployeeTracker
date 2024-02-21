const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require ("mysql");
const db = require(".");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mackenzie",
    database: "employee_db"
});

connection.connect(function(err) {
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
    .then(function(result) {
        console.log(result.option + "selected.");

        switch (result.option)
    })
}