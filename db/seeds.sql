INSERT INTO department (department_name)
VALUES  ("Accounting"),
        ("Sales"),
        ("Marketing"),
        ("IT"),
        ("Customer Service"),
        ("Distribution"),
        ("Management");

INSERT INTO role (title, salary, department_id)
VALUE   ("Accountant", 200000.00, 1),
        ("Salesperson", 100000.00, 2),
        ("Market Manager", 90000.00, 3),
        ("IT Technician", 75000.00, 4),
        ("Customer Service Rep", 50000.00, 5),
        ("Warehouse Attendant", 80000.00, 6),
        ("CEO", 300000.00, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE   ("Tim", "Taylor", 1, 6),
        ("Pat", "Flatley", 2, 6),
        ("Darien", "Hatcher", 3, 6),
        ("John", "LeClair", 4, 6),
        ("Craig", "MacTavish", 5, 6),
        ("Adam", "Graves", 6, 0);