import { useEffect, useState } from "react";
import { API } from "../AppConfig";
const Inventory=({productId})=>{

    const [quantity,setQuantity]=useState(0);

    useEffect(()=>{
        const fetchQuantity=async()=>{
            try {
            const response=await API.get(`/inventory/search/${productId}`);
                // console.log(response)
                setQuantity(response.data.quantity)
            } catch (error) {
                console.log(error)
            }
        }
            fetchQuantity();
    },[quantity])

    return <>
         <p>{quantity}</p>
    </>
}

export default Inventory;