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

//this works
const viewEmployees = () => {
    let query = 'SELECT employee.first_name, employee.last_name, empRole.title, empRole.salary, department.dept_name FROM employee LEFT JOIN empRole ON employee.role_id = empRole.id LEFT JOIN department ON empRole.department_id = department.id'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
        console.table(res);
        startMenu();
    })
};

const viewDepts = () => { //ERR - column id is ambiguous in on clause 
    inquirer.prompt(
        {
            type: 'list',
            name: 'department',
            message: 'Select the department you would like to view.',
            choices: ['Sales', 'Engineering', 'Finance', 'Legal']
        }
    )
        .then((answer) => {
            connection.query('SELECT department.id FROM department WHERE ?', {
                dept_name: answer.department
            }, (err, departmentId) => {
                if (err) { throw err }; //departmentId is the res

                let query = 'SELECT employee.first_name, employee.last_name, empRole.title, department.dept_name FROM employee LEFT JOIN empRole ON employee.role_id = empRole.id '
                query += 'LEFT JOIN department ON empRole.department_id = ?;';
                console.log(query, departmentId)
                // connection.query(query, departmentId, (err, res) => {
                //     if (err) throw err;
                //     console.log(res);
                //     console.table(res);
                //     startMenu();
                // });
            });

        });
};

//this works
const viewRoles = () => {
    let query = 'SELECT empRole.id, empRole.title, department.dept_name, empRole.salary FROM empRole LEFT JOIN department ON empRole.department_id = department.id';
    connection.query(query,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            startMenu();
        })
};

//this works
const addEmployee = () => {
    let roleChoices;
    connection.query('SELECT id, title FROM empRole', (err, res) => {
        if (err) throw err;
        //console.log(res);
        roleChoices = res.map(({ id, title }) => {
            return {
                name: title,
                value: id
            }

        })
        // console.log(roleChoices);
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
                choices: roleChoices
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
                        console.log(`You have successfully added ${first_name} ${last_name} as an employee.`)
                        console.log(res);
                        startMenu();
                    })

            });
    })
};


//this works
const addDept = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'dept_name',
            message: 'What department would you like to add?'
        })
        .then(({ dept_name }) => {
            connection.query('SELECT id, dept_name FROM department', (err, res) => {
                if (err) throw err;
                //console.log(res);
            });
            connection.query('INSERT INTO department SET ?',
                {
                    dept_name,
                },
                (err) => {
                    if (err) throw err;
                    console.log(`Department ${dept_name} has been added`);
                    startMenu();
                });
        });
};

const addRole = () => { //make a query to find department, 
    inquirer.prompt(
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        // {
        //     type: 'list',
        //     name: 'dept_id',
        //     message: 'What department will the role be under?'
        //     choices:'deptArr'
        // }
    )
        .then(({ title, salary, dept_id }) => {
            connection.query('SELECT id, dept_name FROM department', (err, res) => {
                if (err) throw err;
                //console.log(res);
                // const deptArr = res.map((deptIt) => {
                //     return {
                //         name: deptIt.dept_name,
                //         value: deptIt.id,
                //     };
            },
                connection.query('INSERT INTO empRole SET ?',
                    {
                        title,
                        salary,
                        // dept_id
                    }, (err, res) => {
                        if (err) throw err;
                        console.log(`A new role of ${title} was successfully added.`);
                        console.table(res);
                        startMenu();
                    })
            );
        });
    // });
};

const updateRole = () => {
    inquirer.prompt(
        [{
            type: 'input',
            name: 'employee',
            message: "Which employee's role would you like to update?"
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Choose a new role for the employee.',
            choices: ['Sales Lead',
                'Salesperson',
                'Lead Engineer',
                'Software Engineer',
                'Account Manager',
                'Accountant',
                'Legal Team Lead']

        }])  // ERR -UnhandledPromiseRejectionWarning: TypeError: argument callback must be a function when provided
        .then(({ employee, role_id }) => {
            let query = 'UPDATE employee SET ? WHERE ?';
            connection.query(query,
                {
                    employee
                },
                {
                    role_id

                }, (err, res) => {
                    console.log(`${res.affectedRows} employee ${employee} was updated to this role: ${role_id}`);
                    startMenu();
                });
        });
};
