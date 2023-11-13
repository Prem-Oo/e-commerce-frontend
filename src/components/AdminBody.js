import React, { useEffect, useState } from 'react'
import { API } from '../AppConfig'
import Loading from './Loading';

const AdminBody = () => {

const [orders,setOrders]=useState([]);
const [users,setUsers]=useState([]);

let totalAmount=0;

orders && orders.forEach((order) => {
  order.lineItems.forEach((item) => {
    totalAmount += item.quantity * item.price;
  });
});


   useEffect(()=>{
    const fetchData=async()=>{
        try {
           const res1= await API.get("/order/all");
            const res2= await API.get("/customer/getAll");
            console.log(res1.data)
             console.log(res2.data)
            setOrders(res1.data);
            setUsers(res2.data);
        } catch (error) {
            console.log(error)
        }
         
    }
    fetchData();
   },[])
  return (
    <div> 
        <h1 className="text-3xl font-bold text-center m-10">Welcome to Admin Section</h1>
    {orders.length===0 ? <Loading/>:
    <div className='flex space-x-10 justify-around'>{/* container */}
        <div className="bg-gray-200 p-4 rounded-lg">{/* cards */}
            <p className="text-lg font-semibold">Total Orders</p>
             <p className='text-center'>{orders.length}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-lg font-semibold">Registred users  </p>
            <p className='text-center'>{users.length}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-lg font-semibold">Total amount </p>
            <p className='text-center'>&#8377; {totalAmount}</p>
        </div>
    </div>}
    </div>
  )
}

export default AdminBody