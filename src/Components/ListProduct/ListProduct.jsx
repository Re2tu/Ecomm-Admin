import React, { useEffect, useState } from "react";
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
function ListProduct(){
    const [allproducts,setAllProducts]=useState([]);

    const API_URL = import.meta.env.VITE_API_URL; // Adjust based on your environment variable name


    const fetchInfo= async ()=>{
        await fetch(`${API_URL}/allproducts`)
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});
    }
    
    useEffect(()=>{
        fetchInfo();
    },[])

     const remove_product=async (id)=>{
        await fetch(`${API_URL}/removeproduct`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id:id})
        })
       await fetchInfo();
     }


    return(
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="listproduct-formatmain">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
             <div className="listproduct-allproducts">
                <hr/>
                {allproducts.map((product,index)=>{
                    return <><div key={index} className="listproduct-formatmain listproduct-format">
                     <img src={product.image} alt="" className="listproduct-producticon" />
                     <p>{product.name}</p>
                     <p>${product.old_price}</p>
                     <p>${product.new_price}</p>
                     <p>{product.category}</p>
                     <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-removeicon" />
                    </div>
                    <hr/>
                    </>
                })}
             </div>
        </div>
    )
}
export default ListProduct