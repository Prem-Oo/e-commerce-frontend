import { useState,useEffect } from "react";
import { API } from "../AppConfig";
import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router-dom";
import Loading from './Loading';
const Body=()=>{

const [products,setProducts]=useState([]);// list of products

// filtering products based on search from App component.
const [search]=useOutletContext();

const filteredProducts = search.length>0
    ? products.filter((product) =>product.productDescription.toLowerCase().includes(search.toLowerCase()))
    : products;
 //console.log(filteredProducts)


// Fetching products from API
useEffect(()=>{
    const fetchProducts=async()=>{
        const jsonData=await API.get("/product");
        //console.log(jsonData.data);
        //  console.log(jsonData.data[0].productId);
        setProducts(jsonData.data);
    }
    fetchProducts();
},[])
    
if(filteredProducts.length===0) return <Loading/>
    return <>
   <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.productId} cardData={product} />
        ))}
      </div>
    </div>
    </>
}
export default Body;