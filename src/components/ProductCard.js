import Rating from 'react-rating-stars-component'
import Inventory from './Inventory';
import { useContext } from 'react';
import CartContext from '../utils/CartContext';

const ProductCard=(props)=>{

const {productId,productDescription,productPrice,photo}= props.cardData;

const{cartItems,setCartItems,setCount,count}=useContext(CartContext);

const addToCart=(id)=>{
  console.log(id);
  setCount((prevState)=>prevState+1);
  const itemIndex=cartItems.findIndex((item)=>item.productId===id);  // returns product index or -1
  if(itemIndex!== -1){
    const updatedCart = [...cartItems];
    updatedCart[itemIndex].quantity += 1;
    setCartItems(updatedCart);
  }
  else{
    // add new cartitem quantity-1
    setCartItems([...cartItems, {productId:id,productDescription:productDescription,photo:photo,price:productPrice,quantity:1}]);
  }
}

    return (<>
       <div className="relative overflow-hidden border p-4 m-3 transition-transform transform hover:scale-95 hover:shadow-xl rounded-lg">
  <img
    className="w-60 object-cover object-center rounded-lg"
    src={`data:image/jpeg;base64,${photo}`}
    alt="product_image"
  />
  <div className="mt-4">
    <h3 className="text-sm font-semibold text-green-800 hover:text-red-700">{productDescription}</h3>
    <Rating
          count={3+Math.random()*1.5}
          size={16} // Size of the stars
          color="#FFD700" // Star color
          edit={false} // Disable user interaction with the stars
        />
   <p className="text-sm font-medium text-gray-600 mt-2">&#8377; {productPrice}</p>
   <Inventory productId={productId}/>

  </div>
  <button className="absolute top-2 right-2 p-2 text-white bg-slate-700 hover:bg-slate-950 rounded-full"
    onClick={()=>addToCart(productId)}
  >
    
    Add to Cart
  </button>
</div>

    </>)
}
export default ProductCard;