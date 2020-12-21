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
    startMenu();
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
                'View all Departments',
                'View all Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                'Update Employee Role',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all Employees':
                    viewEmployees();
                    break;

                case 'View all Departments':
                    viewDepts();
                    break;

                case 'View all Roles':
                    viewRoles();
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

                case 'Update Employee Role':
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

// const viewEmployees = () => {
//     inquirer.prompt(
//         {
//             type: 'list',
//             name: 'employee',
//             message: 'Which employee would you like to view?',
//             choices: []  //dont know how to input employee list here from employee data
//         }
//     )
//         .then((answer) => {
//             const query = '';
//             connection.query(query,
//                 {

//                 }, (err, res) => {
//                     //forloop
//                     //start menu over again
//                     startMenu();
//                 })

//         })
// };


//worked on with tutor
const viewDepts = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'department',
            message: 'Select the department you would like to view.',
            choices: ['Sales', 'Engineering', 'Finance', 'Legal']
        }
    )
        .then((answer) => { //listing all columns we want info from(from diff tables)
            connection.query('SELECT id FROM department WHERE ?', {
                dept_name: answer.department
            }, (err, departmentId) => {
                if (err) { throw err; } //departmentId is the res

                let query = 'SELECT employee.first_name, employee.last_name, empRole.title, department.dept_name FROM employee LEFT JOIN empRole ON employee.role_id = role.id '
                query += 'LEFT JOIN department ON empRole.department_id = ?';
                connection.query(query, departmentId, (err, res) => { //need error consoled
                    if (err) throw err;
                    console.log(res);
                    console.table(res);
                    startMenu();
                });
            });

        });
};

const viewRoles = () => {
    inquirer.prompt(
        [{
            type: 'list',
            name: 'role',
            message: 'Select the role you would like to view.',
            choices: ['Sales Lead',
                'Salesperson',
                'Lead Engineer',
                'Software Engineer',
                'Account Manager',
                'Accountant',
                'Legal Team Lead']
        }]
    )
        .then((answer) => {
            let query = 'SELECT employee.first_name, employee.last_name, empRole.title, department.dept_name FROM employee LEFT JOIN empRole on employee.role_id = role.id';
            connection.query(query,
                {
                    role_id: answer.role

                }, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    startMenu();
                })

        })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee you would like to add's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee you would like to add's last name?"
        },
        {
            type: 'list',
            name: 'role_id',
            message: "What is this employee's role?",
            choices: ['Sales Lead',
                'Salesperson',
                'Lead Engineer',
                'Software Engineer',
                'Account Manager',
                'Accountant',
                'Legal Team Lead']
        }])
        .then(({ first_name, last_name, role_id }) => {
            let query = 'INSERT INTO employee SET ?';
            connection.query(query,
                {
                    first_name,
                    last_name,
                    role_id
                }, (err, res) => {
                    if (err) throw err;
                    console.log(`You have successfully added an employee.`)
                    console.table(res);
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
    //ice cream CRUD activity
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



