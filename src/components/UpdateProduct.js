import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { API } from "../AppConfig";
import { useNavigate } from "react-router-dom";
const UpdateProduct = () => {
    const { pID } = useParams();
    console.log(pID);

    const [product, setProduct] = useState(null);
    const [quantity,setQuantity]=useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        try {
            const fetchData = async () => {
                const json = await API.get(`/product/${pID}`);
                const res=await API.get(`/inventory/search/${pID}`)
                setProduct(json.data);
                setQuantity(res.data.quantity);
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }, [])
    if (product == null) {
        return <h1>Loading..</h1>
    }
    console.log(product);
     console.log(quantity);
    const { productId, productName, productPrice, productDescription, photo } = product


    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        // If the input element is a file input, set the 'photo' property with the selected file
        const newValue = name === 'photo' ? files[0] : value;

        setProduct({
            ...product,
            [name]: newValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        // Append the form data to the FormData object
        data.append('productName', productName);
        data.append('productDescription', productDescription);
        data.append('productPrice', productPrice);
        data.append('photo', photo);

        const reqData = {
              productId: pID,
              quantity: quantity,
        };

        try {
            // Send the Put request with FormData as the request body
            await API.put('/product/' + pID, data);
            // send put request to update inventory
            await API.put(`/inventory/update`, reqData)

            // Reset the form after successful submission
            setProduct({
                productName: '',
                productDescription: '',
                productPrice: '',
                photo: null,
            });
            setQuantity('');

            // Handle success or redirection if needed
            navigate('/admin/product')

        } catch (error) {
            // Handle any errors from the request
        }
    }
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
      Enter Name:
    </label>
    <input
      type="text"
      name="productName"
      value={productName}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
      Enter Description:
    </label>
    <input
      type="text"
      name="productDescription"
      value={productDescription}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
      Enter Price:
    </label>
    <input
      type="text"
      name="productPrice"
      value={productPrice}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
      Select Photo:
    </label>
    <input
      type="file"
      name="photo"
      onChange={handleInputChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
    />
  </div>
<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
      Enter Quantity:
    </label>
    <input
      type="text"
      name="quantity"
      value={quantity}
      onChange={(e)=>setQuantity(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
    />
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Submit
  </button>
</form>

    );
}

export default UpdateProduct;