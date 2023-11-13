
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import UserContext from './utils/UserContext';
import CartContext from './utils/CartContext';
import { useState } from 'react';

function App() {
 
  const [loggedInUserData,setLoggedInUserData]= useState({
      id:0,
      name:'Guest',
      email:'guest@gmail.com',
      billingAddress:{
          city:'default_city',
          pincode:'default_pincode',
          doorNo:'default_doorNo',
          streetName:'default_value'
      }
      
 });

 const[isLoggedIn,setIsLoggedIn]=useState(false);

// Cart-Context Data
 const[cartItems,setCartItems]=useState([]);//{productId:'',productDescription:'',photo:'',price:'',quantity:''}
 const [count,setCount]=useState(cartItems.length);

 //search-bar StateData
 const [search,setSearch]=useState('');

  return (
    <>
    <UserContext.Provider value={{loggedInUserData:loggedInUserData,setLoggedInUserData,isLoggedIn,setIsLoggedIn}}>
      <CartContext.Provider value={{cartItems,setCartItems,count,setCount}}>
        <div className="flex flex-col min-h-screen">
    <Header setSearch={setSearch}/>
     <div className="flex-1">
    <Outlet context={[search]}/></div>
    </div>
    <Footer/>
    </CartContext.Provider>
    </UserContext.Provider>
    </>
    
  );
}

export default App;
/*
billingAddress:{
          city:'',
          pincode:'',
          doorNo:'',
          streetName:''
      },
      shippingAddress:{
          city:'',
          pincode:'',
          doorNo:'',
          streetName:''
      }
 */