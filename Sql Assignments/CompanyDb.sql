-- Assignment 1

CREATE DATABASE IF NOT EXISTS CompanyDB;
USE CompanyDB;

CREATE TABLE Departments (
    DepartmentID INT AUTO_INCREMENT PRIMARY KEY,
    DepartmentName VARCHAR(50) NOT NULL UNIQUE,
    Location VARCHAR(100) NOT NULL
);

CREATE TABLE Employees (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    DepartmentID INT NOT NULL,
    DateOfBirth DATE NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    HireDate DATE NOT NULL CHECK (HireDate >= '2000-01-01'),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

CREATE TABLE Projects (
    ProjectID INT AUTO_INCREMENT PRIMARY KEY,
    ProjectName VARCHAR(100) NOT NULL UNIQUE,
    StartDate DATE NOT NULL,
    EndDate DATE, CHECK (EndDate > StartDate),
    Budget DECIMAL(15, 2) NOT NULL CHECK (Budget > 0)
);


CREATE TABLE Assignments (
    AssignmentID INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    ProjectID INT NOT NULL,
    HoursWorked DECIMAL(5, 2) NOT NULL CHECK (HoursWorked >= 0),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);


CREATE TABLE Salaries (
    SalaryID INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    BaseSalary DECIMAL(10, 2) NOT NULL CHECK (BaseSalary > 0),
    Bonus DECIMAL(10, 2) CHECK (Bonus >= 0),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);


INSERT INTO Departments (DepartmentName, Location) VALUES
('HR', 'New York'),
('IT', 'San Francisco'),
('Finance', 'Chicago'),
('Marketing', 'Los Angeles');


INSERT INTO Employees (FirstName, LastName, DepartmentID, DateOfBirth, Email, Gender, HireDate) VALUES
('John', 'Doe', 1, '1985-04-12', 'john.doe@example.com', 'Male', '2010-05-10'),
('Jane', 'Smith', 2, '1990-08-23', 'jane.smith@example.com', 'Female', '2015-07-19'),
('Alice', 'Brown', 3, '1982-11-17', 'alice.brown@example.com', 'Female', '2008-02-25'),
('Bob', 'Johnson', 4, '1979-03-30', 'bob.johnson@example.com', 'Male', '2005-01-15');


INSERT INTO Projects (ProjectName, StartDate, EndDate, Budget) VALUES
('Website Redesign', '2023-01-01', '2023-12-31', 100000),
('Mobile App Development', '2023-03-01', '2024-02-28', 150000),
('Data Migration', '2022-06-01', '2023-06-30', 50000);


INSERT INTO Assignments (EmployeeID, ProjectID, HoursWorked) VALUES
(1, 1, 120),
(2, 2, 250),
(3, 3, 180),
(4, 1, 90);


INSERT INTO Salaries (EmployeeID, BaseSalary, Bonus) VALUES
(1, 60000, 5000),
(2, 80000, 7000),
(3, 75000, 6000),
(4, 90000, 10000);



-- Retrive all the employees in IT departments
select*from Employees where DepartmentID=2;

-- find all employees hire after 2010
select * from Employees where HireDate>'2010-12-12';

-- 3. List projects with a budget exceeding $80,000
select*from Projects where Budget>80000;
select * from Employees  where timestampdiff(year,HireDate,curdate())<14;

-- 4. Sort employees by their hire date in descending order.
select * from employees order by hiredate desc;

-- 5. Show projects sorted by their budget in ascending order
select * from projects order by budget;


-- 6. Count the number of employees in each department
select departmentId, count(*) from employees group by DepartmentID;

-- 7. Display the top 3 employees with the highest base salary-
select * from salaries order by BaseSalary desc limit 3;

-- 8. Retrieve employee names along with their department names
select concat(e.FirstName , " ",e.LastName) as EmployeeName , d.DepartmentName from
employees e inner join Departments d on 
e.DepartmentID = d.DepartmentID;


-- 9. List all assignments, including employee and project details.
SELECT a.AssignmentID,e.EmployeeID,CONCAT(e.FirstName, ' ', e.LastName) AS EmployeeName,e.Email,e.Gender,e.HireDate,p.ProjectID,
p.ProjectName,p.StartDate,p.EndDate,a.HoursWorked
FROM Assignments a JOIN Employees e ON a.EmployeeID = e.EmployeeID
JOIN Projects p ON a.ProjectID = p.ProjectID;


-- 10. Find employees working on the project with the highest budget
SELECT e.EmployeeID,CONCAT(e.FirstName, ' ', e.LastName) AS EmployeeName,e.Email,e.Gender,e.HireDate,p.ProjectID,p.ProjectName,p.Budget
FROM Projects p JOIN Assignments a ON p.ProjectID = a.ProjectID
JOIN Employees e ON a.EmployeeID = e.EmployeeID
WHERE p.Budget = (SELECT MAX(Budget) FROM Projects);


-- 11. Calculate the age of each employee.
select concat(firstname,' ',lastname) as name, dateofbirth, timestampdiff(year,dateofbirth,curdate()) as age from employees;

-- •	12. Calculate the total salary (base + bonus) for each employee
select employeeId, sum(bonus+basesalary) as totalSalary from salaries group by employeeId;


-- •	Find all employees hired in 2015.
select * from employees where hiredate like '2015%';


-- •	Retrieve the names of projects ending before December 2023.
select * from projects where enddate < '2023-12-01';

-- •	List employees with base salaries greater than $70,000.
select e.EmployeeId, e.firstname, e.lastname,s.basesalary from employees e join salaries s on e.employeeId = s.employeeId
 where s.basesalary>70000;


-- •	Count the number of projects handled by each employee.
select e.employeeId, concat(e.firstname,' ',e.lastname) as employeeName , count(a.projectId) as totalProject from employees e join 
assignments a on e.employeeId = a.employeeId group by e.employeeId;


-- •	List all departments located in "San Francisco."
select * from departments where location = 'San Francisco';


-- •	Display project names along with total hours worked on each.
select p.projectname,p.projectid, sum(a.hoursworked) as totalHours from projects p join assignments a on p.projectid = a.projectid 
group by p.projectid;


-- •	Find the highest bonus received by any employee.
select e.employeeId, concat(e.firstName,' ',e.lastname) as employeeName, s.bonus from employees e join salaries s on e.employeeid = s.employeeid where bonus=(select max(bonus) from salaries);
select max(bonus) as highestBonus from salaries;


-- •	Identify projects that lasted for more than 12 months.
select * from projects where datediff(enddate,startdate)>365;  -- date difference gives differnce in days


-- •	Retrieve all projects starting in 2023.
select * from projects where year(startdate) = 2023;


-- •	Calculate the total hours worked by each employee across all projects.
select e.employeeId, concat(e.firstname,' ',e.lastname) as employeeName, sum(a.hoursworked) as totalHours from employees e join 
assignments a on e.employeeId = a.employeeId group by e.employeeid;

select sum(hoursworked) from assignments group by employeeId;


-- Find the department with the most employees.
select departmentId,count(employeeId) as totalEmployee from employees group by departmentId order by totalEmployee;


-- •	List employees who were born before 1985.
select * from employees where year(dateofbirth)<1985;


