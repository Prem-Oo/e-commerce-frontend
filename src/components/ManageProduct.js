import React, { useEffect, useState } from 'react'
import { API, } from '../AppConfig';
import { Link } from 'react-router-dom';
import Inventory from './Inventory';
import Loading from './Loading';
const ManageProduct = () => {
    console.log('render')
    const[products,setProducts]=useState(null);
    useEffect(()=>{
        fetchProducts();
    },[])

    const fetchProducts=async()=>{
            try {
               const response= await API.get('/product');
               console.log(response.data);
            //    console.log(response.data[0].productDescription);
               setProducts(response.data);
            } catch (error) {
                console.log(error)
            }
        }

  const  handleDelete=async(productId)=>{
            try {
                await API.delete(`/product/${productId}`)
                fetchProducts();
            } catch (error) {
                console.log(error)
            }
    }

if(products===null) return <Loading/>
  return (
  <>
    <h2 className="text-2xl font-bold mb-4">Products List</h2>
    <Link to={'/admin'} className="bg-green-500 text-white px-2 py-1 m-1 rounded hover:bg-green-600">back to home</Link>
     <Link to={`add`} className="bg-green-500 text-white px-2 py-1 m-1 rounded hover:bg-green-600">
       Add New Product
        </Link>
    <table className="w-full border">
      <thead>
        <tr>
          <th className="px-4 py-2">Product Name</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Image</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({ productId, productDescription, productPrice, photo }) => (
          <tr key={productId} className="odd:bg-gray-100 even:bg-gray-200">
            <td className="px-4 py-2 text-center">{productDescription}</td>
            <td className="px-4 py-2 text-center">{productPrice}</td>
            <td className="px-4 py-2 text-center">
              <img
                src={`data:image/jpeg;base64,${photo}`}
                alt="Product_Img"
                width={90}
                className='mx-auto'
              />
            </td>
           <td className="px-4 py-2 text-center">
        <Inventory productId={productId}/>
</td>

    <td className="px-4 py-2 text-center">
        <Link to={`update/${productId}`} className="bg-green-500 text-white px-2 py-1 m-1 rounded hover:bg-green-600">
        Edit
        </Link>
        <button onClick={() => handleDelete(productId)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
            Delete
        </button>
    </td>

          </tr>
        ))}
      </tbody>
    </table>
  </>
);

}

export default ManageProduct