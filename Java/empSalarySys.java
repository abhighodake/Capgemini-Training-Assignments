package pack.cap.module3;

/* Employee Salary Calculation System in Java.
 * The system calculates various components of an employee's salary such as Basic Salary, 
 * House Rent Allowance (HRA), Travel Allowance (TA), Dearness Allowance (DA), and Perks.
 * 
 * Instance Methods are used to calculate the salary components for an individual employee.
 * Static Methods are used for common deductions or allowances that apply to all employees.
 * Instance Variables represent employee-specific attributes (e.g., name, department, basic salary).
 * Static Variables represent company-wide constants (e.g., perk percentage, tax rate).
 */

public class empSalarySys {

    // Instance Variables
    String name;
    String department; 
    double baseSalary;
    double hra;
    double ta;
    double da;
    double perks;
    double totalSalary;
    double salaryAfterTax;

    // Constructor to initialize employee information
    public empSalCal(String name, String department, double baseSalary) {
        this.name = name;
        this.department = department;
        if (baseSalary > 0) {
            this.baseSalary = baseSalary;
        } else {
            System.out.println("Error: Salary should be a positive value.");
        }
    }

    // Static Variables (company-wide constants)
    static float hraPer = 0.2f;     // 20% of Basic Salary
    static float taPer = 0.1f;      // 10% of Basic Salary
    static float daPer = 0.05f;     // 5% of Basic Salary
    static float perksPer = 0.1f;   // 10% of Basic Salary
    static float taxPer = 0.1f;     // 10% tax rate for all employees

    // Instance Methods to calculate individual components
    public double calHra() {
        hra = baseSalary * hraPer;
        return hra;
    }

    public double calTa() {
        ta = baseSalary * taPer;
        return ta;
    }

    public double calDa() {
        da = baseSalary * daPer;
        return da;
    }

    public double calPerks() {
        perks = baseSalary * perksPer;
        return perks;
    }

    public double calTotalSalary() {
        double h = calHra();
        double d = calDa();
        double t = calTa();
        double p = calPerks();
        totalSalary = baseSalary + h + d + t + p;
        return totalSalary;
    }

    // Static Method to calculate tax based on total salary
    public static double calTax(double salary) {
        return salary * taxPer;
    }

    public void calSalaryAfterTax() {
        double tax = calTax(totalSalary);
        salaryAfterTax = totalSalary - tax;
    }

    // Method to display all salary details for the employee
    public void dispInfo() {
        calTotalSalary();
        calSalaryAfterTax();

        System.out.println("Employee Name: " + name);
        System.out.println("Department: " + department);
        System.out.println("Basic Salary: " + baseSalary);
        System.out.println("House Rent Allowance (HRA): " + hra);
        System.out.println("Travel Allowance (TA): " + ta);
        System.out.println("Dearness Allowance (DA): " + da);
        System.out.println("Perks: " + perks);
        System.out.println("Total Salary (Before Tax): " + totalSalary);
        System.out.println("Tax Deducted: " + calTax(totalSalary));
        System.out.println("Salary After Tax: " + salaryAfterTax);
    }

    public static void main(String[] args) {
        
        empSalarySys emp1 = new empSalarySys("Employee1", "HR", 30000);
        
        System.out.println("Employee 1 Information :-");
        emp1.dispInfo();
       
        double tax = calTax(emp1.calTotalSalary());
        System.out.println("Tax Deducted for Employee 1: " + tax);
    }
}
