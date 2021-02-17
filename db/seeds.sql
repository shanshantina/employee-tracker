INSERT INTO department (name)
VALUES
('Production'),
('Legal'),
('Marketing'),
('Human Resource'),
('Accounting and Finance'),
('IT');


INSERT INTO role (title, salary, department_id)
VALUES
('Production Designer', 70000, 1),
('Lawyer', 90000, 2),
('Marketing Analyst', 70000, 3),
('Talent Management', 70000, 4),
('Accountant', 80000, 5),
('Computer Engineer', 100000, 6);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
 ('James', 'Fraser', 2, NULL),
 ('Jack', 'London', 3, 15),
 ('Robert', 'Bruce', 5, 25),
 ('Peter', 'Greenaway', 6, 30),
 ('Derek', 'Jarman', 1, 10),
 ('Paolo', 'Pasolini', 4, 20),
 ('Heathcote', 'Williams', 3, 15),
 ('Sandy', 'Powell', 5, 25),
 ('Emil', 'Zola', 1, 10),
 ('Sissy', 'Coalpits', 2, NULL),
 ('Antoinette', 'Capet', 4, 20),
 ('Samuel', 'Delany', 6, 35),
 ('Tony', 'Duvert', 5, 40),
 ('Dennis', 'Cooper', 1, 45),
 ('Monica', 'Bellucci', 3, 50),
 ('Samuel', 'Johnson', 4, 55);