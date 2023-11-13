import React, { useContext } from 'react'
import CartContext from '../utils/CartContext'
import UserContext from '../utils/UserContext';
import cartEmpty from './cartEmpty.svg'
import { Link } from 'react-router-dom';

const Cart=()=> {

    const{cartItems,setCartItems,count,setCount}=useContext(CartContext);
    const {loggedInUserData,isLoggedIn}=useContext(UserContext);


    const handleRemoveItem=(id)=>{
         /* const itemIndex=cartItems.findIndex((item)=>item.productId===id);
            cartItems.splice(itemIndex,1);
            setCartItems(cartItems);   */
          const itemIndex=cartItems.findIndex((item)=>item.productId===id);
          setCount((prevState)=>prevState-cartItems[itemIndex].quantity);
          const updatedCartItems = cartItems.filter((item) => item.productId !== id);
          setCartItems(updatedCartItems);
    }

    // finding total price
    const totalPrice=cartItems.reduce((total,item)=>total+item.price*item.quantity,0)
    // handling cart items quantity
   const handleDecreaseQuantity=(id)=>{
     const itemIndex=cartItems.findIndex((item)=>item.productId===id);
        if(cartItems[itemIndex].quantity===1){
          handleRemoveItem(id);// handling quantity lessthan 1
        }else{
          const updatedCart = cartItems.map((item) => {
        if (item.productId === id) {
            item.quantity -= 1;
        }
            return item;
      });

       // Update the cart state with the new quantities
         setCartItems(updatedCart);
        setCount((prevState)=>prevState-1);
        }
    }
    const handleIncreaseQuantity=(id)=>{
      const updatedCart = cartItems.map((item) => {
        if (item.productId === id) {
            item.quantity += 1;
        }
            return item;
      });

       // Update the cart state with the new quantities
         setCartItems(updatedCart);
        setCount((prevState)=>prevState+1);
    }

  return (
    <div className="p-4">
       {isLoggedIn && <h2 className="text-2xl font-bold mb-4">Hello {loggedInUserData.name}</h2>}
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
     {cartItems.length!==0 && 
           <aside className="bg-slate-100 p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-semibold">Cart Summary</h2>
        <p className="text-gray-600 m-2">SubTotal ({count} items): &#8377;{totalPrice}</p>
        {isLoggedIn ? (
      <Link to="/checkout" className="bg-green-500 text-white rounded-md p-2 mt-4 hover-bg-green-600">
        Checkout
      </Link>
    ) : (
      <button className="bg-green-500 text-white rounded-md p-2 mt-4 hover-bg-green-600" onClick={() => alert('Please log in to proceed to checkout')}>Checkout</button>
    )}
      </aside>
     }
      {
        cartItems.length !== 0 && (
          <button onClick={() => {setCartItems([]); setCount(0)}}
            className="bg-red-500 text-white rounded-md p-2 mt-4 hover:bg-red-600"
           >
           Empty Cart
          </button>
        )
      }

      {cartItems.length === 0 ? (<>
      <div className="rounded-md shadow-md p-4 bg-white flex items-center">
         <img src={cartEmpty} alt="cartempty" className="w-56" />
         <p className="m-4 ">Your cart is empty</p>
          <Link to={'/'}><button className="bg-slate-700 text-white rounded-lg p-2 mt-2 hover:bg-slate-900">back to store</button></Link>
      </div>
      </>  
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cartItems.map((item) => (
            <div key={item.productId} className="bg-white p-4 rounded-lg shadow-md">
              <img src={`data:image/jpeg;base64,${item.photo}`} alt={item.productDescription} className="w-32 object-cover object-center" />
              <h3 className="text-xl font-semibold mt-2">{item.productDescription}</h3>
              <p className="text-gray-600 text-sm mt-1">&#8377;{item.price}</p>
              <div className="flex items-center mt-2">
    <button
      className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 mr-2"
      onClick={() => handleDecreaseQuantity(item.productId)}
    >
      -
    </button>
    <p className="text-gray-600 text-sm">{item.quantity}</p>
    <button
      className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 ml-2"
      onClick={() => handleIncreaseQuantity(item.productId)}
    >
      +
    </button>
  </div>
              <button
                className="bg-red-500 text-white rounded-full p-2 mt-2 hover:bg-red-600"
                onClick={() => { handleRemoveItem(item.productId) }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart