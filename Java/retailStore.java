public class retailStore {
	
	float itemPrice = 1599.00f;
	float discount = 0.1f; 
	
	public double purchaseItem(int q) {
		double totalPrice;
		totalPrice = itemPrice * q * discount;
		System.out.println("Quantity : "+q);
		return totalPrice;
	}

	public static void main(String args[]) {
		retailStore i1 = new retailStore();
		double p = i1.purchaseItem(4);
		System.out.println("Total Price : "+p);
		
		retailStore i2 = new retailStore();
		double p1 = i2.purchaseItem(2);
		System.out.println("Total Price : "+p1);
		
	}
}