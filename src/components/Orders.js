import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../utils/UserContext'
import { API_SERVICE } from '../AppConfig';
import Loading from './Loading';
const Orders = () => {

const {loggedInUserData}=useContext(UserContext);

const [orders,setOrders]=useState([]);

const[isServiceUp,setIsServiceUp]=useState(true);
const[isLoading,setIsLoading]=useState(false);

useEffect(()=>{
    const fetchOrders=async()=>{
       try {
         setIsLoading(true);
          const response = await API_SERVICE.get(`/customer/${loggedInUserData.id}/orders`);
         if(response.status===200){
          setIsServiceUp(true);
          setIsLoading(false);
           console.log(response.data);
          setOrders(response.data);//array of objects

         }
       } catch (error) {
        if( error.response.status===500){
           setIsServiceUp(false);
        }
         setIsLoading(false);
        console.log(error)
        console.log(error.response.data)
       }
    }
    fetchOrders();
    

},[])

 if(isLoading) return <Loading/>;
  return (
    <>
      {
        isServiceUp ?(
          <div className="py-8">
      <h1 className="text-3xl font-semibold mb-4">Your Orders</h1>
      <h1 className="text-xl font-semibold mx-4 mb-4">{loggedInUserData.name}</h1>

      <table className=" m-2 w-full">
  <thead>
    <tr>
      <th className="p-2 border bg-gray-200">Order ID</th>
      <th className="p-2 border bg-gray-200">Product Name</th>
      <th className="p-2 border bg-gray-200">Quantity</th>
      <th className="p-2 border bg-gray-200">Price</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order) => (
      <React.Fragment key={order.orderId}>
        <tr className={order.orderId %2 ===0 ? 'bg-gray-100' :'bg-white' }>
          <td className="p-2 border text-center" rowSpan={order.lineItems.length}>{order.orderId}</td>
          <td className="p-2 border text-center">{order.lineItems[0].productName}</td>
          <td className="p-2 border text-center">{order.lineItems[0].quantity}</td>
          <td className="p-2 border text-center">&#8377;{order.lineItems[0].price.toFixed(2)}</td>
        </tr>
        {order.lineItems.slice(1).map((lineItem, index) => (
          <tr key={index}>
            <td className="p-2 border text-center">{lineItem.productName}</td>
            <td className="p-2 border text-center">{lineItem.quantity}</td>
            <td className="p-2 border text-center">&#8377;{lineItem.price.toFixed(2)}</td>
          </tr>
        ))}
      </React.Fragment>
    ))}
  </tbody>
</table>
    </div>

        ) :( 
           // Your component content when the service is unavailable
       <div className="p-8 text-center">
         <h1 className="text-3xl font-semibold mb-4">Service is temporarily unavailable</h1>
         <p className="text-lg text-gray-600">We apologize for the inconvenience. Please try again later.</p>
       </div>

        )
      }
    </>
  );
}

export default Orders