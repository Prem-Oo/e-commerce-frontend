import React, { useState,useContext, useEffect } from 'react'
import CartContext from '../utils/CartContext';
import UserContext from '../utils/UserContext';
import { API_SERVICE } from '../AppConfig';
const CheckOut = () => {

    const{cartItems,setCartItems,setCount}=useContext(CartContext);
    const {loggedInUserData,isLoggedIn}=useContext(UserContext);
    const totalPrice=cartItems.reduce((total,item)=>total+item.price*item.quantity,0)

// dummy data. 
    const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
//
const lineItems = cartItems.map((item) => ({
  productId: item.productId,
  productName: item.productDescription,
  quantity: item.quantity.toString(), // You can convert quantity to a string if needed
}));
const cartRequest = {
  lineItems: lineItems,
};
console.log(loggedInUserData);
// adding items into cart
    useEffect(()=>{
       try {
          const updateCart=async()=>{
            if(loggedInUserData.id!==0){
               const response=await API_SERVICE.put(`/customer/${loggedInUserData.id}/cart`,cartRequest);
          console.log("/cart")
          console.log(response)
            }
         
      }
      updateCart();
       } catch (error) {
        console.log(error)
       }
    },[])

    //handling Payment
    const handlePayment=async(e)=>{
       e.preventDefault();
    if (cartItems.length === 0) {
    alert("Your cart is empty. Please add items to your cart before proceeding.");
  } else if (!isLoggedIn) {
    alert("You need to log in to complete the purchase.");
  } else {
    try {
      console.log('order...')
      const response = await API_SERVICE.post(`/customer/${loggedInUserData.id}/order`);
      console.log("/order");
      console.log(response);
      if (response.status === 201) {
        setCartItems([]);
        setCount(0);
        setCardNumber(''); setCardHolder(''); setCVV('');setExpiryDate('');
        alert('order placed succesfully');
      }
    } catch (error) {
      console.log(error);

         if (error.response && error.response.status === 409) {
        // Check if it's an OptimisticLockException (HTTP 409 Conflict)
        alert('Conflict: Someone else have ordered same products. Please refresh and try again.');
        
      }
    }
  }
    }
  return (
  <div className="flex justify-center">
    {/* Billing Details */}
    <div className="w-1/2 p-6">
      <h2 className="text-3xl font-semibold mb-4">Billing Details</h2>
      <p className="text-lg">Name: {loggedInUserData.name}</p>
      <p className="text-lg">Email: {loggedInUserData.email}</p>
      <p className="text-lg">City: {loggedInUserData.billingAddress.city}</p>
      <p className="text-lg">Pincode: {loggedInUserData.billingAddress.pincode}</p>
      <p className="text-lg">Door No: {loggedInUserData.billingAddress.doorNo}</p>
      <p className="text-lg">Street Name: {loggedInUserData.billingAddress.streetName}</p>
    </div>

    {/* Order Summary and Buy Now Button */}
    <div className="w-1/2 p-6 max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-8">Payment Information</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-600">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-600">
            Card Holder
          </label>
          <input
            type="text"
            id="cardHolder"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="John Doe"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            required
          />
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-600">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-600">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCVV(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-900"
          onClick={handlePayment}
        >
        pay &#8377;{totalPrice}
        </button>
      </form>
   
  
    </div>
  </div>
);

}

export default CheckOut;
