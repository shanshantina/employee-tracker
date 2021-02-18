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
 ('Jack', 'London', 3, 5),
 ('Robert', 'Bruce', 5, 2),
 ('Peter', 'Greenaway', 6, 3),
 ('Derek', 'Jarman', 1, 1),
 ('Paolo', 'Pasolini', 4, 4),
 ('Heathcote', 'Williams', 3, 7),
 ('Sandy', 'Powell', 5, 8),
 ('Emil', 'Zola', 1, 10),
 ('Sissy', 'Coalpits', 2, NULL),
 ('Antoinette', 'Capet', 4, 9),
 ('Samuel', 'Delany', 6, 5),
 ('Tony', 'Duvert', 5, 1),
 ('Dennis', 'Cooper', 1, 7),
 ('Monica', 'Bellucci', 3, 8),
 ('Samuel', 'Johnson', 4, 3);