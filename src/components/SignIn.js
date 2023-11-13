import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import { API } from '../AppConfig';
const SignIn=()=> {
  const [userData,setUserData]=useState({
    uname:'',
    email:'',
  });
  const navigate=useNavigate();

   const {loggedInUserData,setLoggedInUserData,setIsLoggedIn}=useContext(UserContext);

   /*const updateUserData = (id,customerName,customerEmail,city,doorNo,streetName,pincode) => {
    setLoggedInUserData((prevState)=>{
      return {...prevState,id:id,name:customerName,email:customerEmail,billingAddress: {
           city: city,
           doorNo: doorNo,
           streetName: streetName,
           pincode: pincode
          }
      }
    });
    console.log(loggedInUserData)
  };
  */
 const updateUserData = async (id, customerName, customerEmail, city, doorNo, streetName, pincode) => {
  const updatedUserData = {
    ...loggedInUserData,
    id: id,
    name: customerName,
    email: customerEmail,
    billingAddress: {
      city: city,
      doorNo: doorNo,
      streetName: streetName,
      pincode: pincode,
    },
  };

  setLoggedInUserData(updatedUserData);

  // Now you can use updatedUserData if needed in your component.
  console.log(updatedUserData);
};
  const handleForm=async(e)=>{
    e.preventDefault();
    // console.log(userData);
   try {
         const response= await API.get("/customer/check",{
        params: {
                email: userData.email
            },

          });
         // console.log(response.data);
          const {id,customerEmail,customerName}=response?.data;
         const {city,doorNo,streetName,pincode}= response.data.customerBillingAddresses[0];
         console.log(id+" "+streetName)
         
        updateUserData(id,customerName,customerEmail,city,doorNo,streetName,pincode);
        setIsLoggedIn(true);
         navigate('/');
          
   } catch (error) {
    alert("enter valid email to login")
     console.log(error)
      const {msg,path}=error?.response?.data || {}
      console.log(msg+" :: "+path)
   }
    
  }
  
  return (
   <>
   <UserContext.Provider value={{loggedInUserData:loggedInUserData,setLoggedInUserData}}>
  <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow-md">
  <form onSubmit={handleForm}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uname">
        Username:
      </label>
      <input
        className="w-full p-2 border rounded-md"
        type="text"
        name="uname"
        id="uname"
        value={userData.uname}
        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email:
      </label>
      <input
        className="w-full p-2 border rounded-md"
        type="text"
        name="email"
        id="email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
      />
    </div>

    <button
      className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600"
      type="submit"
    >
      Sign In
    </button>

     <Link
      className="w-full m-2 align-middle bg-green-500 text-white font-semibold p-1 rounded-md hover:bg-green-600"
      to={'/signUp'}
    >
      Sign Up
    </Link>
  </form>
</div>
</UserContext.Provider>
   </>
  )
}

export default SignIn