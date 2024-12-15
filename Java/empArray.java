package pac.cap.module4;

import java.util.Arrays;

class Employee{
	int employeeId;
	String name;
	double salary;
	
	Employee(int employeeId,String name,double salary){
		super();
		this.employeeId = employeeId;
		this.name = name;
		this.salary = salary;
	}
	
	void displayInfo() {
		System.out.println("Employee Id:"+employeeId+" , name : "+name+" , salary : "+salary);
	}
	
	void updateEmpName(String n) {
		this.name = n;
	}
	void updateEmpSalary(double sal) {
		this.salary = sal;
	}
	
}

public class empArray {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Employee[] e = new Employee[5];
		e[0] = new Employee(1,"jhon",35000);
		e[1] = new Employee(2,"jane",39000);
		e[2] = new Employee(3,"bob",45000);
		e[3] = new Employee(4,"maria",50000);
		e[4] = new Employee(5,"Sam",47000);
		
		
		// Array Copy
		Employee[] e1 = new Employee[5];
		e1 = Arrays.copyOf(e, e.length);
		System.out.println("Copied Array :- ");
		for(int i=0;i<e1.length;i++) {
			e1[i].displayInfo();
		}
		
		
		// Array Equals
		System.out.println("Equal Arrays : "+Arrays.equals(e, e1));
		
		// update Employee  
		Arrays.fill(e1,0,1 ,new Employee(1,"newName",41000));
	
		for(int i=0;i<e1.length;i++) {
			e1[i].displayInfo();
		}
		
		System.out.println("Before updating salary:");
		e[0].displayInfo();
		e[0].updateEmpSalary(46000);
		System.out.println("After updating salary:");
		e[0].displayInfo();
		
		// sort by salary
		Arrays.sort(e, (a,b)-> Double.compare(a.salary, b.salary));
		
		System.out.println("Employee sorted by salary : ");
		for(int i=0;i<e1.length;i++) {
			e[i].displayInfo();
		}
		
	
	}

}
