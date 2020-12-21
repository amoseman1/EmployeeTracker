//require packages
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');//package formats the console data

//create connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'New2Coding',
    database: 'company_DB',
});

//make a connection
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    // call start function startMenu();
});

//functions for command line prompts and data queries
const startMenu = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all Employees',
                'View all  Employees by Department',
                'View all  Employees by Role',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                'Update Employee Roles',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all Employees':
                    viewEmployees();
                    break;

                case 'View all  Employees by Department':
                    employeesByDept();
                    break;

                case 'View all  Employees by Role':
                    employeesByRole();
                    break;

                case 'Add an Employee':
                    addEmployee();
                    break;

                case 'Add a Department':
                    addDept();
                    break;

                case 'Add a Role':
                    addRole();
                    break;

                case 'Update Employee Roles':
                    updateRole();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const viewEmployees = () => {
    inquirer.prompt(
        [{}]
    )
        .then((answer) => {
            const query = '';
            connection.query(query,
                {

                }, (err, res) => {
                    //forloop
                    //start menu over again
                    startMenu();
                })

        })
};

const employeesByDept = () => {
    inquirer.prompt(
        [{}]
    )
        .then((answer) => {
            const query = '';
            connection.query(query,
                {

                }, (err, res) => {
                    //forloop
                    //start menu over again
                    startMenu();
                })

        })
};

const employeesByRole = () => {
    inquirer.prompt(
        [{}]
    )
        .then((answer) => {
            const query = '';
            connection.query(query,
                {

                }, (err, res) => {
                    //forloop
                    //start menu over again
                    startMenu();
                })

        })
};

const addEmployee = () => {
    inquirer.prompt(
        [{}]
    )
        .then((answer) => {
            const query = '';
            connection.query(query,
                {

                }, (err, res) => {
                    //forloop
                    //start menu over again
                    startMenu();
                })

        })
};

const addDept = () => {
    inquirer.prompt(
        [{}]
    )
        .then((answer) => {
            const query = '';
            connection.query(query,
                {

                }, (err, res) => {
                    //forloop
                    //start menu over again
                    startMenu();
                })

        })
};

const addRole = () => {
    inquirer.prompt(
        [{}]
    )
        .then((answer) => {
            const query = '';
            connection.query(query,
                {

                }, (err, res) => {
                    //forloop
                    //start menu over again
                    startMenu();
                })

        })
};

const updateRole = () => {
    inquirer.prompt(
        [{}]
    )
        .then((answer) => {
            const query = '';
            connection.query(query,
                {

                }, (err, res) => {
                    //forloop
                    //start menu over again
                    startMenu();
                })

        })
};



