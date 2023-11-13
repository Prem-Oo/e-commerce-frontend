import React, { useContext, useState } from 'react'
import { API_SERVICE } from '../AppConfig';
import UserContext from '../utils/UserContext';
import { useNavigate } from 'react-router-dom';
const SignUp=()=> {

  const [formData,setFormData]=useState({
      customerId:'',
      customerName:'',
      customerEmail:'',
      customerBillingAddresses:[
            {
          city:'',
          pincode:'',
          doorNo:'',
          streetName:''
         }
      ],
      customerShippingAddresses:[
          {
          city:'',
          pincode:'',
          doorNo:'',
          streetName:''
      }
      ]
      
 });

 const {loggedInUserData,setLoggedInUserData,setIsLoggedIn}=useContext(UserContext);
 const navigate=useNavigate();

 const updateUserData = (customerId,customerName,customerEmail,city,doorNo,streetName,pincode) => {
    setLoggedInUserData({ ...loggedInUserData, id:customerId,name:customerName,email:customerEmail,
               billingAddress: {
    city: city,
    doorNo: doorNo,
    streetName: streetName,
    pincode: pincode
  }
    });
  };
 
const handleForm=async(e)=>{
  e.preventDefault();
/// setting shipping address same as billing address.
      // setFormData({...formData,customerShippingAddresses:[...formData.customerBillingAddresses]})
     try {
          const response=await API_SERVICE.post("/customer",formData);
          console.log("Signup-Succesful :: ");
            console.log(response);
             console.log(response.status);
            if(response.status===201){ /// signup is succesfull redirect and make login.
              const customerId=response.data.customerId;
              const {customerEmail,customerName}=formData;
              const {city,doorNo,streetName,pincode}= formData.customerBillingAddresses[0];
              updateUserData(customerId,customerName,customerEmail,city,doorNo,streetName,pincode);
              setIsLoggedIn(true);
              navigate("/");
            }

     } catch (error) {
       console.log(error)
     }

}

  return (
   <>
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow-md">
      <h1>Signup Page</h1>
  <form onSubmit={handleForm}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Username:
      </label>
      <input
        className="w-full p-2 border rounded-md"
        type="text"
        name="customerName"
        id="name"
        value={formData.customerName}
        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        required
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email:
      </label>
      <input
        className="w-full p-2 border rounded-md"
        type="email"
        name="customerEmail"
        id="email"
        value={formData.customerEmail}
        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        required
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
        City:
      </label>
      <input
        className="w-full p-2 border rounded-md"
        type="text"
        name="city"
        id="city"
        value={formData.customerBillingAddresses[0].city}
        required
        onChange={(e) => setFormData({ ...formData, customerBillingAddresses:[{...formData.customerBillingAddresses[0],[e.target.name]: e.target.value} ]})}
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">
        Pincode:
      </label>
      <input
        className="w-full p-2 border rounded-md"
        type="text"
        name="pincode"
        id="pincode"
        pattern="[0-9]{6}"
        value={formData.customerBillingAddresses.pincode}
        placeholder='enter 6-digit pincode'
        required
        onChange={(e) => setFormData({ ...formData, customerBillingAddresses:[{...formData.customerBillingAddresses[0],[e.target.name]: e.target.value} ] })}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="streetName">
        streetName:
      </label>
      <input
        className="w-full p-2 border rounded-md"
        type="text"
        name="streetName"
        id="streetName"
        value={formData.customerBillingAddresses.streetName}
        onChange={(e) => setFormData({ ...formData, customerBillingAddresses:[{...formData.customerBillingAddresses[0],[e.target.name]: e.target.value} ] })}
      />
    </div>
     <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doorNo">
        doorNo:
      </label>
      <input
        className="w-full p-2 border rounded-md"
        type="text"
        name="doorNo"
        id="doorNo"
        value={formData.customerBillingAddresses.doorNo}
        onChange={(e) => setFormData({ ...formData, customerBillingAddresses:[{...formData.customerBillingAddresses[0],[e.target.name]: e.target.value} ] })}
      />
    </div>

    <button
      className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600"
      type="submit"
    >
      Sign Up
    </button>
  </form>
</div>
   </>
  )
}

export default SignUp;