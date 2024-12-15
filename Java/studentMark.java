import java.util.*;

public class studentMark {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		int n;
		System.out.println("Enter the total number of subject : ");
		n=sc.nextInt();
		int[] arr = new int[n];
		System.out.println("Enter the marks of each subject : ");
		for(int i=0;i<n;i++) {
			arr[i] = sc.nextInt();
		}
		int sum =0; double avg;
		for(int i=0;i<n;i++) {
			sum+= arr[i];
		}
		avg = (double) sum/n;
		System.out.println("Total sum is : "+sum);
		System.out.println("Avergae is : "+avg);
	}

}
