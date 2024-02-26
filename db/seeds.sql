INSERT INTO department (name)
VALUES  ("Accounting"),
        ("Sales"),
        ("Marketing"),
        ("IT"),
        ("Distribution");

INSERT INTO role (title, salary, department_id)
VALUE   ("Salesperson", 100000.00, 2),
        ("Market Manager", 90000.00, 3),
        ("Technician", 75000.00, 4),
        ("CPA", 200000.00, 1),
        ("Warehouse Attendant", 800000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE   ("Tim", "Taylor", 1, 3),
        ("Pat", "Flatley", 1, 1),
        ("Darien", "Hatcher", 3, 2),
        ("John", "LeClair", 5, 2),
        ("Adam", "Graves", 5, 2);