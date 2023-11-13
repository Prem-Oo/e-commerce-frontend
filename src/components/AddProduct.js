import React, { useState,useEffect } from 'react'
import { API_SERVICE } from '../AppConfig'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {

    const fetchCategories=async()=>{
        const response=await API_SERVICE.get('/categories')
        console.log(response.data)//  array of objects.(id: 2, name: 'laptops', products: Array(3))
        setCategories(response.data);
    }
    const navigate=useNavigate();
     const [categories,setCategories]=useState([]);// fetching categories.
    useEffect(()=>{
         fetchCategories();
    },[])
     const [category,setCategory]=useState('');// to add category

    const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    categoryID: '',
    quantity: '',
    photo: null, 
  });
 

   const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setProduct({
      ...product,
      [name]: type === 'file' ? e.target.files[0] : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Send the product data to your API or perform other actions
    const formData = new FormData();
  formData.append('productName', product.productName);
  formData.append('productDescription', product.productDescription);
  formData.append('productPrice', product.productPrice);
  formData.append('categoryID', product.categoryID);
  formData.append('quantity', product.quantity);
  formData.append('photo', product.photo);
    try {
        const response=await API_SERVICE.post('/products',formData)

        if(response.status===201){
            console.log('Product data submitted:', product);
            // Reset the form if needed
            setProduct({
                productName: '',
                productDescription: '',
                productPrice: '',
                categoryID: '',
                quantity: '',
                hoto: null,
                });
             navigate('/admin/product')
        }
    } catch (error) {
        console.log(error)
    }
    
  };

 const  handleCategorySubmit=async(e)=>{
     e.preventDefault();
     try {
        const response=  await API_SERVICE.post('/categories',{name:category})
        console.log(response)
        setCategory('')
     } catch (error) {
        console.log(error)
     }
   
  }
  return (
  <div className="p-4 max-w-md mx-auto space-x-4">
    <div className="w-1/2">
      <h2 className="text-2xl font-bold mb-4">Add Category</h2>
      <form onSubmit={handleCategorySubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="categoryName" className="text-sm font-medium">
            Category Name:
          </label>
          <input
            type="text"
            name="categoryName"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Category
        </button>
      </form>
    </div>

    <div className="w-1/2">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
       <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="productName" className="text-sm font-medium">
          Product Name:
        </label>
        <input
          type="text"
          name="productName"
          value={product.productName}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="productDescription" className="text-sm font-medium">
          Product Description:
        </label>
        <input
          type="text"
          name="productDescription"
          value={product.productDescription}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="productPrice" className="text-sm font-medium">
          Product Price:
        </label>
        <input
          type="text"
          name="productPrice"
          value={product.productPrice}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

     <div className="flex flex-col">
          <label htmlFor="categoryID" className="text-sm font-medium">
            Category:
          </label>
          <select
            name="categoryID"
            value={product.categoryID}
            onChange={handleInputChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select Category</option>
            {/* Populate this select with fetched categories */}
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                {category.name}
           </option>
  ))}
          </select>
        </div>

      <div className="flex flex-col">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity:
        </label>
        <input
          type="text"
          name="quantity"
          value={product.quantity}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="photo" className="text-sm font-medium">
          Select Photo:
        </label>
        <input
          type="file"
          name="photo"
          onChange={handleInputChange}
          className="px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      >
        Add Product
      </button>
    </form>
    </div>
  </div>
);


}

export default AddProduct