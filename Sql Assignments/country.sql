-- Question 1
create table Countries(country_id int primary key,
country_name varchar(30) not null,
region_id int not null);
 
 
-- Question 2
create table jobs(job_id varchar(10) primary key,
job_title varchar(10) not null,
min_salary decimal(6,0),
max_salary decimal(6,0));
 
create table job_history(employee_id int primary key,
start_date date,
end_date date,
job_id varchar(10),
dept_id int not null,
foreign key(job_id) references jobs(job_id));
 
desc jobs;
desc job_history;
 
 
-- Question 3
 
create table employees(
  employee_id int,
  first_name varchar(50),
  last_name varchar(50),
  email varchar(50) not null unique,
  phone_number varchar(50) not null unique,
  hire_date date not null,
  job_id int not null,
  salary decimal(10,2) not null,
  comission decimal(10,2),
  manager_id decimal(6,0),
  department_id decimal(4,0),
  foreign key (manager_id,department_id) references 
  departments(manager_id,department_id);
);
 
create table departments(
department_id decimal(4,0) default 0,
department_name varchar(30) not null,
manager_id decimal(6,0) default 0,
location_id decimal(4,0),
primary key(department_id, manager_id)
);
 
 
 
desc departments;
desc employees;